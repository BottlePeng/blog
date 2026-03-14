<template>
    <yk-title :level="3">{{ title }}</yk-title>
</template>

<script lang="ts" setup>
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { navLinks } from '../../utils/menu';

const route = useRoute()
let title: string = '';

// 监听路由变化，更新标题
watch(
    () => route.path,
    () => {
        navLinks.forEach(link => {
            if (link.path === route.path) {
                title = link.name;
            }
        });
    },
    { immediate: true }  // 立即执行一次，获取初始值
)
</script>

<style lang="less" scoped>

</style>