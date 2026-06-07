"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import type { BlogPost } from "@/data/blog";

export function BlogCard({ post, featured = false, basePath = "/blog" }: { post: BlogPost; featured?: boolean; basePath?: string }) {
  const [imageAvailable, setImageAvailable] = useState(true);

  return (
    <article className={`group overflow-hidden rounded-[1.6rem] border border-white/10 bg-white/[0.045] shadow-card transition duration-300 hover:-translate-y-1 hover:border-accent-soft/25 hover:bg-white/[0.065] ${featured ? "md:col-span-2 lg:col-span-1" : ""}`}>
      <Link href={`${basePath}/${post.slug}`} className="block h-full">
        <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-accent/25 via-background to-accent-soft/10">
          {imageAvailable ? (
            <Image
              src={post.thumbnail}
              alt={`Miniatura de ${post.title}`}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
              className="object-cover transition duration-500 group-hover:scale-105"
              onError={() => setImageAvailable(false)}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(circle_at_24%_18%,rgba(110,231,249,0.28),transparent_14rem),linear-gradient(135deg,rgba(45,124,255,0.36),rgba(5,8,13,0.92))]">
              <span className="px-6 text-center text-sm font-semibold uppercase tracking-[0.18em] text-accent-soft">{post.category}</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/35 to-transparent" aria-hidden="true" />
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3 text-xs font-semibold text-text-primary">
            <span className="rounded-full border border-white/15 bg-background/65 px-3 py-1.5 text-accent-soft backdrop-blur-xl">{post.category}</span>
            <span className="rounded-full border border-white/15 bg-background/65 px-3 py-1.5 backdrop-blur-xl">{post.readingTime}</span>
          </div>
        </div>

        <div className="flex min-h-[17rem] flex-col p-6">
          <h2 className="text-2xl font-semibold tracking-tight text-text-primary">{post.title}</h2>
          <p className="mt-4 line-clamp-3 text-sm leading-6 text-text-secondary">{post.excerpt}</p>
          <div className="mt-auto pt-7">
            <p className="inline-flex items-center gap-2 text-sm font-semibold text-accent-soft transition group-hover:text-text-primary">
              Leer artículo
              <ArrowUpRight size={15} />
            </p>
          </div>
        </div>
      </Link>
    </article>
  );
}
