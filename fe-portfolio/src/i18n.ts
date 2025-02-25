import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      welcome: "Welcome to My Portfolio",
      description: "I am a software developer passionate about coding.",
      downloadCV: "Download My CV",
      projectsTitle: "Projects",
      skillsTitle: "Skills",
      hobbiesTitle: "Hobbies",
      footerText: "All rights reserved.",
    },
  },
  fr: {
    translation: {
      welcome: "Bienvenue sur mon Portfolio",
      description: "Je suis un développeur passionné par le codage.",
      downloadCV: "Télécharger mon CV",
      projectsTitle: "Projets",
      skillsTitle: "Compétences",
      hobbiesTitle: "Loisirs",
      footerText: "Tous droits réservés.",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
