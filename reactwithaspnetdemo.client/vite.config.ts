import tailwindcss from '@tailwindcss/vite';
import plugin from '@vitejs/plugin-react';
import child_process from 'child_process';
import fs from 'fs';
import { URL, fileURLToPath } from 'node:url';
import path from 'path';
import { env } from 'process';
import { defineConfig } from 'vite';

//配置dotnet HTTPS证书
const baseFolder =
  env.APPDATA !== undefined && env.APPDATA !== ''
    ? `${env.APPDATA}/ASP.NET/https`
    : `${env.HOME}/.aspnet/https`;

const certificateName = 'reactwithaspnetdemo.client';
const certFilePath = path.join(baseFolder, `${certificateName}.pem`);
const keyFilePath = path.join(baseFolder, `${certificateName}.key`);

if (!fs.existsSync(baseFolder)) {
  fs.mkdirSync(baseFolder, { recursive: true });
}

if (!fs.existsSync(certFilePath) || !fs.existsSync(keyFilePath)) {
  if (
    0 !==
    child_process.spawnSync(
      'dotnet',
      [
        'dev-certs',
        'https',
        '--export-path',
        certFilePath,
        '--format',
        'Pem',
        '--no-password',
      ],
      { stdio: 'inherit' },
    ).status
  ) {
    throw new Error('Could not create certificate.');
  }
}

// 配置Vite代理目标
const target = env.ASPNETCORE_HTTPS_PORT
  ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}`
  : env.ASPNETCORE_URLS
    ? env.ASPNETCORE_URLS.split(';')[0]
    : 'https://localhost:7166';

// const target = "http://localhost:5189"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [plugin(), tailwindcss()],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      output: {
        // 第三方库分块打包
        manualChunks: (id) => {
          if (
            id.includes('node_modules/react') ||
            id.includes('node_modules/react-dom')
          ) {
            return 'react-vendor';
          }
          if (id.includes('node_modules/@heroui')) {
            return 'heroui';
          }
          if (
            id.includes('node_modules/swr') ||
            id.includes('node_modules/axios')
          ) {
            return 'data-fetching';
          }
          if (id.includes('node_modules/framer-motion')) {
            return 'framer-motion';
          }
        },
      },
    },
    // 调整警告阈值（可选）
    // chunkSizeWarningLimit: 1000, // 改为1MB
  },
  // 配置代理路径
  server: {
    proxy: {
      '^/api': {
        target,
        secure: false,
      },
    },
    port: parseInt(env.DEV_SERVER_PORT || '12387'),
    https: {
      key: fs.readFileSync(keyFilePath),
      cert: fs.readFileSync(certFilePath),
    },
  },
});
