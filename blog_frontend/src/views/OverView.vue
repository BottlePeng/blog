<template>
    <yk-space dir="vertical" size="m" style="padding-right: 16px;">
        <TopTitle/>
        <Gather/>
        <yk-space dir="horizontal" size="m" style="width: 100%; height: 50%;">
            <Datas/>
            <div class="overview-container" style="background: #fff; width: 30px; height: 30px; width: 50%;">评论</div>
        </yk-space>
    </yk-space>
</template>

<script lang="ts" setup>
import TopTitle from '../components/bar/TopTitle.vue';
import Datas from '../components/overview/Datas.vue';
import Gather from '../components/overview/Gather.vue';
</script>

<style lang="less" scoped>

</style>