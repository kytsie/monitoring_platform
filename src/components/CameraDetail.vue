<template>
    <div class="main">
        <div class="top-box">
            <div class="camera-box">
                <video id="videoElement" class="video-box" controls autoplay width="100%" height="100%">Your browser is too old which doesn't support HTML5 video.</video>
            </div>
            <div class="echart-box">
                <v-chart :options="echartOption"></v-chart>
            </div>
        </div>
        <div class="man-box">
            <div class="label">
                <i class="mdui-icon material-icons">directions_walk</i>
            </div>
            <transition-group name="flip-list" enter-active-class="animated fadeInLeft" tag="div" class="list">
                <div class="item" v-for="(item,index) in person_list" :key="index">
                    <img :src="img_root + item" alt="" height="100%">
                </div>
            </transition-group>
        </div>
        <div class="bike-box">
            <div class="label">
                <i class="mdui-icon material-icons">directions_bike</i>
            </div>
            <transition-group name="flip-list" enter-active-class="animated fadeInLeft" tag="div" class="list">
                <div class="item" v-for="(item,index) in motor_list" :key="index">
                    <img :src="img_root + item" alt="" height="100%">
                </div>
            </transition-group>
        </div>
        <div class="car-box">
            <div class="label">
                <i class="mdui-icon material-icons">directions_car</i>
            </div>
            <transition-group name="flip-list" enter-active-class="animated fadeInLeft" tag="div" class="list">
                <div class="item" v-for="(item,index) in car_list" :key="index">
                    <img :src="img_root + item" alt="" height="100%">
                </div>
            </transition-group>
        </div>
    </div>
</template>

<script>
    import flvjs from 'flv.js/dist/flv.js'

    import {Notify} from 'vant'

    import Echarts from 'vue-echarts'
    import 'echarts/lib/chart/line'
    import 'echarts/lib/component/title'
    import 'echarts/lib/component/legend'
    import 'echarts/lib/component/tooltip'
    import 'echarts/lib/component/grid'

    export default {
        name: "CameraDetail",
        components: {
            'v-chart':Echarts
        },
        data() {
            return {
                img_root:'http://localhost:8089/image/',
                id:'',
                stream1:'',
                echartOption:{
                    title: {
                        text: '实时数据统计',
                        textStyle:{
                            color:'#fff'
                        }
                    },
                    legend: {
                        textStyle:{color:'white'},
                        data: [
                            { name:'行人' },
                            { name:'单车' },
                            { name:'汽车' }
                        ]
                    },
                    xAxis: {
                        type:'time',
                        name:'时间',
                        nameTextStyle:{
                            color:'#fff'
                        },
                        min:null,
                        max:null,
                        axisLine: {
                            lineStyle:{
                                color: '#d14a61'
                            }
                        },
                        axisLabel:{
                            color:'#fff'
                        },
                        splitLine:{
                            show:false
                        }
                    },
                    yAxis: {
                        name:'数量',
                        nameTextStyle:{
                            color:'#fff'
                        },
                        axisLine: {
                            lineStyle:{
                                color: '#5793f3'
                            }
                        },
                        axisLabel:{
                            color:'#fff'
                        },
                        splitLine:{
                            show:false
                        }
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross'
                        }
                    },
                    series: [
                        {
                            type:'line',
                            name:'行人',
                            smooth:true,
                            data:[],
                            lineStyle:{
                                color: 'rgb(233,42,45)'
                            },
                            itemStyle:{
                                color:'rgb(233,42,45)',
                                opacity:0
                            },
                            areaStyle:{
                                color: {
                                    type: 'linear',
                                    x: 0,
                                    y: 0,
                                    x2: 0,
                                    y2: 1,
                                    colorStops: [{
                                        offset: 0, color: 'rgb(233,42,45)' // 0% 处的颜色
                                    }, {
                                        offset: 1, color: 'rgba(0,0,0,0)' // 100% 处的颜色
                                    }],
                                    global: false // 缺省为 false
                                }
                            }
                        },
                        {
                            type:'line',
                            name:'单车',
                            smooth:true,
                            data:[],
                            lineStyle:{
                                color: 'rgb(75,76,233)'
                            },
                            itemStyle:{
                                color:'rgb(75,76,233)',
                                opacity:0
                            },
                            areaStyle:{
                                color: {
                                    type: 'linear',
                                    x: 0,
                                    y: 0,
                                    x2: 0,
                                    y2: 1,
                                    colorStops: [{
                                        offset: 0, color: 'rgb(75,76,233)' // 0% 处的颜色
                                    }, {
                                        offset: 1, color: 'rgba(0,0,0,0)' // 100% 处的颜色
                                    }],
                                    global: false // 缺省为 false
                                }
                            }
                        },
                        {
                            type:'line',
                            name:'汽车',
                            smooth:true,
                            data:[],
                            lineStyle:{
                                color: 'rgb(102,233,74)'
                            },
                            itemStyle:{
                                color:'rgb(102,233,74)',
                                opacity:0
                            },
                            areaStyle:{
                                color: {
                                    type: 'linear',
                                    x: 0,
                                    y: 0,
                                    x2: 0,
                                    y2: 1,
                                    colorStops: [{
                                        offset: 0, color: 'rgb(102,233,74)' // 0% 处的颜色
                                    }, {
                                        offset: 1, color: 'rgba(0,0,0,0)' // 100% 处的颜色
                                    }],
                                    global: false // 缺省为 false
                                }
                            }
                        }
                    ],
                    animationDuration: 200
                },
                motor_list: [],
                car_list: [],
                person_list: [],
                interval_obj:null,
                player:null
            }
        },
        methods:{
            add_pic() {
                this.$axios.get('/get/picture').then(res=>{
                    if (res.data.code === 0) {
                        for(let i=0; i<10; i++) {
                            let motor = 'motor/'+res.data.data[0].motor[i];
                            if (this.motor_list.indexOf(motor) < 0) {
                                this.motor_list.push(motor)
                            }

                            let car = 'car/'+res.data.data[0].car[i];
                            if (this.car_list.indexOf(car) < 0) {
                                this.car_list.push(car)
                            }

                            let person = 'person/'+res.data.data[0].person[i];
                            if (this.person_list.indexOf(person) < 0) {
                                this.person_list.push(person)
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
            begin_add() {
                if (this.interval_obj !== null) return;
                this.interval_obj = setInterval(()=>{
                    this.add_pic();
                    this.get_count()
                },1000)
            },
            stop_add() {
                clearInterval(this.interval_obj);
                this.interval_obj = null;
            },
            get_count(){
                this.$axios.get('/get/picture/growth').then(res=>{
                    if (res.data.code === 0) {
                        let mount1 = res.data.data[0].person;
                        let mount2 = res.data.data[0].motor;
                        let mount3 = res.data.data[0].car;

                        let d = new Date();
                        d.setTime(d.getTime()-d.getTimezoneOffset()*60000);
                        let now = d.toJSON().slice(0,-5);
                        d.setTime(d.getTime()-20*1000);

                        this.echartOption.xAxis.min = d.toJSON().slice(0, -5);
                        this.echartOption.xAxis.max = now;
                        this.echartOption.series[0].data.push([now,mount1]);
                        this.echartOption.series[1].data.push([now,mount2]);
                        this.echartOption.series[2].data.push([now,mount3]);

                        if(this.echartOption.series[0].data.length>22){
                            this.echartOption.series[0].data.splice(0,1);
                            this.echartOption.series[1].data.splice(0,1);
                            this.echartOption.series[2].data.splice(0,1);
                        }

                        this.echartOption = this.echartOption;
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
            player_init(){
                this.player = document.getElementById('videoElement');
                if (flvjs.isSupported()) {
                    let flvPlayer = flvjs.createPlayer({
                        type:'flv',
                        "isLive":true,
                        url:this.stream1
                    });
                    flvPlayer.attachMediaElement(this.player);
                    flvPlayer.load();
                    this.player.play();
                }
            }
        },
        beforeCreate(){
            if(!this.$parent.check_login()){
                this.$router.push('/login')
            }
        },
        beforeMount(){
            this.id = this.$route.query.id;
            if(this.id===undefined){
                this.$router.go(-1)
            }
        },
        mounted() {
            this.begin_add();
            this.$axios.get('/get/address/'+this.id).then(res=>{
                if (res.data.code === 0) {
                    this.stream1 = res.data.data[0].stream1;
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
    .main {
        min-width: 1000px;
    }

    .top-box {
        display: flex;
        flex-direction: row;
        padding: 20px;
    }
    .camera-box {
        height: 300px;
        width: 400px;
        flex-shrink: 0;
        background-color: #aaa;
    }
    .echart-box {
        height: 300px;
        flex-grow: 1;
        background-color: rgba(0,0,0,0.35);
        margin-left: 20px;
    }
    .echarts {
        width: 100%;
        height: 100%;
    }

    .man-box,
    .bike-box,
    .car-box {
        display: flex;
        flex-direction: row;
        padding: 20px;
    }

    .label {
        box-sizing: border-box;
        border: 1px solid white;
        background-color: rgb(2,9,37);
        height: 100px;
        width: 30px;
        line-height: 100px;
        text-align: center;
        flex-shrink: 0;
    }

    .list {
        height: 100px;
        flex-grow: 1;
        background-color: rgb(2,9,37);
        margin-left: 20px;
        display: flex;
        flex-direction: row-reverse;
        justify-content: flex-end;
        overflow: hidden;
    }
    .item {
        box-sizing: border-box;
        border: 1px solid white;
        height: 100px;
        margin-left: 5px;
        margin-right: 5px;
        flex-shrink: 0;
        width: auto;
        overflow: hidden;
    }

    .flip-list-move {
        transition: transform 0.2s;
    }

    .video-box {
        background-color: #000000;
    }
</style>