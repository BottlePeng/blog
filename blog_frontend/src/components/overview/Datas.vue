<template>
    <yk-space dir="vertical" size="m" style="width: 100%;">
        <div class="data-card">
            <div class="data-card-title">
                <p class="data-card-title-name">访问量</p>
                <yk-radio-group v-model="radio" type="button" :solid="true" size="m">
                    <yk-radio value="week">近一周</yk-radio>
                    <yk-radio value="month">近一月</yk-radio>
                </yk-radio-group>
            </div>
            <!-- todo: 访问量曲线图表 -->
        </div>
        <div class="data-card">
            <div class="data-card-title">
                <p class="data-card-title-name">数据监测</p>
                <yk-radio-group v-model="data" type="button" :solid="true" size="m">
                    <yk-radio value="week">近一周</yk-radio>
                    <yk-radio value="month">近一月</yk-radio>
                </yk-radio-group>
            </div>
            <!-- todo: 数据监测饼状图表 -->
        </div>
    </yk-space>
</template>

<script lang="ts" setup>
    import { ref } from 'vue'

    const radio = ref('week')
    const data = ref('week')
</script>

<style lang="less" scoped>
</style>