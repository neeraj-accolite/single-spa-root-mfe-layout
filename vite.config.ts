/// <reference types="vitest" />
/// <reference types="vite/client" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteStaticCopy } from "vite-plugin-static-copy";

// https://vitejs.dev/config/
export default defineConfig(async ({ mode }) => {
  return {

    plugins: [
      react(),
      viteStaticCopy({
        targets: [
          {
            src: `./import-maps/local.import-map.json`,
            dest: "",
            rename: "import-map.json",
            transform: (content) => {
              const importMapJson = JSON.stringify(
                JSON.parse(content.toString()),
                null,
                2
              );
              return importMapJson;
            },
          },
        ],
      }),
      viteStaticCopy({
        targets: [
          {
            src: `./index.html`,
            dest: "",
          },
        ],
      }),
    ],
    server: {
      port: 9001,
      watch: {
        usePolling: true
      }
    },
    test: {
      globals: true,
      environment: "jsdom",
    },
    build: {
      target: "es2022",
      rollupOptions: {
        input: ["./src/acc-root-config.ts"],
        preserveEntrySignatures: "strict",
        output: {
          format: "esm",
          exports: "auto",
          entryFileNames: "[name].js",
        },
      },
    },
  };
});