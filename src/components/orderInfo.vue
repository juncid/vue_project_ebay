<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="javascript:;">支付中心</a>
            </div>
        </div>

        <div class="section" v-if="message.length!=0">
            <div class="wrapper">
                <div class="bg-wrap">
                    <div class="nav-tit pay">
                        <a href="javascript:;" class="selected">支付中心</a>
                    </div>
                    <div class="form-box payment">
                        <div class="el-row">
                            <div class="el-col el-col-18">
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>订 单 号：</dt>
                                            <dd>{{message[0].order_no}}</dd>
                                        </dl>
                                    </div>
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>收货人姓名：</dt>
                                            <dd>{{message[0].accept_name}}</dd>
                                        </dl>
                                    </div>
                                </div>
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>送货地址：</dt>
                                            <dd>{{message[0].area}}{{message[0].address}}
                                            </dd>
                                        </dl>
                                    </div>
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>手机号码：</dt>
                                            <dd>{{message[0].mobile}}</dd>
                                        </dl>
                                    </div>
                                </div>
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>支付金额：</dt>
                                            <dd>{{message[0].order_amount}} 元</dd>
                                        </dl>
                                    </div>
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>支付方式：</dt>
                                            <dd>在线支付</dd>
                                        </dl>
                                    </div>
                                </div>
                                <div class="el-row">
                                        <div class="el-col el-col-12">
                                                <dl class="form-group">
                                                    <dt>备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：</dt>
                                                    <dd>{{message[0].message}}</dd>
                                                </dl>
                                            </div>
                                </div>
                            </div>
                            <div class="el-col el-col-6">
                                <VueQrcode v-if="codeUrl" :value="codeUrl" :options="{ size: 200 }"></VueQrcode>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import VueQrcode from '@xkeshi/vue-qrcode';

export default {
    name:'orderInfo',
    data:function () {  
        return{
            message:[],
            codeUrl:``
        }
    },
    components:{
        VueQrcode
    },
    created() {
         // console.log(this.$route.params.orderid);
        this.axios.get(`site/validate/order/getorder/${this.$route.params.orderid}`)
        .then(response=>{
            // console.log(response.data.message);
            

                this.message = response.data.message
            //  console.log(this.message);
        })
        .catch(error=>{
            console.log(error);
        }) 
        this.codeUrl = `http://47.106.148.205:8899/site/validate/pay/alipay/${this.$route.params.orderid}`
        // 轮询接口，判断是否支付成功
        let timeid = setInterval(()=>{
            // console.log(1);
            this.axios.get(`site/validate/order/getorder/${this.$route.params.orderid}`)
            .then(response=>{
                console.log(response);
                if (response.data.message[0].status==2) {
                    this.$Message.success('支付成功')
                    // 跳转页面
                    this.$router.push('/paySuccess')
                    // 清空计时器
                    clearInterval(timeid)
                }
            })
            .catch(error=>{
                console.log(error);
            })
        },2000)
    }
};
</script>
<style scoped>
</style>


