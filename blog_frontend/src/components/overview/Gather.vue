<template>
    <yk-space class="gather">
        <div v-for="overLink in gathers" :key="overLink.name" class="gather_list" :style="{ background: 'linear-gradient(' + overLink.bgColor + ')' }">
            <yk-space dir="vertical" size="s">
                <yk-text>{{ overLink.name }}</yk-text>
                <yk-title :level="2" style="margin: 0;">{{ overLink.total }}</yk-title>
            </yk-space>
            <yk-button v-if="overLink.name !== '本地文件'" type="secondary" size="xl" shape="square">
                <IconPlusOutline />
            </yk-button>
        </div>
    </yk-space>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { overviewData } from '../../mock/data';
import { overLinks } from '../../utils/menu';

const gathers = ref(overLinks);

// 获取数据
const drawGatherData = () => {
    let data = overviewData.data;
    gathers.value.forEach(item => {
        switch (item.name) {
            case '本地文件':
                item.total = data.files;
                break;
            case '博客文章':
                item.total = data.atricles;
                break;
            default:
        }
    });
}

// 在组件挂载完成后，获取数据
onMounted(() => {
    drawGatherData();
});
</script>

<style lang="less" scoped>
    .gather {
        width: 100%;
        padding-right: @space-l;
        .gather_list {
            width: 50%;
            height: 100px;
            display: flex;
            justify-content: space-between;
            padding: @space-xl;
            border-radius: @radius-m;
            align-items: center;
        }
    }
</style>