<template>
    <div>
        <div class="video-panel">
            <div :class="{live1:true, width100:true, width50:double_screen}">
                <video id="videoElement1" class="video-box" controls autoplay width="100%" height="100%">Your browser is too old which doesn't support HTML5 video.</video>
            </div>
            <div class="live2" v-show="double_screen" style="width:50%">
                <video id="videoElement2" class="video-box" controls autoplay width="100%" height="100%">Your browser is too old which doesn't support HTML5 video.</video>
            </div>
        </div>
        <div :class="{'bottom-panel':true, 'bottom-panel-expand':show_bottom_panel}">
            <div class="expand-btn" @click="show_bottom_panel = !show_bottom_panel">. . .</div>
            <div class="content" @mouseover="stop_add" @mouseout="begin_add">
                <transition-group name="flip-list" enter-active-class="animated fadeInLeft" tag="div" class="list">
                    <div class="item" v-for="(item,index) in pic_list" :key="index">
                        <img :src="img_root + item" alt="" height="100%">
                    </div>
                </transition-group>
                <div class="btn-group">
                    <van-button size="small" type="primary" @click="double_screen = !double_screen">切换分屏</van-button>
                    <van-button size="small" type="info" @click="$router.push('/detail?id='+id)">详细统计</van-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import flvjs from 'flv.js/dist/flv.js'

    import { Notify } from 'vant'

    export default {
        name: "CameraLive",
        data() {
            return {
                img_root:'http://localhost:8089/image/',
                id:0, // 获取传递过来的id值
                name:'测试卡口监控1', // 卡口名称
                stream1:'', //
                stream2:'',
                playerOptions1: {
                    autoplay: true, //如果true,浏览器准备好时开始回放。
                    muted: false, // 默认情况下将会消除任何音频。
                    language: 'zh-CN',
                    sources: [{
                        type: "application/x-mpegURL",
                        src: "" //你的m3u8地址（必填）
                    }],
                    notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
                    fill: true,
                    height:document.documentElement.clientHeight,
                    controlBar: {
                        timeDivider: false,
                        durationDisplay: false,
                        remainingTimeDisplay: false,
                        fullscreenToggle: true  //全屏按钮
                    }
                },
                playerOptions2: {
                    autoplay: true, //如果true,浏览器准备好时开始回放。
                    muted: false, // 默认情况下将会消除任何音频。
                    language: 'zh-CN',
                    sources: [{
                        type: "application/x-mpegURL",
                        src: "http://192.168.28.1:10080/hls/BhPxX1JWR/BhPxX1JWR_live.m3u8" //你的m3u8地址（必填）
                    }],
                    notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
                    fill: true,
                    height:document.documentElement.clientHeight,
                    controlBar: {
                        timeDivider: false,
                        durationDisplay: false,
                        remainingTimeDisplay: false,
                        fullscreenToggle: true  //全屏按钮
                    }
                },
                double_screen:false,
                show_bottom_panel:false,
                pic_list:[],
                interval_obj:null,
                player1:null,
                player2:null
            }
        },
        methods:{
            add_pic(){
                this.$axios.get('/get/picture').then(res=>{
                    if (res.data.code === 0) {
                        for(let i=0; i<2; i++) {

                            let motor = 'motor/'+res.data.data[0].motor[i];
                            if (motor!==undefined && this.pic_list.indexOf(motor) < 0) {
                                this.pic_list.push(motor)
                            }

                            let car = 'car/'+res.data.data[0].car[i];
                            if (car!==undefined && this.pic_list.indexOf(car) < 0) {
                                this.pic_list.push(car)
                            }

                            let person = 'person/'+res.data.data[0].person[i];
                            if (person!==undefined && this.pic_list.indexOf(person) < 0) {
                                this.pic_list.push(person)
                            }
                        }
                    } else {
                        Notify({
                            message:res.data.msg,
                            type:'danger'
                        })
                    }
                }).catch(error=>{
                    Notify({
                        message:error.toString(),
                        type:'danger'
                    })
                })
            },
            begin_add(){
                if(this.interval_obj!==null) return;
                this.interval_obj = setInterval(()=>{
                    this.add_pic()
                },1000)
            },
            stop_add(){
                clearInterval(this.interval_obj)
                this.interval_obj = null;
            },
            player_init() {
                this.player1 = document.getElementById('videoElement1');
                this.player2 = document.getElementById('videoElement2');
                if (flvjs.isSupported()) {
                    let flv_obj1 = flvjs.createPlayer({
                        type:'flv',
                        "isLive":true,
                        url:this.stream1
                    });
                    let flv_obj2 = flvjs.createPlayer({
                        type:'flv',
                        "isLive":true,
                        url:this.stream2
                    });
                    flv_obj1.attachMediaElement(this.player1);
                    flv_obj2.attachMediaElement(this.player2);
                    flv_obj1.load();
                    flv_obj2.load();
                    this.player1.play();
                    this.player2.play();
                }
            }
        },
        beforeMount() {
            this.id = this.$route.query.id;
            if(this.id === undefined) {
                this.$router.go(-1);
            }
        },
        beforeCreate(){
            if(!this.$parent.check_login()){
                this.$router.push('/login')
            }
        },
        mounted(){
            this.begin_add();
            this.$axios.get('/get/address/'+this.id).then(res=>{
                if (res.data.code === 0) {
                    this.stream1 = res.data.data[0].stream1;
                    this.stream2 = res.data.data[0].stream2;
                    this.player_init()
                } else {
                    Notify({
                        message:res.data.msg,
                        type:'danger'
                    })
                }
            }).catch(error=>{
                Notify({
                    message:error.toString(),
                    type:'danger'
                })
            })
        },
        beforeDestroy() {
            clearInterval(this.interval_obj);
            this.interval_obj = null
        }
    }
</script>

<style scoped>
    @import "../assets/animate.css";
    .video-panel {
        display: flex;
        flex-direction: row;
        height: calc(100% - 20px);
    }

    .live1 {
        height: 100%;
    }

    .video-player {
        height: 100%;
    }

    .bottom-panel {
        position: absolute;
        z-index: 10;
        bottom: 0;
        left: 0;
        height: 20px;
        width: 100%;
        background-color: rgb(33,33,33);
        overflow: hidden;
        transition: all 0.2s ease;
    }

    .bottom-panel-expand {
        height: 120px;
    }

    .width100 {
        width: 100%;
        transition: all 0.2s ease;
    }

    .width50 {
        width: 50%;
    }

    .expand-btn {
        width: 100%;
        height: 20px;
        background-color: #999;
        color: black;
        line-height: 20px;
        font-weight: 700;
        text-align: center;
    }

    .expand-btn:hover {
        background-color: white;
    }

    .content {
        display: flex;
        flex-direction: row;
        height: 100px;
    }

    .btn-group {
        box-sizing: border-box;
        padding: 10px;
        height: 100px;
        width: 100px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        flex-shrink: 0;
    }

    .list {
        display: flex;
        flex-direction: row-reverse;
        justify-content: flex-end;
        flex-wrap: nowrap;
        overflow: hidden;
        height: 100px;
        flex-grow: 1;
    }

    .item {
        box-sizing: border-box;
        height: 80px;
        width: 80px;
        margin: 10px;
        border: 1px solid white;
        transition: all 0.2s ease;
        flex-shrink: 0;
        overflow: hidden;
    }

    .flip-list-move {
        transition: transform 0.2s;
    }

    .video-box {
        background-color: #000000;
    }
</style>