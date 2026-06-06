import type { Metadata } from "next";
import { BlogCard } from "@/components/BlogCard";
import { SectionHeading } from "@/components/SectionHeading";
import { blogPosts } from "@/data/blog";

export const metadata: Metadata = {
  title: "Diario Fisiovanguardia",
  description: "Criterio clínico sobre dolor, lesiones, movimiento y tecnología aplicada."
};

export default function BlogPage() {
  return (
    <section className="py-20 md:py-32">
      <div className="container-premium">
        <SectionHeading
          eyebrow="Diario Fisiovanguardia"
          title="Criterio clínico sobre dolor, lesiones, movimiento y tecnología aplicada."
          copy="Artículos pensados para ayudarte a entender mejor tu cuerpo antes de improvisar otra solución."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post, index) => <BlogCard key={post.slug} post={post} featured={index === 0} />)}
        </div>
      </div>
    </section>
  );
}
