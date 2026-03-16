<template>
    <yk-space size="m" class="reply">
        <yk-avatar img-url="https://www.huohuo90.com:3003/user/6353b034dd4b583975e77fbe.png"></yk-avatar>
        <yk-space dir="vertical" size="s" class="reply-main">
            <div class="reply-name">
                <yk-text strong>用户名</yk-text>
                <yk-text type="third">2021-08-12 12:00:00</yk-text>
            </div>
            <yk-text type="secondary">评论内容</yk-text>
        </yk-space>
    </yk-space>
</template>

<script lang="ts" setup>

</script>

<style lang="less" scoped>
    .reply {
        .reply-main {
            border-bottom: 1px solid @line-color-s;
            width: 100%;
        }
        .reply-name {
            display: flex;
            flex-direction: column;
        }
    }
</style>