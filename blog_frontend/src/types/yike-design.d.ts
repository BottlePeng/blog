// src/types/yike-resolver.d.ts
declare module '@yike-design/resolver' {
    import type { ComponentResolver } from 'unplugin-vue-components'

    export interface YikeResolverOptions {
        /**
         * 前缀，默认 'Yk'
         */
        prefix?: string
    }

    export function YikeResolver(options?: YikeResolverOptions): ComponentResolver
}