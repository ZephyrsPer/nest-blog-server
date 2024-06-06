import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'

export default defineConfig({
  plugins: [
    vue(),
    Components({
      // dts: true, // 自动生成 `components.d.ts` 声明文件
      dirs: ['src/components'], // 自动导入src/components目录下的组件
      extensions: ['vue'], // 默认值为 ['vue'], 可根据需要添加其他文件类型
      deep: true, // 允许深度扫描目录
    }),
    AutoImport({
      imports: ['vue'],
      // dts: 'src/auto-imports.d.ts', // 自动生成 `auto-imports.d.ts` 声明文件
    }),
  ],
})
