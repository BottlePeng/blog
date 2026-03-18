<template>
    <yk-space class="login">
        <yk-space dir="vertical" class="login-box">
            <yk-input v-model="user.name" type="text" />
            <yk-input v-model="user.password" type="text" />
            <yk-button type="primary" @click="signup">注册</yk-button>
        </yk-space>
    </yk-space>
</template>

<script lang="ts" setup>
import { getCurrentInstance } from 'vue';
import { signupApi } from '../api';
import { useRouter } from 'vue-router';  // 使用 useRouter 而不是导入 router 实例


const proxy: any = getCurrentInstance()?.proxy;
const router = useRouter();

// 用户
const user = {
    name: '',
    password: '',
};

const signup = async () => {
    if (user.name && user.password) {
        // 注册逻辑
        let res = await signupApi({
            name: user.name,
            password: user.password,
        });
        if (res.data.isSuccess) {
            proxy.$message({ type:'success', message: '注册成功' });
            router.push('/login');
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