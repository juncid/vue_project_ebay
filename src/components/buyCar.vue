<template>
  <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <router-link to="/index">首页</router-link>&gt;
                <router-link to="/buyCar">购物车</router-link>
            </div>
        </div>

        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <!--购物车头部-->
                    <div class="cart-head clearfix">
                        <h2>
                            <i class="iconfont icon-cart"></i>我的购物车</h2>
                        <div class="cart-setp">
                            <ul>
                                <li class="first active">
                                    <div class="progress">
                                        <span>1</span>
                                        放进购物车
                                    </div>
                                </li>
                                <li>
                                    <div class="progress">
                                        <span>2</span>
                                        填写订单信息
                                    </div>
                                </li>
                                <li class="last">
                                    <div class="progress">
                                        <span>3</span>
                                        支付/确认订单
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!--购物车头部-->
                    <!--商品列表-->
                    <div class="cart-box">
                        <input id="jsondata" name="jsondata" type="hidden">
                        <table width="100%" align="center" class="cart-table" border="0" cellspacing="0" cellpadding="8">
                            <tbody>
                                <tr>
                                    <th width="48" align="center">
                                        <a>选择</a>
                                    </th>
                                    <th align="left" colspan="2">商品信息</th>
                                    <th width="84" align="left">单价</th>
                                    <th width="104" align="center">数量</th>
                                    <th width="104" align="left">金额(元)</th>
                                    <th width="54" align="center">操作</th>
                                </tr>
                                <!-- 空的时候显示 -->
                                <tr v-if="message.length==0">
                                    <td colspan="10">
                                        <div class="msg-tips">
                                            <div class="icon warning">
                                                <i class="iconfont icon-tip"></i>
                                            </div>
                                            <div class="info">
                                                <strong>购物车没有商品！</strong>
                                                <p>您的购物车为空，
                                                    <a href="/index.html">马上去购物</a>吧！</p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <!-- 有数据的时候显示 -->
                                <tr v-for="(item, index) in message" :key="item.id">
                                    <td width="48" align="center">
                                        <el-switch v-model="item.isSelected" active-color="#409eff" inactive-color="#555555">
                                        </el-switch>
                                    </td>
                                    <td align="left" colspan="2">
                                        <div class="shopInfo"><img :src="item.img_url" alt="" style="width: 50px; height: 50px; margin-right: 10px;">
                                            <span>{{item.title}}</span>
                                        </div>
                                    </td>
                                    <td width="84" align="left">{{item.sell_price}}</td>
                                    <td width="104" align="center">
                                        <el-input-number @change="change($event,index)" v-model="item.buycount" size="mini" :min="1" :max="10" label="描述文字"></el-input-number>
                                    </td>
                                    <td width="104" align="left">{{item.buycount*item.sell_price}}</td>
                                    <td width="54" align="center">
                                        <a @click="showModal=true;delIndex=index" href="javascript:void(0)">删除</a>
                                    </td>
                                </tr>
                                <tr>
                                    <th align="right" colspan="8">
                                        已选择商品
                                        <b class="red" id="totalQuantity">{{selectCount}}</b> 件 &nbsp;&nbsp;&nbsp; 商品总金额（不含运费）：
                                        <span class="red">￥</span>
                                        <b class="red" id="totalAmount">{{totalPrice}}</b>元
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <!--/商品列表-->
                    <!--购物车底部-->
                    <div class="cart-foot clearfix">
                        <div class="right-box">
                            <button class="button" onclick="javascript:location.href='/index.html';">继续购物</button>
                            <!-- 改变跳转方式，携带已选择的商品id -->
                            <button class="submit" @click="toPayOrder">立即结算</button>
                        </div>
                    </div>
                    <!--购物车底部-->
                </div>
            </div>
        </div>
        <!-- 对话框 -->
        <Modal v-model="showModal" width="360">
            <p slot="header" style="color:#f60;text-align:center">
                <Icon type="ios-information-circle"></Icon>
                <span>确认删除</span>
            </p>
            <div style="text-align:center">
                <p>您真的要删除吗？</p>
            </div>
            <div slot="footer">
                <Row>
                    <Col span="12">
                    <!-- 点击取消隐藏模态框 -->
                        <Button @click="showModal=false" type="success" size="large" long >取消</Button>
                    </Col>
                    <Col span="12">
                        <Button @click="del" type="error" size="large" long >确认</Button>
                    </Col>
                </Row>
            </div>
        </Modal>

    </div>
</template>

<script>
export default {
  name: "buyCar",
  data: function() {
    return {
      message: [],
      // isSelected:true
      // 警告模态框绑定
      showModal: false,
      delIndex: 0
    };
  },
  created() {
    // 进来弹框显示
    this.$Spin.show();
    // 获取数据 拼接为id1,id2,id3
    // console.log(this.$store.state.buyList);
    let buyList = this.$store.state.buyList;
    let ids = "";
    for (const key in buyList) {
      ids += key;
      ids += ",";
    }

    // 判断是否有数据 这样的话购物车如果没数据就不会请求ajax，不会报错
    if (ids == "") {
        this.$Spin.hide() 
        return;
    }

    // 拼接多了一个, 所以去掉
    ids = ids.slice(0, -1);
    // 发送ajax请求
    this.axios
      .get(`site/comment/getshopcargoods/${ids}`)
      .then(response => {
        // console.log(response);
        // 需要把商品详情页买的商品品类的数量传递过来
        // 先初始化响应到的数据
        response.data.message.forEach(v => {
          // 需要传递的数量     对应商品的数量
          v.buycount = buyList[v.id];
          // 增加一个布尔属性来开启切换按钮
          v.isSelected = true;
        });
        // 动态添加的属性isSelected  vue追踪不到，所以需要先初始化数据
        // 先初始化数据再赋值，这样vue就能追踪到,
        this.message = response.data.message;
        this.$Spin.hide()
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {
    // 同步数据显示在购物车标签里（同步大vuex里）
    change(value, index) {
      // console.log('我改变了');
      // console.log(value);
      // console.log(index);
      // 提交载荷
      this.$store.commit("changeCount", {
        // 取到修改的那个商品的id
        goodId: this.message[index].id,
        goodNum: value
      });
    },
    del() {
      // console.log(this.delIndex);
      // 根据索引去获取id，如果先删除，那么对应的元素就已经没有了，获取到的id不是对应的那个了
      // 删除vuex中的数据                 根据索引获取id
      this.$store.commit("delGood", this.message[this.delIndex].id);
      // 获取当前这条数据的index值，就能删除当前这个组件中的数据
      this.message.splice(this.delIndex, 1);
      // 隐藏对话框
      this.showModal = false;
    },
    // 带id去支付页
    toPayOrder(){
        // console.log(this.message);
        let ids = ''
        // 获取id
        this.message.forEach(v=>{
            // console.log(v.id);
            if(v.isSelected){
                ids+=v.id;
                ids+=','
            }
        })
        if (ids=='') {
            this.$message({
                message:'哥们,你起码选一个呀!!',
                duration:1000
            });
            return;
        }
        // console.log(ids);
        ids = ids.slice(0,-1)
        this.$router.push('/payOrder/'+ids);
    }

  },
  computed: {
    // 选中的商品数量
    selectCount() {
      // 定义变量保存商品总数
      let totalCount = 0;
      this.message.forEach(v => {
        if (v.isSelected) {
          totalCount += v.buycount;
        }
      });
      return totalCount;
    },
    // 总金额
    totalPrice() {
      // 是否选中
      let totalPrice = 0;
      this.message.forEach(v => {
        if (v.isSelected) {
          totalPrice += v.buycount * v.sell_price;
        }
      });
      return totalPrice;
    }
  }
};
</script>

<style scoped>
</style>

