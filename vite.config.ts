import { defineConfig } from "vite";
import vinext from "vinext";
import { cloudflare } from "@cloudflare/vite-plugin";
import { imagesOptimizer } from "@vinext/cloudflare/images/images-optimizer";
import { createHash } from "node:crypto";
import { patchCssModules } from "vite-css-modules";
import path from "node:path";

export default defineConfig({
  plugins: [
    patchCssModules({ exportMode: "default" }),
    vinext({
      images: { optimizer: imagesOptimizer() },
    }),
    cloudflare(),
  ],

  css: {
    modules: {
      generateScopedName(name: string, filename: string) {
        const relativePath = path.relative(import.meta.dirname, filename.replace(/\?.*$/, "")).replaceAll("\\", "/");
        return `_${name}_${createHash("sha256").update(relativePath).digest("hex").slice(0, 7)}`;
      },
    },
  },

  // Imports of names a module doesn't export, such as TypeScript types imported in .js files,
  // become undefined with a build warning, as they did with webpack, instead of failing the build.
  build: {
    rolldownOptions: {
      shimMissingExports: true,
    },
  },
});