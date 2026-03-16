import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
    plugins: [
        dts()
    ],
    build: {
        lib: {
            entry: 'src/index.js',
            name: 'my-id',
            fileName: (format) => {
                if (format === 'es') return 'my-id.esm.js'
                return `my-id.${format}.js`;
            },
            formats: ['es']
        },
        rollupOptions: {
            output: {
                exports: 'named'
            }
        }
    }
})
