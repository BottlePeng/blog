<template>
    <div class="data-card" style="height: 570px;">
        <yk-space dir="vertical">
            <div class="data-card-title">
                <p class="data-card-title-name">评论 {{ count }}</p>
            </div>
            <reply></reply>
        </yk-space>
    </div>
</template>

<script lang="ts" setup>
import Reply from './Reply.vue';

// import { commentsData } from '../../../mock/data';

const count = 100;

</script>

<style lang="less" scoped>
</style>