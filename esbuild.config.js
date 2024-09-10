const esbuild = require('esbuild');

esbuild.build({
  entryPoints: ['./index.ts'],    // 엔트리 파일 설정
  bundle: true,                       // 번들링 활성화
  platform: 'node',                   // Node.js 환경으로 설정
  target: ['node16'],                 // Node.js 16 버전을 타겟으로 설정
  format: 'esm',                      // ESM(ES Module) 형식으로 번들링
  splitting: true,                    // 코드 스플리팅 활성화
  outdir: 'dist',                     // 출력 폴더
  sourcemap: true,                    // 소스맵 생성
  logLevel: 'info',
}).catch(() => process.exit(1));