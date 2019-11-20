<template>
    <div>
        <div class="login-box">
            <h3>您好，请登录</h3>
            <van-cell-group>
                <van-field v-model="username" label="用户名" placeholder="请输入用户名"/>
                <van-field v-model="password" type="password" label="密码" placeholder="请输入密码"/>
            </van-cell-group>
            <div class="btn-row">
                <van-button type="info" @click="login">登录</van-button>
            </div>
        </div>
    </div>
</template>

<script>
    import { Notify } from 'vant';
    export default {
        name: "Login",
        data() {
            return {
                username:'',
                password:''
            }
        },
        methods:{
            login(){
                Notify({
                    message:'正在登录，请稍候....',
                    type:'primary',
                    duration:0
                });
                this.$axios.post('/user/login',this.$qs.stringify({
                    username:this.username,
                    password:this.password
                })).then((res)=>{
                    if (res.data.code === 0) {
                        Notify({
                            message:'登录成功，欢迎！',
                            type:'success'
                        });
                        sessionStorage.setItem('token',Date.now());
                        this.$router.push('/map')
                    } else {
                        Notify({
                            message:res.data.msg,
                            type:'danger'
                        });
                    }
                }).catch((error)=>{
                    Notify({
                        message:error.toString(),
                        type:'danger'
                    })
                });
            }
        },
        beforeMount() {
            if(sessionStorage.getItem('token')) {
                this.$router.push('/map')
            }
        }
    }
</script>

<style scoped>
    .login-box {
        width: 400px;
        margin: 200px auto;
    }

    .btn-row {
        margin-top: 20px;
    }
</style>