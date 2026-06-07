import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/ButtonLink";
import { JsonLd } from "@/components/JsonLd";
import { articleSchema, breadcrumbSchema } from "@/lib/seo";
import { getPublishedBlogPostBySlug, getPublishedBlogPosts } from "@/lib/publicBlog";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 60;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedBlogPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article"
    }
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPublishedBlogPostBySlug(slug);
  if (!post) notFound();

  return (
    <>
      <JsonLd
        data={[
          articleSchema(post),
          breadcrumbSchema([
            { name: "Inicio", url: "https://fisiovanguardia.com" },
            { name: "Artículos", url: "https://fisiovanguardia.com/articulos" },
            { name: post.title, url: `https://fisiovanguardia.com/articulos/${post.slug}` }
          ])
        ]}
      />
      <article className="py-20 md:py-32">
        <div className="container-premium max-w-4xl">
          <div className="text-sm text-muted">
            <span className="rounded-full border border-white/10 px-3 py-1 text-accent-soft">{post.category}</span>
            <span className="ml-3">{post.readingTime}</span>
          </div>
          <h1 className="mt-8 text-balance text-4xl font-semibold tracking-tight md:text-6xl">{post.title}</h1>
          <p className="mt-6 text-xl leading-8 text-text-secondary">{post.excerpt}</p>
          <div className="mt-10 border-y border-white/10 py-5 text-sm text-muted">
            {post.author} · {new Date(post.date).toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" })}
          </div>
          <div className="prose prose-invert mt-10 max-w-none prose-p:text-lg prose-p:leading-8 prose-p:text-text-secondary">
            {post.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
          <div className="card-premium mt-12 p-6">
            <h2 className="text-2xl font-semibold">¿Quieres una valoración con criterio?</h2>
            <p className="mt-3 text-text-secondary">Solicita una visita a domicilio y revisaremos tu caso antes de proponerte el siguiente paso.</p>
            <ButtonLink href="/reserva" className="mt-6">Reservar visita</ButtonLink>
          </div>
        </div>
      </article>
    </>
  );
}

export async function generateStaticParams() {
  const posts = await getPublishedBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}
