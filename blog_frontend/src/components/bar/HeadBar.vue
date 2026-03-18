<template>
    <div class="head-bar">
        <yk-space class="head-bar-title" align="center" @click="backHome">
            博客后台管理系统
        </yk-space>
        <yk-space :size="24" align="center">
            <yk-avatar img-url="https://www.huohuo90.com:3003/user/6353b034dd4b583975e77fbe.png" style="cursor: pointer;"></yk-avatar>
            <div>
                <!-- 默认跟随系统颜色，并显示控制主题的“太阳”和“月亮”控件 -->
                <yk-theme />
            </div>
            <yk-button @click="backLogin">退出</yk-button>
        </yk-space>
    </div>
</template>

<script lang="ts" setup>
// import { onMounted } from 'vue';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { overviewApi } from '../../api';
import { mainData } from '../../main';
    const router = useRouter();

    // 返回总览
    const backHome = () => {
        router.push('/');
        localStorage.removeItem('token');
    }

    // 退出登录
    const backLogin = () => {
        localStorage.removeItem('token');
        router.push('/login');
    }

    onMounted(async () => {
        if (localStorage.getItem('token')) {
            let res = await overviewApi({ token: localStorage.getItem('token') })
            if (res.code === 200) {
                mainData.value = res.data;
            }
        }
    });
</script>

<style lang="less" scoped>
.head-bar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 64px;
    background-color: @bg-color-l;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 @space-xl;

    .head-bar-title {
        font-size: 16px;
        font-weight: bold;
        color: @font-color-l;
        cursor: pointer;
    }
}
</style>