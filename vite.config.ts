import { loadEnv } from 'vite'
import { defineConfig } from 'vitest/config'

export default defineConfig(({ mode }) => {
    return {
        test: {
            include: ['./__tests__/*.ts'],
            env: loadEnv(mode, process.cwd(), ''),
            coverage: {
                provider: 'v8',
                include: ['src/**'],
            },
        },
    }
})
