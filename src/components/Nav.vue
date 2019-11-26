<template>
    <div>
        <div class="nav-box">

            <div class="nav-row">
                <div class="label">快速筛选</div>
                <div class="item">
                    <div class="nav-logo bg-linear-green"><i class="mdui-icon material-icons">directions_walk</i></div>
                    语义搜人
                </div>
                <div class="item">
                    <div class="nav-logo bg-linear-blue"><i class="mdui-icon material-icons">directions_car</i></div>
                    语义搜车
                </div>
                <div class="item">
                    <div class="nav-logo bg-linear-pink"><i class="mdui-icon material-icons">directions_bike</i></div>
                    语义搜骑
                </div>
            </div>

            <div class="nav-row">
                <div class="label">智能检索</div>
                <div class="item">
                    <div class="nav-logo bg-linear-purple"><i class="mdui-icon material-icons">portrait</i></div>
                    以图搜人
                </div>
                <div class="item">
                    <div class="nav-logo bg-linear-blue"><i class="mdui-icon material-icons">burst_mode</i></div>
                    以图搜车
                </div>
                <div class="item">
                    <div class="nav-logo bg-linear-green"><i class="mdui-icon material-icons">collections</i></div>
                    以图搜骑
                </div>
            </div>

            <div class="nav-row">
                <div class="label">综合应用</div>
                <div class="item">
                    <div class="nav-logo bg-linear-green"><i class="mdui-icon material-icons">equalizer</i></div>
                    城市态势分析
                </div>
                <div class="item">
                    <div class="nav-logo bg-linear-blue"><i class="mdui-icon material-icons">fullscreen_exit</i></div>
                    智慧交通分析
                </div>
                <div class="item">
                    <div class="nav-logo bg-linear-purple"><i class="mdui-icon material-icons">wifi_tethering</i></div>
                    街区扰动分析
                </div>
                <div class="item">
                    <div class="nav-logo bg-linear-pink"><i class="mdui-icon material-icons">track_changes</i></div>
                    接力追踪
                </div>
            </div>

            <div class="nav-row">
                <div class="label">结构化</div>
                <div class="item" @click="$router.push('/map')">
                    <div class="nav-logo bg-linear-green"><i class="mdui-icon material-icons">crop_square</i></div>
                    全目标结构化
                </div>
                <a class="item" href="http://localhost:1101" target="_blank">
                    <div class="nav-logo bg-linear-blue"><i class="mdui-icon material-icons">videocam</i></div>
                    卡口车辆结构化
                </a>
                <div class="item">
                    <div class="nav-logo bg-linear-pink"><i class="mdui-icon material-icons">sentiment_very_satisfied</i></div>
                    人脸结构化
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Nav",
    }
</script>

<style scoped>
    .nav-box {
        height: 400px;
        width: 1000px;
        padding: 50px;
        margin: 30px auto;
        background-color: rgba(0,0,0,0.3);
        box-shadow: 0 6px 12px rgba(0,0,0,0.175);
    }

    .nav-row {
        display: flex;
        flex-direction: row;
        margin-top: 20px;
        margin-bottom: 20px;
    }

    .label {
        line-height: 72px;
        color: #aaa;
        width: 100px;
    }

    .item {
        box-sizing: border-box;
        padding: 10px;
        color: #fff;
        width: 200px;
        line-height: 50px;
        display: flex;
        flex-direction: row;
        border: 1px solid rgba(0,0,0,0);
    }

    .item:hover {
        border: 1px solid #eee;
        cursor: pointer;
    }

    .nav-logo {
        border-radius: 50%;
        width: 50px;
        height: 50px;
        text-align: center;
        margin-right: 10px;
        font-size: 28px;
        line-height: 50px;
    }

    .bg-linear-green {
        background: linear-gradient(to bottom, rgb(155,209,246),rgb(70,180,199));
    }

    .bg-linear-blue {
        background: linear-gradient(to bottom, rgb(94,154,214),rgb(50,111,190));
    }

    .bg-linear-pink {
        background: linear-gradient(to bottom right, rgb(132,195,228),rgb(203,181,216));
    }

    .bg-linear-purple {
        background: linear-gradient(to bottom, rgb(109,78,154),rgb(68,73,165));
    }

    .mdui-icon {
        font-size: 28px;
        display: inline-block;
        margin-top: -5px;
    }
</style>