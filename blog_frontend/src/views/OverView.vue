<template>
    <yk-space dir="vertical" size="m" style="padding-right: 16px;">
        <TopTitle/>
        <Gather/>
        <yk-space dir="horizontal" size="m" style="width: 100%;">
            <Datas/>
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