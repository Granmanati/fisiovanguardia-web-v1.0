"use client";

import Image from "next/image";
import { ArrowUpRight, Facebook, Instagram, Music2, Twitter, Youtube } from "lucide-react";
import { useState } from "react";
import { socialLinks, type SocialLink, type SocialPlatform } from "@/config/socialLinks";

const socialIcons: Record<SocialPlatform, typeof Youtube> = {
  youtube: Youtube,
  instagram: Instagram,
  tiktok: Music2,
  x: Twitter,
  facebook: Facebook
};

export function SocialCards() {
  return (
    <div className="-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-3 md:mx-0 md:grid md:gap-4 md:overflow-visible md:px-0 md:pb-0 md:grid-cols-2 lg:grid-cols-5">
      {socialLinks.map((card) => (
        <SocialCard key={card.platform} card={card} />
      ))}
    </div>
  );
}

function SocialCard({ card }: { card: SocialLink }) {
  const [imageAvailable, setImageAvailable] = useState(true);
  const Icon = socialIcons[card.platform];

  return (
    <a
      href={card.url}
      target="_blank"
      rel="noreferrer"
      className="focus-ring group min-w-[82%] max-w-[320px] snap-start overflow-hidden rounded-[1.6rem] border border-white/10 bg-white/[0.04] shadow-card transition duration-300 hover:-translate-y-2 hover:border-accent-soft/35 hover:bg-white/[0.07] hover:shadow-glow md:min-w-0 md:max-w-none"
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-gradient-to-br from-accent/25 via-background to-accent-soft/10 md:aspect-[4/3]">
        {imageAvailable ? (
          <Image
            src={card.thumbnail}
            alt={`Miniatura de ${card.label}`}
            fill
            sizes="(min-width: 1024px) 20vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover transition duration-500 group-hover:scale-105"
            onError={() => setImageAvailable(false)}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(circle_at_24%_18%,rgba(110,231,249,0.28),transparent_14rem),linear-gradient(135deg,rgba(45,124,255,0.42),rgba(5,8,13,0.92))]">
            <span className="text-lg font-semibold tracking-tight text-text-primary">{card.label}</span>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/35 to-transparent" aria-hidden="true" />
        <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-background/65 px-3 py-1.5 text-xs font-semibold text-text-primary backdrop-blur-xl">
          <Icon size={14} className="text-accent-soft" />
          {card.label}
        </div>
        <div className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-accent-soft shadow-glow backdrop-blur-xl transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
          <ArrowUpRight size={18} />
        </div>
      </div>

      <div className="p-4 md:p-5">
        <h3 className="text-lg font-semibold leading-7 text-text-primary">{card.label}</h3>
        <p className="mt-3 line-clamp-2 text-sm leading-6 text-text-secondary md:min-h-20 md:line-clamp-none">{card.description}</p>
        <p className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-accent-soft transition group-hover:text-text-primary">
          {card.cta}
          <ArrowUpRight size={15} />
        </p>
      </div>
    </a>
  );
}
