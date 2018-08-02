<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="#/" class="router-link-active">首页</a> &gt;
                <a href="#/site/goodslist" class="router-link-exact-active router-link-active">购物商城</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper">
                <div class="wrap-box">
                    <!-- 左边 -->
                    <div class="left-220" style="margin: 0px;">
                        <div class="banner-nav">
                            <ul>
                                <li v-for="(item, index) in catelist" :key="item.id">
                                    <h3>
                                        <i class="iconfont icon-arrow-right"></i>
                                        <span>{{item.title}}</span>
                                        <p>
                                            <span v-for="(itemSon, index) in item.subcates" :key="itemSon.id">
                                                {{itemSon.title}}&nbsp;
                                            </span>
                                        </p>
                                    </h3>
                                    <div class="item-box">
                                        <dl>
                                            <dt>
                                                <a href="/goods/40.html">{{item.title}}</a>
                                            </dt>
                                            <dd>
                                                <a v-for="(itemSon, index) in item.subcates" :key="itemSon.id" href="/goods/43.html">{{itemSon.title}}</a>
                                            </dd>
                                        </dl>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!--轮播图-->
                    <div class="left-705">
                        <el-carousel height="341px" :interval="5000" arrow="always">
                            <el-carousel-item v-for="(item, index) in sliderlist" :key="item.id">
                                <img :src="item.img_url" alt="">
                            </el-carousel-item>
                        </el-carousel>
                    </div>
                    <!-- 右边 -->
                    <div class="left-220">
                        <ul class="side-img-list">
                            <li v-for="(item, index) in toplist" :key="item.id">
                                <div class="img-box">
                                    <label>{{index+1}}</label>
                                    <img :src="item.img_url">
                                </div>
                                <div class="txt-box">
                                    <!-- <a href="/goods/show-98.html">{{item.title}}</a> -->
                                    <router-link :to="`/goodsInfo/`+item.id">{{item.title}}</router-link>
                                    <span>{{item.add_time | cutTime}}</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="section" v-for="(item, index) in goodlist" :key="item.level1cateid">
            <div class="main-tit">
                <h2>{{item.catetitle}}</h2>
                <p>
                    <a v-for="(itemSon, idx) in item.level2catelist" :key="itemSon.subcateid" href="/goods/43.html">{{itemSon.subcatetitle}}</a>
                    <a href="/goods/40.html">更多
                        <i>+</i>
                    </a>
                </p>
            </div>
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <ul class="img-list">
                        <li v-for="(itm, i) in item.datas" :key="itm.artID">
                            <router-link :to="'/goodsInfo/'+itm.artID">
                                <div class="img-box">
                                    <img v-lazy="itm.img_url">
                                </div>
                                <div class="info">
                                    <h3>{{itm.artTitle}}</h3>
                                    <p class="price">
                                        <b>{{item.sell_price}}</b>元</p>
                                    <p>
                                        <strong>库存 {{itm.stock_quantity}}</strong>
                                        <span>市场价：
                                            <s>{{itm.market_price}}</s>
                                        </span>
                                    </p>
                                </div>
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>


<script>




export default {
    data:function(){
        return{
            catelist:[],
            sliderlist:[],
            toplist:[],
            goodlist:[]
        }
    },

    // 生命周期函数(即将显示时调用)
    beforeMount() {
        // 调用接口
        this.axios.get('site/goods/gettopdata/goods')
        .then((response)=>{
            // console.log(response);
            this.catelist = response.data.message.catelist;
            this.sliderlist = response.data.message.sliderlist;
            this.toplist = response.data.message.toplist;
        })
        .catch((response)=>{
            console.log(response);
        })
    },
    // 生命周期函数(显示时调用)
    mounted() {
        this.axios.get('site/goods/getgoodsgroup')
        .then((response)=>{
            // console.log(response);
            this.goodlist = response.data.message
        })
        .catch((response)=>{
            
        })
    },
};
</script>
<style scoped>
.left-705 img{
    width: 100%;
    height: 100%;
}
</style>


