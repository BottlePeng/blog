<template>
    <yk-space class="login">
        <yk-space dir="vertical" class="login-box">
            <yk-input v-model="user.name" type="text" />
            <yk-input v-model="user.password" type="password" />
            <yk-button type="primary" @click="login">登录</yk-button>
        </yk-space>
    </yk-space>
</template>

<script lang="ts" setup>
import { getCurrentInstance } from 'vue';


const proxy: any = getCurrentInstance()?.proxy;

// 用户
const user = {
    name: '',
    password: '',
};

const login = () => {
    if (user.name && user.password) {
        
    } else {
        proxy.$message({ type: 'warning', message: '用户名或密码不能为空' });
    }
}

</script>

<style lang="less" scoped>
    .login {
        z-index: 1001;
        background: @bg-color-l;
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        display: flex;
        justify-content: center;
        align-items: center;

        .login-box {
            background-color: #555555;
            width: 300px;
            height: 300px;
        }
    }
</style>