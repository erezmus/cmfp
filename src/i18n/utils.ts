import { ui, defaultLang } from "./ui";

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split("/");
  if (lang in ui) return lang as keyof typeof ui;
  return defaultLang;
}

export function getSwitchLangUrl(language: string, url: URL) {
  const [_, lang] = url.pathname.split("/");
  return url.pathname.replace(lang, language);
}
