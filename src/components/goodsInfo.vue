<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/goods.html">购物商城</a> &gt;
                <a href="/goods/42/1.html">商品详情</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <div class="left-925">
                        <div class="goods-box clearfix">
                            <div v-if="this.imglist.length!=0" class="pic-box">
                                <ProductZoomer :baseImages='images' :base-zoomer-options="zoomerOptions">
                                </ProductZoomer>
                            </div>
                            <div class="goods-spec">
                                <h1>{{goodsinfo.title}}</h1>
                                <p class="subtitle">{{goodsinfo.sub_title}}</p>
                                <div class="spec-box">
                                    <dl>
                                        <dt>货号</dt>
                                        <dd id="commodityGoodsNo">{{goodsinfo.goods_no}}</dd>
                                    </dl>
                                    <dl>
                                        <dt>市场价</dt>
                                        <dd>
                                            <s id="commodityMarketPrice">{{goodsinfo.market_price}}</s>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>销售价</dt>
                                        <dd>
                                            <em id="commoditySellPrice" class="price">{{goodsinfo.sell_price}}</em>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="spec-box">
                                    <dl>
                                        <dt>购买数量</dt>
                                        <dd>
                                            <div class="stock-box">
                                                <div class="el-input-number el-input-number--small">
                                                    <span role="button" class="el-input-number__decrease" :class="{'is-disabled':buyNum==1}">
                                                        <i @click="buyNum==1?1:buyNum--" class="el-icon-minus"></i>
                                                    </span>
                                                    <span role="button" class="el-input-number__increase" :class="{'is-disabled':buyNum==goodsinfo.stock_quantity}">
                                                        <!-- 判断输入的数量大于1或者大于库存数量 -->
                                                        <i @click="buyNum==goodsinfo.stock_quantity?goodsinfo.stock_quantity:buyNum++" class="el-icon-plus" ></i>
                                                    </span>
                                                    <div class="el-input el-input--small">
                                                        <!---->
                                                        <input autocomplete="off" size="small" type="text" rows="2" max="60" min="1" validateevent="true" class="el-input__inner" role="spinbutton" aria-valuemax="60" aria-valuemin="1" aria-valuenow="1" aria-disabled="false"  v-model="buyNum">
                                                        <!---->
                                                        <!---->
                                                        <!---->
                                                    </div>
                                                </div>
                                            </div>
                                            <span class="stock-txt">
                                                库存
                                                <em id="commodityStockNum">{{goodsinfo.stock_quantity}}</em>件
                                            </span>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dd>
                                            <div id="buyButton" class="btn-buy">
                                                <button onclick="cartAdd(this,'/',1,'/shopping.html');" class="buy">立即购买</button>
                                                <button @click="cartAdd" class="add">加入购物车</button>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div id="goodsTabs" class="goods-tab bg-wrap">
                            <Affix>
                            <div id="tabHead" class="tab-head" style="position: static; top: 517px; width: 925px;">
                                <ul>
                                    <li>
                                        <!-- 点击a标签高亮 -->
                                        <a @click="isShowDesc=true" href="javascript:;" :class="{selected:isShowDesc}">商品介绍</a>
                                    </li>
                                    <li>
                                        <a @click="isShowDesc=false" href="javascript:;" :class="{selected:!isShowDesc}">商品评论</a>
                                    </li>
                                </ul>
                            </div>
                            </Affix>
                            <div class="tab-content entry" v-show="isShowDesc" v-html="goodsinfo.content">
                                内容
                            </div>
                            <div class="tab-content" style="display: block;" v-show="!isShowDesc">
                                <div class="comment-box">
                                    <div id="commentForm" name="commentForm" class="form-box">
                                        <div class="avatar-box">
                                            <i class="iconfont icon-user-full"></i>
                                        </div>
                                        <div class="conn-box">
                                            <div class="editor">
                                                <textarea v-model="commentContent" id="txtContent" name="txtContent" sucmsg=" " datatype="*10-1000" nullmsg="请填写评论内容！"></textarea>
                                                <span class="Validform_checktip"></span>
                                            </div>
                                            <div class="subcon">
                                                <Button @click="submitComment" class="submit" id="btnSubmit">提交评论</Button>
                                                <span class="Validform_checktip"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <ul id="commentList" class="list-box">
                                        <!-- 评论长度等于0就显示 否则就隐藏 -->
                                        <p v-if="commentList.length==0" style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);">暂无评论，快来抢沙发吧！</p>
                                        <li v-for="(item, index) in commentList" :key="item.id">
                                            <div class="avatar-box">
                                                <i class="iconfont icon-user-full"></i>
                                            </div>
                                            <div class="inner-box">
                                                <div class="info">
                                                    <span>{{item.user_name}}</span>
                                                    <span>{{item.add_time | cutTime}}</span>
                                                </div>
                                                <p>{{item.content}}</p>
                                            </div>
                                        </li>
                                    </ul>
                                    <div class="page-box" style="margin: 5px 0px 0px 62px;">
                                        <Page :total="40" show-elevator show-sizer :page-size-opts='[5, 10,15,20]' placement='top'
                                        @on-change="pageChange($event)"
                                        @on-page-size-change="pagesizeChange($event)"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="left-220">
                        <div class="bg-wrap nobg">
                            <div class="sidebar-box">
                                <h4>推荐商品</h4>
                                <ul class="side-img-list">
                                    <li v-for="(item, index) in hotgoodslist" :key="item.id">
                                        <div class="img-box">
                                            <router-link :to="'/goodsInfo/'+item.id">
                                                <img :src="item.img_url">
                                            </router-link>
                                        </div>
                                        <div class="txt-box">
                                            <router-link :to="'/goodsInfo/'+item.id">
                                            {{item.title}}
                                            </router-link>
                                            <span>{{item.add_time | cutTime}}</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <BackTop></BackTop>
    </div>
</template>

<script>
// 引入放大镜模块
import ProductZoomer from "vue-product-zoomer";

export default {
  name: "goodInfo",
  data: function() {
    return {
      goodsinfo: {},
      hotgoodslist: [],
      imglist: [],
      // 切换内容和评论字段
      isShowDesc: true,
      // 购买数量
      buyNum: 1,
      //放大镜数据
      images: {
        normal_size: []
      },
      zoomerOptions: {
        zoomFactor: 3,
        pane: "container-round",
        hoverDelay: 300,
        namespace: "inline-zoomer",
        move_by_click: true,
        scroll_items: 5,
        choosed_thumb_border_color: "#bbdefb"
      },
      //   评论相关的数据
      pageIndex: 1,
      pageSize: 5,
      commentList: [], // 评论数据
      commentContent: "" // 评论内容
    };
  },
  // 封装axios函数
  methods: {
    //   获取商品数据
    getData() {
      // 强制初始化
      (this.imglist = []), (this.images.normal_size = []);

      this.axios
        .get(`site/goods/getgoodsinfo/+${this.$route.params.id}`)
        .then(response => {
          // console.log(response);
          this.goodsinfo = response.data.message.goodsinfo;
          this.hotgoodslist = response.data.message.hotgoodslist;
          this.imglist = response.data.message.imglist;
          //赋值到images中
          this.imglist.forEach((v, i) => {
            // console.log(v.id);
            // console.log(v.original_path);
            this.images.normal_size.push({
              id: v.id,
              url: v.original_path
            });
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 获取评论数据
    getComments() {
      this.axios
        .get(
          `site/comment/getbypage/goods/${this.$route.params.id}?pageIndex=${
            this.pageIndex
          }&pageSize=${this.pageSize}`
        )
        .then(response => {
          //   console.log(response);
          this.commentList = response.data.message;
        })
        .catch(error => {
          console.log(error);
        });
    },

    // 点击推荐商品跳转第一种方法
    // hotgoods(){
    //     this.getData()
    // }

    // 添加到购物车
    cartAdd() {
      // console.log(1);
      this.$store.commit("increment", this.buyNum);
    },

    // 页码改变
    pageChange(page) {
      // console.log(page);
      this.pageIndex = page;
      this.getComments();
    },
    // 页容量改变
    pagesizeChange(pagesize) {
      this.pageSize = pagesize;
      // console.log(pagesize);
      this.getComments();
    },
    // 添加评论
    submitComment() {
      // site/validate/comment/post/goods/102
      if (this.commentContent == "") {
        this.$Message.error("对方不想和你说话，并向你抛出一堆异常");
        return;
      }
      this.axios
        .post(`site/validate/comment/post/goods/${this.$route.params.id}`, {
          commenttxt: this.commentContent
        })
        .then(response => {
          // console.log(response);
          if (response.data.status == 0) {
            this.$Message.success("评论发表成功");
            this.pageIndex = 1;
            this.getComments();
          }
        })
        .catch(err => {
          // console.log(err);
          this.$Message.success("评论发表错误");
        });

      // 清空评论
      this.commentContent = "";
    }
  },

  /* 生命周期函数 */
  // 在实例初始化之后，数据观测 (data observer) 和 event/watcher 事件配置之前被调用
  beforeCreate() {
    // console.log(this.$route.params.id);
    // 在beforeCreate阶段methods里面的函数可能还没有声明，所以不会触发 会报错
    //   this.getData() //报错
  },
  created() {
    // 商品详情
    this.getData();
    // 商品评论
    this.getComments();
  },
  // 在显示之前调用
  beforeMount() {},
  // 在显示时调用
  mounted() {},

  // 观察属性，属性值改变时自动调用
  watch: {
    $route(to, from) {
      // 对路由变化作出响应...比如点击推荐商品，需要跳转
      //   console.log("我改变了");
      // 调用函数
      this.getData();
      //   路由改变，重新获取评论
      this.getComments();
    }
  },

  // 引入放大镜组件
  components: {
    ProductZoomer
  }
};
</script>

<style >
/* 引入字体图标 */
@import url("../../node_modules/font-awesome/css/font-awesome.min.css");

.inline-zoomer-zoomer-box {
  width: 368px;
}
.pic-box .control-box .thumb-list {
  display: flex;
}
.thumb-list img {
  height: 78px;
  width: 78px;
  margin: 5px;
}
.control i {
  text-align: center;
}
</style>


