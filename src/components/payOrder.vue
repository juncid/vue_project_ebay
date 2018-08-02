<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/cart.html">购物车</a>
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
                                <li class="active">
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
                    <div class="cart-box">
                        <el-form status-icon :model="orderInfo" :rules="rules" ref="orderInfo" label-width="100px" class="demo-ruleForm">
                            <div id="orderForm" name="orderForm" url="">
                                <h2 class="slide-tit">
                                    <span>1、收货地址</span>
                                </h2>
                                <el-form-item label="收货人姓名" prop="accept_name">
                                    <el-input style="width:500px" v-model="orderInfo.accept_name"></el-input>
                                </el-form-item>
                                <el-form-item label="所属地区" prop="">
                                    <v-distpicker @selected="selected($event)"
                                    :province="orderInfo.area.province.value" :city="orderInfo.area.city.value" :area="orderInfo.area.area.value"
                                    ></v-distpicker>
                                </el-form-item>
                                <!-- 三级省市联动 -->
                                <el-form-item label="收货地址" prop="address">
                                    <el-input style="width:500px" v-model="orderInfo.address"></el-input>
                                </el-form-item>
                                <el-form-item label="手机号" prop="mobile">
                                    <el-input style="width:500px" v-model="orderInfo.mobile"></el-input>
                                </el-form-item>
                                <el-form-item label="邮箱" prop="email">
                                    <el-input style="width:500px" v-model="orderInfo.email"></el-input>
                                </el-form-item>
                                <el-form-item label="邮政编码" prop="post_code">
                                    <el-input style="width:500px" v-model="orderInfo.post_code"></el-input>
                                </el-form-item>
                                <h2 class="slide-tit">
                                    <span>2、支付方式</span>
                                </h2>
                                
                                <ul class="item-box clearfix">
                                    <!--取得一个DataTable-->
                                    <li>
                                        <label>
                                            <el-radio v-model="orderInfo.payment_id" label="6">在线支付</el-radio>
                                            <em>手续费：0.00元</em>
                                        </label>
                                    </li>
                                </ul>
                                <h2 class="slide-tit">
                                    <span>3、配送方式</span>
                                </h2>
                                <ul class="item-box clearfix">
                                    <!--取得一个DataTable-->
                                    <li>
                                        <label>
                                            <el-radio-group v-model="orderInfo.express_id" @change="changeExpress($event)">
                                                <el-radio label="1">顺丰快递：20元</el-radio>
                                                <el-radio label="2">圆通快递：10元</el-radio>
                                                <el-radio label="3">韵达快递：8元</el-radio>
                                            </el-radio-group>
                                        </label>
                                    </li>
                                </ul>
                                <h2 class="slide-tit">
                                    <span>4、商品清单</span>
                                </h2>
                                <div class="line15"></div>
                                <table width="100%" border="0" align="center" cellpadding="8" cellspacing="0" class="cart-table">
                                    <tbody>
                                        <tr>
                                            <th colspan="2" align="left">商品信息</th>
                                            <th width="84" align="left">单价</th>
                                            <th width="84" align="center">购买数量</th>
                                            <th width="104" align="left">金额(元)</th>
                                        </tr>
                                        <tr v-for="(item, index) in goodList" :key="item.id">
                                            <td width="68">
                                                <a target="_blank" href="/goods/show-89.html">
                                                    <img :src="item.img_url" class="img">
                                                </a>
                                            </td>
                                            <td>
                                                <a target="_blank" href="/goods/show-89.html">{{item.title}}</a>
                                            </td>
                                            <td>
                                                <span class="red">
                                                   ￥{{item.sell_price}}
                                                </span>
                                            </td>
                                            <td align="center">{{item.buycount}}</td>
                                            <td>
                                                <span class="red">
                                                    ￥{{item.buycount*item.sell_price}}
                                                </span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div class="line15"></div>
                                <h2 class="slide-tit">
                                    <span>5、结算信息</span>
                                </h2>
                                <div class="buy-foot clearfix">
                                    <div class="left-box">
                                        <dl>
                                            <dt>订单备注(100字符以内)</dt>
                                            <dd>
                                                <textarea v-model="orderInfo.message" name="message" class="input" style="height:35px;"></textarea>
                                            </dd>
                                        </dl>
                                    </div>
                                    <div class="right-box">
                                        <p>
                                            商品
                                            <label class="price">{{totalCount}}</label> 件&nbsp;&nbsp;&nbsp;&nbsp; 商品金额：￥
                                            <label id="goodsAmount" class="price">{{totalPrice}}</label> 元&nbsp;&nbsp;&nbsp;&nbsp;
                                        </p>
                                        <p>
                                            运费：￥
                                            <label id="expressFee" class="price">{{orderInfo.expressMoment}}</label> 元
                                        </p>
                                        <p class="txt-box">
                                            应付总金额：￥
                                            <label id="totalAmount" class="price">{{orderInfo.goodsAmount}}</label>
                                        </p>
                                        <p class="btn-box">
                                            <a class="btn button" href="/cart.html">返回购物车</a>
                                            <a id="btnSubmit" @click="submitForm('orderInfo')" class="btn submit">确认提交</a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </el-form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// 引入三级省市联动包
import VDistpicker from "v-distpicker";

export default {
  name: "payOrder",
  // 创建出来
  data: function() {
    // 表单验证规则
    var validateMobile = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入手机号"));
      } else {
        // 定义正则规则
        let reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
        // 验证
        if (reg.test(value)) {
          // 对
          callback();
        } else {
          // 错
          callback(new Error("请输入正确的手机号"));
        }
      }
    };
    var validateEmail = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("邮箱不能为空"));
      } else {
        // 定义正则规则
        let reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
        // 验证
        if (reg.test(value)) {
          // 对
          callback();
        } else {
          // 错
          callback(new Error("请输入正确的邮箱地址"));
        }
      }
    };
    var validatePostCode = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("邮编"));
      } else {
        // 定义正则规则
        let reg = /^[1-9]\d{5}(?!\d)$/;
        // 验证
        if (reg.test(value)) {
          // 对
          callback();
        } else {
          // 错
          callback(new Error("请输入正确的邮编"));
        }
      }
    };
    return {
      // 商品数据
      goodList: [],
      // 表单的数据
      orderInfo: {
        goodsAmount: 0,
        expressMoment: 20,
        accept_name: "大王",
        area: {
          province: { code: "440000", value: "广东省" },
          city: { code: "440300", value: "深圳市" },
          area: { code: "440306", value: "宝安区" }
        },
        address: "深圳市龙华区",
        mobile: 18888888888,
        email: "790341284@qq.com",
        post_code: "330205",
        payment_id: "6",
        express_id: "1",
        // 运费
        message: "快点发货&请不要使用小常快递",
        goodsids: "", // id们
        cargoodsobj: "" // id 跟数量的关系
      },
      // 表单验证规则
      rules: {
        accept_name: [
          { required: true, message: "请输入收件人姓名", trigger: "blur" },
          { min: 2, message: "长度在 2 到 10 个字符", trigger: "blur" }
        ],
        address: [
          { required: true, message: "请输入收货地址", trigger: "change" },
          { min: 2, message: "请输入的详细一些哦", trigger: "change" }
        ],
        mobile: [{ validator: validateMobile, trigger: "change" }],
        email: [{ validator: validateEmail, trigger: "change" }],
        post_code: [{ validator: validatePostCode, trigger: "change" }]
      }
    };
  },
  methods: {
    //  修改所属地区
    selected(value) {
      //   console.log(value);
      this.orderInfo.area = value;
    },
    // 修改快递方式
    changeExpress(value) {
      // console.log(value);
      switch (value) {
        case "1":
          this.orderInfo.expressMoment = 20;
          break;
        case "2":
          this.orderInfo.expressMoment = 10;
          break;
        case "3":
          this.orderInfo.expressMoment = 8;
          break;
        case "1":
          break;

        default:
          break;
      }
      this.orderInfo.goodsAmount =
        this.totalPrice + this.orderInfo.expressMoment;
    },
    // 提交之前最后一次验证表单
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        // console.log(valid);
        if (valid) {
            // alert("submit!");
            this.$Message.success('订单提交成功')
          // 成功提交 修改vuex商品的数据
          this.axios.post(`site/validate/order/setorder`,this.orderInfo)
          .then(response=>{
              console.log(response);
            // 订单创建成功，删除vuex里面的数据
            if (response.data.message.orderid) {
                // console.log(1);
                let idArr = this.orderInfo.goodsids.split(',')
                idArr.forEach(v=>{
                    this.$store.commit('delGood',v)
                })
            }
            // 代码跳转
            this.$router.push('/orderInfo/'+response.data.message.orderid)
          })
          .catch(error=>{
              console.log(error);
          })
        } else {
          // 提交失败
          console.log("error submit!!");
          return false;
        }
      });
    }
  },

  //   显示出来调用
  created() {
    //   console.log(this.$route.params.ids);
    this.axios
      .get(`site/validate/order/getgoodslist/${this.$route.params.ids}`)
      .then(response => {
        //   console.log(response);
        // 初始化数据
        let buyList = this.$store.state.buyList;
        response.data.message.forEach(v => {
          v.buycount = buyList[v.id];
        });
        this.goodList = response.data.message;
        // console.log(this.goodList);
        // 计算总金额
        this.orderInfo.goodsAmount =
          this.totalPrice + this.orderInfo.expressMoment;
        // 赋值属性
        this.orderInfo.goodsids = this.$route.params.ids;
        // console.log(this.orderInfo.goodsids);
        // 购买的数量和id
        let temObj = {};
        this.goodList.forEach(v => {
          temObj[v.id] = v.buycount;
        });
        this.orderInfo.cargoodsobj = temObj;
        // console.log(this.orderInfo.cargoodsobj);
      })
      .catch(error => {
        //   console.log(err);
      });
  },

  computed: {
    // 总数量
    totalCount() {
      let count = 0;
      this.goodList.forEach(v => {
        count += v.buycount;
      });
      return count;
    },
    // 总金额
    totalPrice() {
      let price = 0;
      this.goodList.forEach(v => {
        price += v.buycount * v.sell_price;
      });
      return price;
    }
  },

  // 省市联动组价
  components: { VDistpicker }
};
</script>

<style scoped>
</style>

