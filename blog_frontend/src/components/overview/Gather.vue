<template>
    <yk-space class="gather" size="m">
        <div v-for="overLink in gathers" :key="overLink.name" class="gather_list" :style="{ background: 'linear-gradient(' + overLink.bgColor + ')' }">
            <yk-space dir="vertical" size="s">
                <yk-text class="gather_list_name">{{ overLink.name }}</yk-text>
                <yk-title :level="2" style="margin: 0;">{{ overLink.total }}</yk-title>
            </yk-space>
            <yk-button v-if="overLink.name !== '本地文件'" type="secondary" size="xl" shape="square" @click="reset">
                <IconPlusOutline />
            </yk-button>
        </div>
    </yk-space>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { overLinks } from '../../utils/menu';
import { mainData } from '../../main';
import { overviewApi } from '../../api';

const gathers = ref(overLinks);

// 获取数据
const drawGatherData = () => {
    gathers.value.forEach(item => {
        switch (item.name) {
            case '本地文件':
                item.total = mainData.value.files;
                break;
            case '博客文章':
                item.total = mainData.value.atricles;
                break;
            default:
        }
    });
}

const reset = async () => {
    if (localStorage.getItem('token')) {
        let res = await overviewApi({ token: localStorage.getItem('token') })
        if (res.code === 200) {
            mainData.value = res.data;
        }
    }
    drawGatherData();
}

// 在组件挂载完成后，获取数据
onMounted(() => {
    drawGatherData();
});
</script>

<style lang="less" scoped>
    .gather {
        width: 100%;
        .gather_list {
            width: 50%;
            height: 100px;
            display: flex;
            justify-content: space-between;
            padding: @space-l;
            border-radius: @radius-m;
            align-items: center;

            .gather_list_name {
                font-size: @size-s;
                font-weight: 600;
                color: @font-color-l;
            }
        }
    }
</style>