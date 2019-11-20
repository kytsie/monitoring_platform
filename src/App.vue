<template>
  <div class="main">
    <div class="mdui-appbar">
      <div class="mdui-toolbar mdui-color-theme">
        <router-link to="/nav" class="mdui-typo-headline">{{mainTitle}}</router-link>
        <a href="javascript:;" class="mdui-btn" v-show="history_back" @click="$router.go(-1)"><i class="mdui-icon material-icons">arrow_back</i>返回上一级</a>
        <div class="mdui-toolbar-spacer"></div>
        <a href="javascript:;" class="mdui-btn mdui-btn-icon"><i class="mdui-icon material-icons">search</i></a>
        <a href="javascript:;" class="mdui-btn mdui-btn-icon" @click="logout"><i class="mdui-icon material-icons">close</i></a>
      </div>
    </div>
    <transition enter-active-class="animated fadeInRight">
      <router-view class="transitionBody"></router-view>
    </transition>
  </div>
</template>

<script>
import { Notify } from 'vant'

export default {
  name: 'app',
  data(){
    return {
      mainTitle:'全目标结构化系统'
    }
  },
  methods:{
    logout(){
      sessionStorage.clear();
      Notify({
        message:'您已退出登录',
        type:'primary'
      });
      this.$axios.post('/user/logout');
      this.$router.push('/login')
    },
    check_login(){
      if(!sessionStorage.getItem('token')) {
        Notify({
          message:'您好，请登录',
          type:'warning'
        })
        return false
      }
      return true
    }
  },
  computed:{
    history_back(){
      return this.$route.path !== '/nav';
    }
  }
}
</script>

<style scoped>
  @import "assets/animate.css";
  .transitionBody {
    position: absolute;
    left: 0;
    top: 64px;
    width: 100%;
    height: calc(100% - 64px);
    background: url("./assets/bg.jpg") no-repeat;
    background-size: 100% 100%;
  }
</style>