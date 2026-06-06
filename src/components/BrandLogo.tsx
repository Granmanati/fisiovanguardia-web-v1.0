"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type BrandLogoProps = {
  className?: string;
  imageClassName?: string;
};

export function BrandLogo({ className = "", imageClassName = "h-9 w-[150px] md:h-12 md:w-[190px]" }: BrandLogoProps) {
  const [available, setAvailable] = useState(false);

  useEffect(() => {
    let cancelled = false;

    fetch("/brand/fisiovanguardia-logo.png", { method: "HEAD" })
      .then((response) => {
        if (!cancelled) setAvailable(response.ok);
      })
      .catch(() => {
        if (!cancelled) setAvailable(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (!available) {
    return (
      <span className={`inline-flex min-h-10 items-center text-xl font-semibold tracking-tight text-text-primary md:min-h-12 md:text-2xl ${className}`}>
        Fisiovanguardia
      </span>
    );
  }

  return (
    <span className={`relative inline-flex items-center overflow-hidden ${imageClassName} ${className}`}>
      <Image
        src="/brand/fisiovanguardia-logo.png"
        alt="Fisiovanguardia"
        fill
        className="object-cover object-center"
        sizes="(min-width: 1024px) 190px, 150px"
        onError={() => setAvailable(false)}
        priority
      />
    </span>
  );
}
