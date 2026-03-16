<template>
    <div class="index-view">
        <HeadBar />
        <MenuBar />
        <router-view />
    </div>
</template>
<script lang="ts">
import HeadBar from '../components/bar/HeadBar.vue';
import MenuBar from '../components/bar/MenuBar.vue';
</script>

<style lang="less" scoped>
    .index-view {
        padding-left: 200px;
    }
</style>