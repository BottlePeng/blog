<template>
    <div class="index-view">
        <MenuBar />
        <router-view />
    </div>
</template>

<script lang="ts">
import MenuBar from '../components/bar/MenuBar.vue';
</script>

<style lang="less" scoped>
    .index-view {
        padding-left: 200px;
    }
</style>