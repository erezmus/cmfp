import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import AutoImport from "astro-auto-import";
import { defineConfig, squooshImageService } from "astro/config";
import remarkCollapse from "remark-collapse";
import remarkToc from "remark-toc";
import config from "./src/config/config.json";

import vue from "@astrojs/vue";

// https://astro.build/config
export default defineConfig({
  site: config.site.base_url
    ? config.site.base_url
    : "http://capoeiramovementforpalestine.org",
  base: config.site.base_path ? config.site.base_path : "/",
  trailingSlash: "ignore",
  image: {
    service: squooshImageService(),
  },
  i18n: {
    defaultLocale: "en",
    locales: ["en", "pt-br"],
    redirectToDefaultLocale: true,
    routing: {
      prefixDefaultLocale: true,
    },
  },
  integrations: [
    react(),
    sitemap(),
    tailwind({
      config: {
        applyBaseStyles: false,
      },
    }),
    AutoImport({
      imports: [
        "@/shortcodes/Button",
        "@/shortcodes/Accordion",
        "@/shortcodes/Notice",
        "@/shortcodes/Video",
        "@/shortcodes/Tabs",
        "@/shortcodes/Tab",
      ],
    }),
    mdx(),
    vue(),
  ],
  markdown: {
    remarkPlugins: [
      remarkToc,
      [
        remarkCollapse,
        {
          test: "Table of contents",
        },
      ],
    ],
    shikiConfig: {
      theme: "one-dark-pro",
      wrap: true,
    },
    extendDefaultPlugins: true,
  },
});
