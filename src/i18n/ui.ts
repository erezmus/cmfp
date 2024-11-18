export const languages = {
  en: "En",
  "pt-br": "Pt",
};

export const defaultLang = "en";

export const ui: Record<keyof typeof languages, Record<string, string>> = {
  en: {
    "menu.home": "Home",
    "menu.about": "About",
    "menu.schools": "Schools",
    "menu.resources": "Resources",
    "menu.teacher_guide": "Teacher Guide",
    "menu.faq": "FAQ",
    "logo.tagline": "Capoeira movement for Palestine",
    "header.add_school": "Add your school"
  },
  "pt-br": {
    "menu.home": "Início",
    "menu.about": "Sobre",
    "menu.schools": "Escolas",
    "menu.resources": "Recursos",
    "menu.teacher_guide": "Guia pra Professor",
    "menu.faq": "Perguntas frequentes",
    "logo.tagline": "Movimento de Capoeira pela Palestina",
    "header.add_school": "Adicione sua escola"
  },
} as const;
