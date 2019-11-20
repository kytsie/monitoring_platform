<template>
    <div>
        <div class="left-menu">
            <div class="camera-list">
                <div class="camera-item" v-for="camera in camera_list" :key="camera.id">
                    <div class="van-ellipsis" @click="pin_to_camera(false,camera.id)">{{camera.name}}</div>
                </div>
            </div>
            <div class="camera-list-background"></div>
        </div>

        <baidu-map class="bm-view" ak="i8IpOeF6uGkoKF8GUBPSf5T0z79vYo4b" :center="center" :zoom="zoom" :scroll-wheel-zoom="true" :continuous-zoom="true" @click="add_camera">
            <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
            <bm-marker :position="{lng:item.x,lat:item.y}" @click="pin_to_camera($event,item.id)" v-for="item in camera_list" :key="item.id">
                <bm-info-window :show="item.show" @close="hide_window(item.id)">
                    {{item.name}}
                    <div class="btn-group">
                        <van-button style="margin-right: 10px" size="small" type="primary" @click="show_camera(item.id)">修改</van-button>
                        <van-button style="margin-right: 10px" size="small" type="danger" @click="del_camera(item.id)">移除</van-button>
                        <van-button size="small" type="info" @click="$router.push('/live?id='+item.id)">查看监控信息</van-button>
                    </div>
                </bm-info-window>
            </bm-marker>
        </baidu-map>

        <van-dialog class="dialog" v-model="show" title="新建卡口" show-cancel-button @confirm="upload_camera">
            <div class="label">卡口名称</div>
            <van-cell-group>
                <van-field class="input" v-model="name" placeholder="请输入卡口名称" />
            </van-cell-group>
            <div class="label">视频流地址1</div>
            <van-cell-group>
                <van-field class="input" v-model="stream1" placeholder="请输入视频流地址1" />
            </van-cell-group>
            <div class="label">视频流地址2</div>
            <van-cell-group>
                <van-field class="input" v-model="stream2" placeholder="请输入视频流地址2" />
            </van-cell-group>
        </van-dialog>

        <van-dialog class="dialog" v-model="show2" title="查看卡口" show-cancel-button confirm-button-text="修改" @confirm="save_camera">
            <div class="label">卡口名称</div>
            <van-cell-group>
                <van-field class="input" v-model="name" placeholder="请输入卡口名称" />
            </van-cell-group>
            <div class="label">视频流地址1</div>
            <van-cell-group>
                <van-field class="input" v-model="stream1" placeholder="请输入视频流地址1" />
            </van-cell-group>
            <div class="label">视频流地址2</div>
            <van-cell-group>
                <van-field class="input" v-model="stream2" placeholder="请输入视频流地址2" />
            </van-cell-group>
        </van-dialog>
    </div>
</template>

<script>
    import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
    import BmNavigation from 'vue-baidu-map/components/controls/Navigation.vue'
    import BmMarker from 'vue-baidu-map/components/overlays/Marker.vue';
    import BmInfoWindow from 'vue-baidu-map/components/overlays/InfoWindow.vue';

    import {Notify} from 'vant'
    export default {
        name: "Map",
        components:{
            BaiduMap,
            BmNavigation,
            BmMarker,
            BmInfoWindow
        },
        data() {
            return {
                center:{lng:108.923951,lat:34.238092}, // 地图中心坐标
                zoom:18, // 地图缩放等级
                x:0, // 单机选取点的经度
                y:0, // 点击选取点的纬度
                show:false, // 显示新建卡口的提示框
                show2:false, // 显示修改卡口的提示框
                id:'', // 显示修改卡口时 临时保存的id
                name:'', // 卡口名曾
                stream1:'', // 卡口直播流1
                stream2:'', // 卡口直播流2
                camera_list:[]
            }
        },
        methods:{
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
            // 点击地图触发新建卡口方法
            add_camera(e){
                this.x = '';
                this.y = '';
                this.name = '';
                this.stream1 = '';
                this.stream2 = '';
                // eslint-disable-next-line no-console
                console.log(e.point); // {lng: 108.92617, lat: 34.238394}
                this.x = e.point.lng;
                this.y = e.point.lat;
                this.show = true
            },
            // 新建卡口提示框点击保存触发方法
            upload_camera() {
                let data = {
                    x:this.x,
                    y:this.y,
                    name:this.name,
                    stream1:this.stream1,
                    stream2:this.stream2,
                    show:false
                };

                this.$axios.post('/add/address',this.$qs.stringify(data)).then(res=>{
                    if (res.data.code === 0) {
                        Notify({
                            message:'添加成功',
                            type:'success'
                        })
                        this.get_list();
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
            // 点击修改卡口信息触发显示提示框
            show_camera(id) {
                let item = this.camera_list.find(item=>{return item.id === id});
                this.id = id;
                this.x = item.x;
                this.y = item.y;
                this.name = item.name;
                this.stream1 = item.stream1;
                this.stream2 = item.stream2;
                this.show2 = true
            },
            // 修改卡口信息保存触发方法
            save_camera() {
                let data = {
                    id:this.id,
                    x:this.x,
                    y:this.y,
                    name:this.name,
                    stream1:this.stream1,
                    stream2:this.stream2
                };
                this.$axios.post('/update/address',this.$qs.stringify(data)).then(res=>{
                    if (res.data.code === 0) {
                        Notify({
                            message:'修改成功',
                            type:'success'
                        });
                        this.get_list();
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
                });
                this.show2 = false;
            },
            // 点击左侧列表或地图上已知点触发
            pin_to_camera(e,id) {
                if(e) {
                    //覆盖物阻止事件冒泡到地图上
                    e.domEvent.stopPropagation();
                    e.domEvent.cancelBubble = true;
                }
                let camera = this.camera_list.find(item=>{return item.id === id});
                this.center = {lng: camera.x, lat: camera.y};
                this.zoom = 20;
                camera.show = true;
                this.camera_list = this.camera_list;
            },
            // 点击x关闭提示框
            hide_window(id) {
                let camera = this.camera_list.find(item=>{return item.id === id});
                camera.show = false
                this.camera_list = this.camera_list;
            },
            del_camera(id) {
                this.$axios.post('/delete/address',this.$qs.stringify({id:id})).then(res=>{
                    if (res.data.code === 0) {
                        Notify({
                            message:'删除成功',
                            type:'success'
                        })
                        this.get_list();
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
            }
        },
        beforeCreate() {
            if(!this.$parent.check_login()) {
                this.$router.push('/login')
            }
        },
        beforeMount() {
            this.get_list()
        }
    }
</script>

<style scoped>
    .bm-view {
        width: 100%;
        height: 100%;
    }
    .label {
        color: #000;
        padding-top: 10px;
        font-size: 14px;
        margin-left: 10px;
    }
    .input {
        width: auto;
        margin: 5px 10px;
        background-color: #ddd;
        border: 1px solid rgba(0,0,0,0);
    }

    .input:hover {
        border: 1px solid black;
    }

    .left-menu {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 10;
        width: 250px;
        height: 100%;
        overflow: hidden;
    }

    .camera-list {
        width: 250px;
        padding-top: 20px;
        height: calc(100% - 50px);
        overflow-y: scroll;
        overflow-x: hidden;
    }

    .camera-list-background {
        z-index: -1;
        position: absolute;
        top: -50px;
        left: -50px;
        width: 350px;
        height: calc(100% + 100px);
        filter: blur(25px);
        background: url("../assets/menu.png") center;
        background-size: cover;
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

    .btn-group {
        margin-top: 20px;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
    }

</style>