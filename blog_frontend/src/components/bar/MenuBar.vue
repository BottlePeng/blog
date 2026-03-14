<template>
    <yk-space dir="vertical" class="menu-bar" size="m">
        <RouterLink :to="item.path" v-for="item in navLinks" :key="item.path" class="menu-bar_nav">
            <yk-space style="cursor: pointer;" align="center" size="m">
                <component :is="item.icon" />
                <yk-text>{{ item.name }}</yk-text>
            </yk-space>
        </RouterLink>
    </yk-space>
</template>

<script lang="ts" setup>
    import { navLinks } from '../../utils/menu';
</script>

<style lang="less" scoped>
    .menu-bar {
        padding: @space-l;
        position: fixed;
        top: 72px;
        left: 8px;
        
        .menu-bar_nav {
            user-select: none;
            width: 160px;
            height: 40px;
            border-radius: @radius-m;
            display: flex;
            align-items: center;
            padding: 0 @space-m;
            text-decoration: none;
            
            .yk-icon {
                color: @font-color-ss;
                width: 16px;
                height: 16px;
            }
            
            /* 只有非激活状态才有悬停效果 */
            &:not(.router-link-active):hover {
                background: @bg-color-l;
                .yk-text {
                    font-weight: 600;
                }
            }
        }
        
        /* 激活状态样式（优先级更高） */
        .router-link-active {
            background: linear-gradient(180deg, #2b5aedde 0%, #2B5aed 100%);
            
            .yk-icon {
                color: @font-color-l;
            }
            
            .yk-text {
                color: @font-color-l;
                font-weight: 600;
            }
            
            /* 激活状态下悬停不改变样式 */
            &:hover {
                background: linear-gradient(180deg, #2b5aedde 0%, #2B5aed 100%);
                /* 保持激活样式不变 */
            }
        }
    }
</style>