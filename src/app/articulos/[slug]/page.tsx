import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArticleMarkdown, extractArticleHeadings } from "@/components/ArticleMarkdown";
import { ArticleReadingProgress } from "@/components/ArticleReadingProgress";
import { BlogCard } from "@/components/BlogCard";
import { ButtonLink } from "@/components/ButtonLink";
import { JsonLd } from "@/components/JsonLd";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
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
  const content = post.content ?? post.body.join("\n\n");
  const posts = await getPublishedBlogPosts();
  const relatedPosts = posts
    .filter((item) => item.slug !== post.slug && item.category === post.category)
    .slice(0, 3);
  const headings = extractArticleHeadings(content);

  console.info("[Public Article] Rendering slug:", slug);
  console.info("[Public Article] Raw content length:", content.length);
  console.info("[Public Article] Markdown headings detected:", headings.map((heading) => heading.text));

  return (
    <>
      <ArticleReadingProgress />
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
      <article className="relative overflow-hidden py-16 md:py-24">
        <div className="absolute inset-x-0 top-0 h-[34rem] bg-[radial-gradient(circle_at_24%_12%,rgba(45,124,255,0.22),transparent_28rem),radial-gradient(circle_at_84%_18%,rgba(110,231,249,0.14),transparent_24rem)]" aria-hidden="true" />

        <header className="container-premium relative">
          <div className="grid items-end gap-10 lg:grid-cols-[minmax(0,0.72fr)_minmax(320px,0.28fr)]">
            <div className="max-w-4xl">
              <div className="flex flex-wrap items-center gap-3 text-sm font-semibold text-muted">
                <span className="rounded-full border border-accent-soft/25 bg-accent/10 px-3 py-1.5 text-accent-soft">{post.category}</span>
                <span>{post.readingTime}</span>
              </div>
              <h1 className="mt-8 text-balance text-4xl font-semibold leading-[1.02] tracking-tight text-text-primary md:text-6xl">
                {post.title}
              </h1>
              <p className="mt-6 max-w-3xl text-xl leading-9 text-text-secondary">{post.excerpt}</p>
              <div className="mt-10 flex flex-wrap items-center gap-3 border-y border-white/10 py-5 text-sm text-muted">
                <span className="font-semibold text-text-primary">{post.author}</span>
                <span aria-hidden="true">·</span>
                <time dateTime={post.date}>{new Date(post.date).toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" })}</time>
              </div>
            </div>

            <div className="hidden rounded-[2rem] border border-white/10 bg-white/[0.045] p-5 shadow-card backdrop-blur-xl lg:block">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-soft">Lectura clínica</p>
              <p className="mt-4 text-sm leading-6 text-text-secondary">
                Un artículo para leer con calma, separar ruido de criterio y decidir el siguiente paso con más contexto.
              </p>
            </div>
          </div>

          {post.thumbnail ? (
            <div className="relative mt-12 aspect-[16/8.5] overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] shadow-[0_28px_110px_rgba(45,124,255,0.18)]">
              <Image src={post.thumbnail} alt={`Imagen destacada de ${post.title}`} fill priority sizes="(min-width: 1280px) 1180px, 100vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-background/10 to-transparent" aria-hidden="true" />
            </div>
          ) : null}
        </header>

        <div className="container-premium relative mt-14 grid gap-12 lg:grid-cols-[minmax(0,1fr)_280px]">
          <div className="mx-auto w-full max-w-3xl">
            <div className="article-body">
              <ArticleMarkdown content={content} />
            </div>

            <div className="mt-16 rounded-[2rem] border border-accent-soft/20 bg-[radial-gradient(circle_at_18%_0%,rgba(110,231,249,0.16),transparent_18rem),linear-gradient(135deg,rgba(45,124,255,0.16),rgba(255,255,255,0.045))] p-6 shadow-card backdrop-blur-xl md:p-8">
              <h2 className="text-2xl font-semibold tracking-tight text-text-primary md:text-3xl">¿Quieres entender qué está manteniendo tu dolor?</h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-text-secondary md:text-lg md:leading-8">
                En Fisiovanguardia no perseguimos síntomas. Analizamos tu caso, tu movimiento y tu contexto para proponerte el mejor siguiente paso.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/reserva">Reservar valoración</ButtonLink>
                <ButtonLink href={buildWhatsAppUrl({ reason: post.title })} variant="secondary">Hablar por WhatsApp</ButtonLink>
              </div>
            </div>
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-28 rounded-[1.75rem] border border-white/10 bg-white/[0.045] p-5 shadow-card backdrop-blur-xl">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-soft">Índice</p>
              {headings.length ? (
                <nav className="mt-5 grid gap-3 text-sm leading-6">
                  {headings.map((heading) => (
                    <a key={heading.id} href={`#${heading.id}`} className={`text-text-secondary transition hover:text-accent-soft ${heading.depth === 3 ? "pl-4 text-xs" : "font-semibold"}`}>
                      {heading.text}
                    </a>
                  ))}
                </nav>
              ) : (
                <p className="mt-4 text-sm leading-6 text-muted">Lectura continua sin secciones internas.</p>
              )}
            </div>
          </aside>
        </div>

        {relatedPosts.length ? (
          <div className="container-premium relative mt-20">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent-soft">Seguir leyendo</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-text-primary">Artículos relacionados</h2>
            </div>
            <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((relatedPost) => (
                <BlogCard key={relatedPost.slug} post={relatedPost} basePath="/articulos" />
              ))}
            </div>
          </div>
        ) : null}
      </article>
    </>
  );
}

export async function generateStaticParams() {
  const posts = await getPublishedBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}
