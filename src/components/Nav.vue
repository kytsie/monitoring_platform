<template>
    <div>
        <div class="nav-box">

            <div class="nav-row">
                <div class="label">快速筛选</div>
                <div class="item">
                    <div class="nav-logo"></div>
                    语义搜人
                </div>
                <div class="item">
                    <div class="nav-logo"></div>
                    语义搜车
                </div>
                <div class="item">
                    <div class="nav-logo"></div>
                    语义搜骑
                </div>
            </div>

            <div class="nav-row">
                <div class="label">智能检索</div>
                <div class="item">
                    <div class="nav-logo"></div>
                    以图搜人
                </div>
                <div class="item">
                    <div class="nav-logo"></div>
                    以图搜车
                </div>
                <div class="item">
                    <div class="nav-logo"></div>
                    以图搜骑
                </div>
            </div>

            <div class="nav-row">
                <div class="label">综合应用</div>
                <div class="item">
                    <div class="nav-logo"></div>
                    城市态势分析
                </div>
                <div class="item">
                    <div class="nav-logo"></div>
                    智慧交通分析
                </div>
                <div class="item">
                    <div class="nav-logo"></div>
                    街区扰动分析
                </div>
                <div class="item">
                    <div class="nav-logo"></div>
                    接力追踪
                </div>
            </div>

            <div class="nav-row">
                <div class="label">结构化</div>
                <div class="item" @click="$router.push('/map')">
                    <div class="nav-logo"></div>
                    全目标结构化
                </div>
                <div class="item">
                    <div class="nav-logo"></div>
                    卡口车辆结构化
                </div>
                <div class="item">
                    <div class="nav-logo"></div>
                    人脸结构化
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Nav"
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
        background-color: #888;
        border-radius: 5px;
        width: 50px;
        height: 50px;
        margin-right: 10px;
    }
</style>