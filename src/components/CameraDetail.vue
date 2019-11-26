<template>
    <div class="main">
        <div class="left-menu">
            <div class="camera-list">
                <div class="camera-item" v-for="camera in camera_list" :key="camera.id">
                    <div class="van-ellipsis" @click="change_camera(camera.id)">{{camera.name}}</div>
                </div>
            </div>
            <div class="left-menu-switch"><i class="mdui-icon material-icons arrow">keyboard_arrow_right</i></div>
        </div>

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
                    <img :src="'data:image/jpg;base64,' + item" alt="" height="100%">
                </div>
            </transition-group>
        </div>
        <div class="bike-box">
            <div class="label">
                <i class="mdui-icon material-icons">directions_bike</i>
            </div>
            <transition-group name="flip-list" enter-active-class="animated fadeInLeft" tag="div" class="list">
                <div class="item" v-for="(item,index) in motor_list" :key="index">
                    <img :src="'data:image/jpg;base64,' + item" alt="" height="100%">
                </div>
            </transition-group>
        </div>
        <div class="car-box">
            <div class="label">
                <i class="mdui-icon material-icons">directions_car</i>
            </div>
            <transition-group name="flip-list" enter-active-class="animated fadeInLeft" tag="div" class="list">
                <div class="item" v-for="(item,index) in car_list" :key="index">
                    <img :src="'data:image/jpg;base64,' + item" alt="" height="100%">
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
                init:false,
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
                player:null,
                camera_list:[]
            }
        },
        methods:{
            add_pic() {
                this.$axios.get('/get/picture').then(res=>{
                    if (res.data.code === 0) {

                        if(this.init===false){
                            this.init = true;
                            return;
                        }
                        let car_growth = res.data.data[0].picGrowth[0];
                        let person_growth = res.data.data[0].picGrowth[1];
                        let motor_growth = res.data.data[0].picGrowth[2];

                        let d = new Date();
                        d.setTime(d.getTime()-d.getTimezoneOffset()*60000);
                        let now = d.toJSON().slice(0,-5);
                        d.setTime(d.getTime()-20*1000);

                        this.echartOption.xAxis.min = d.toJSON().slice(0, -5);
                        this.echartOption.xAxis.max = now;
                        this.echartOption.series[0].data.push([now,person_growth]);
                        this.echartOption.series[1].data.push([now,motor_growth]);
                        this.echartOption.series[2].data.push([now,car_growth]);

                        this.echartOption = this.echartOption;

                        for(let i=0; i<10; i++) {
                            let motor = res.data.data[0].motor[i];
                            if (motor!==undefined) {
                                this.motor_list.push(motor.replace(/\\r\\n/g,''))
                            }

                            let car = res.data.data[0].car[i];
                            if (car!==undefined) {
                                this.car_list.push(car.replace(/\\r\\n/g,''))
                            }

                            let person = res.data.data[0].person[i];
                            if (person!==undefined) {
                                this.person_list.push(person.replace(/\\r\\n/g,''))
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
                    this.add_pic()
                },1000)
            },
            stop_add() {
                clearInterval(this.interval_obj);
                this.interval_obj = null;
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
            },
            get_list() {
                this.$axios.get('/get/address/all').then(res=>{
                    if (res.data.code === 0) {
                        let list = res.data.data;

                        for(let i=0; i<list.length; i++) {
                            list[i].show = false
                        }

                        this.camera_list = list;
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
            stream_init() {
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
            change_camera(id) {
                this.id = id;
                this.stream_init();
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
            this.get_list();
        },
        mounted() {
            this.begin_add();
            this.stream_init();
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

    .left-menu {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 10;
        width: 250px;
        height: 100%;
        transition: all 0.2s ease;
        transform: translateX(-250px);
    }

    .arrow {
        transition: all 0.2s ease;
    }

    .left-menu:hover {
        transform: translateX(0);
    }

    .left-menu:hover .arrow {
        transform: rotate(180deg);
    }

    .camera-list {
        width: 250px;
        padding-top: 20px;
        height: calc(100% - 50px + 60px);
        overflow-y: scroll;
        overflow-x: hidden;
        background-color: rgba(115, 115, 115, 0.7);
    }

    .camera-item {
        box-sizing: border-box;
        color: #fff;
        height: 50px;
        line-height: 50px;
        padding: 0 20px;
        width: 220px;
        margin-left: 5px;
        border: 1px solid rgba(0,0,0,0);
    }

    .camera-item:hover {
        border: 1px solid white;
        cursor: pointer;
    }

    .left-menu-switch {
        z-index: 100;
        position: absolute;
        width: 30px;
        height: 60px;
        right: -30px;
        top: calc(50% - 60px);
        line-height: 60px;
        background: linear-gradient(to bottom right, rgb(132,195,228),rgb(203,181,216));
        text-align: center;
    }
</style>