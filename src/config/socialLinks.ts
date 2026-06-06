export type SocialPlatform = "youtube" | "instagram" | "tiktok" | "x" | "facebook";

export type SocialLink = {
  platform: SocialPlatform;
  label: string;
  url: string;
  thumbnail: string;
  description: string;
  cta: string;
};

export const socialLinks: SocialLink[] = [
  {
    platform: "youtube",
    label: "YouTube",
    url: "https://youtube.com/@fisiovanguardia",
    thumbnail: "/social/youtube.jpg",
    description: "Anatomía de la lesión, dolor explicado y criterio clínico en formato largo.",
    cta: "Ver canal"
  },
  {
    platform: "instagram",
    label: "Instagram",
    url: "https://www.instagram.com/fisiovanguardia/",
    thumbnail: "/social/instagram.jpg",
    description: "Ejercicio terapéutico, casos, movimiento y criterio clínico para el día a día.",
    cta: "Seguir en Instagram"
  },
  {
    platform: "tiktok",
    label: "TikTok",
    url: "https://tiktok.com/@fisiovanguardia",
    thumbnail: "/social/tiktok.jpg",
    description: "Mitos, verdades y educación rápida sobre dolor, lesiones y movimiento.",
    cta: "Ver vídeos"
  },
  {
    platform: "x",
    label: "X",
    url: "https://x.com/fisiovanguardia",
    thumbnail: "/social/x.jpg",
    description: "Reflexiones clínicas, innovación, salud digital y fisioterapia con criterio.",
    cta: "Seguir en X"
  },
  {
    platform: "facebook",
    label: "Facebook",
    url: "https://facebook.com/fisiovanguardia",
    thumbnail: "/social/facebook.jpg",
    description: "Comunidad, novedades y recursos para seguir aprendiendo con nosotros.",
    cta: "Ver Facebook"
  }
];
