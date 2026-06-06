import { BlogCard } from "@/components/BlogCard";
import { ButtonLink } from "@/components/ButtonLink";
import { ClinicalTeamSection } from "@/components/ClinicalTeamSection";
import { ClinicalModulesGrid } from "@/components/ClinicalModulesGrid";
import { ComparisonSection } from "@/components/ComparisonSection";
import { CTASection } from "@/components/CTASection";
import { Hero } from "@/components/Hero";
import { InteractivePainMap } from "@/components/InteractivePainMap";
import { PatientJourney } from "@/components/PatientJourney";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { SocialCards } from "@/components/SocialCards";
import { TrustBar } from "@/components/TrustBar";
import { blogPosts } from "@/data/blog";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />

      <section className="lab-noise relative py-20 md:py-32">
        <div className="container-premium relative">
          <Reveal>
            <div className="grid items-end gap-8 lg:grid-cols-[1fr_0.8fr]">
              <SectionHeading
                eyebrow="Inteligencia de movimiento"
                title="No miramos solo donde duele. Leemos el sistema."
                copy="Dolor, carga, movimiento y contexto en una misma decisión clínica."
              />
              <div className="grid grid-cols-3 gap-3">
                {["Señal", "Capacidad", "Progreso"].map((item) => (
                  <div key={item} className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
                    <p className="text-3xl font-semibold text-accent-soft">0{item.length % 3 + 1}</p>
                    <p className="mt-3 text-sm font-semibold uppercase tracking-[0.16em] text-text-secondary">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-white/[0.025] py-20 md:py-32">
        <div className="container-premium">
          <Reveal>
            <SectionHeading
              eyebrow="Mapa interactivo de dolor"
              title="¿Dónde te limita tu cuerpo hoy?"
              copy="Selecciona una zona y descubre cómo cambia el enfoque cuando dejamos de tratar síntomas aislados."
            />
          </Reveal>
          <Reveal className="mt-12" delay={120}>
            <InteractivePainMap />
          </Reveal>
        </div>
      </section>

      <section className="py-20 md:py-32">
        <div className="container-premium grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal>
            <SectionHeading
              eyebrow="Comparativa"
              title="De sesión suelta a sistema de recuperación."
              copy="Menos improvisación. Más lectura clínica, progresión y seguimiento."
            />
            <ButtonLink href="/reserva" className="mt-8">Entrar al sistema</ButtonLink>
          </Reveal>
          <Reveal delay={140}>
            <ComparisonSection />
          </Reveal>
        </div>
      </section>

      <section className="bg-white/[0.025] py-20 md:py-32">
        <div className="container-premium">
          <PatientJourney />
        </div>
      </section>

      <section className="py-20 md:py-32">
        <div className="container-premium">
          <Reveal>
            <SectionHeading
              eyebrow="Tratamientos Fisiovanguardia"
              title="Tratamientos para dolor, lesiones y movimiento."
              copy="Cada tratamiento es una ruta de trabajo: entendemos la señal, regulamos la carga y construimos un plan para que vuelvas a moverte con confianza."
            />
          </Reveal>
          <Reveal className="mt-12" delay={120}>
            <ClinicalModulesGrid />
          </Reveal>
        </div>
      </section>

      <ClinicalTeamSection />

      <section className="bg-white/[0.025] py-20 md:py-32">
        <div className="container-premium">
          <Reveal>
            <SectionHeading eyebrow="Aprende con nosotros" title="Contenido clínico con formato social." />
          </Reveal>
          <Reveal className="mt-12" delay={120}>
            <SocialCards />
          </Reveal>
        </div>
      </section>

      <section className="py-20 md:py-32">
        <div className="container-premium">
          <Reveal>
            <SectionHeading
              eyebrow="Diario clínico"
              title="Lecturas destacadas para entender mejor tu cuerpo."
              copy="Tres artículos para tomar mejores decisiones antes de improvisar otra solución."
            />
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.slice(0, 3).map((post, index) => (
              <Reveal key={post.slug} delay={index * 80}>
                <BlogCard post={post} featured={index === 0} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
