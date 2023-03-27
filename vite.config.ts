import { defineConfig } from "vite";
import monkey from "vite-plugin-monkey";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    monkey({
      entry: "src/main.ts",
      userscript: {
        icon: "https://github.com/kazoottt.png",
        namespace: "https://github.com/KazooTTT/mgclub-evolve",
        match: ["https://2550505.com/"],
        author: "KazooTTT",
        description: "展示毛怪俱乐部每个帖子最新的回复时间",
        version: "0.0.1",
      },
    }),
  ],
});
