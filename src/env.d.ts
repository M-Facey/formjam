/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_POCKET_BASE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
  