<template>
    <div class="head-bar">
        <yk-space class="head-bar-title" align="center" >
            博客后台管理系统
        </yk-space>
        <yk-space :size="24" align="center">
            <yk-avatar img-url="https://www.huohuo90.com:3003/user/6353b034dd4b583975e77fbe.png" style="cursor: pointer;"></yk-avatar>
            <div>
                <!-- 默认跟随系统颜色，并显示控制主题的“太阳”和“月亮”控件 -->
                <yk-theme />
            </div>
            <yk-button>退出</yk-button>
        </yk-space>
    </div>
</template>

<script lang="ts">

</script>

<style lang="less" scope>
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