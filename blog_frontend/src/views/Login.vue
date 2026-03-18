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
import { signinApi } from '../api';
import { useRouter } from 'vue-router';  // 使用 useRouter 而不是导入 router 实例
const router = useRouter();


const proxy: any = getCurrentInstance()?.proxy;

// 用户
const user = {
    name: '',
    password: '',
};

const login = async () => {
    if (user.name && user.password) {
        let res = await signinApi({
            name: user.name,
            password: user.password,
        });
        if (res.code === 200) {
            localStorage.setItem('token', res.data.token);
            router.push('/view');
            proxy.$message({ type:'success', message: '登录成功' });
        } else {
            proxy.$message({ type: 'warning', message: '用户名或密码错误' });
        }
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