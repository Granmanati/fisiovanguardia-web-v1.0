import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { Activity, CheckCircle2, ClipboardList, Dumbbell, HandHeart, Radar, Route } from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import { JsonLd } from "@/components/JsonLd";
import { clinicalModules, getClinicalModule } from "@/data/clinicalModules";
import { siteConfig } from "@/data/site";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

type PageProps = {
  params: Promise<{ slug: string }>;
};

const tools = [
  { title: "Terapia manual", icon: HandHeart },
  { title: "Ejercicio terapéutico", icon: Dumbbell },
  { title: "Tecnología clínica", icon: Radar },
  { title: "Seguimiento", icon: Route }
];

export function generateStaticParams() {
  return clinicalModules.map((module) => ({ slug: module.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const clinicalModule = getClinicalModule(slug);
  if (!clinicalModule) return {};

  return {
    title: `${clinicalModule.title} | Tratamientos`,
    description: `${clinicalModule.emotionalLine} ${clinicalModule.description}`,
    openGraph: {
      title: `${clinicalModule.title} | Fisiovanguardia`,
      description: clinicalModule.description,
      url: `${siteConfig.url}/tratamientos/${clinicalModule.slug}`,
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title: `${clinicalModule.title} | Fisiovanguardia`,
      description: clinicalModule.description
    }
  };
}

export default async function TreatmentModulePage({ params }: PageProps) {
  const { slug } = await params;
  const clinicalModule = getClinicalModule(slug);
  if (!clinicalModule) notFound();

  const hasAnatomyImage = publicAssetExists(clinicalModule.anatomyImage);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: clinicalModule.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
      }
    }))
  };

  return (
    <>
      <JsonLd data={faqJsonLd} />
      <section className="clinical-gradient lab-noise relative overflow-hidden py-20 md:py-32">
        {hasAnatomyImage ? (
          <Image src={clinicalModule.anatomyImage} alt="" fill priority sizes="100vw" className="object-cover opacity-20" />
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_16%,rgba(110,231,249,0.20),transparent_24rem),radial-gradient(circle_at_82%_52%,rgba(45,124,255,0.24),transparent_30rem)]" aria-hidden="true" />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/88 to-background/45" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50" aria-hidden="true" />

        <div className="container-premium relative grid items-center gap-12 lg:grid-cols-[0.88fr_1.12fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-accent-soft">Tratamiento Fisiovanguardia</p>
            <h1 className="mt-5 max-w-4xl text-balance text-5xl font-semibold tracking-[-0.04em] text-text-primary md:text-7xl">
              {clinicalModule.title}
            </h1>
            <p className="mt-6 max-w-2xl text-xl leading-8 text-text-primary">{clinicalModule.emotionalLine}</p>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-text-secondary">{clinicalModule.hero}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/reserva">Reservar valoración</ButtonLink>
              <ButtonLink href={buildWhatsAppUrl({ reason: clinicalModule.title })} variant="secondary">Hablar por WhatsApp</ButtonLink>
            </div>
          </div>

          <div className="depth-panel relative hidden overflow-hidden rounded-[2.25rem] border border-white/10 p-6 lg:block">
            <div className="absolute inset-0 animated-grid opacity-40" aria-hidden="true" />
            <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-accent/20 blur-3xl" aria-hidden="true" />
            <div className="relative grid gap-4">
              {["señal", "carga", "plan"].map((item, index) => (
                <div key={item} className="rounded-3xl border border-white/10 bg-background/65 p-5 backdrop-blur-xl">
                  <div className="mb-4 h-1.5 rounded-full bg-gradient-to-r from-accent to-accent-soft" style={{ width: `${50 + index * 20}%` }} />
                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-muted">{item}</p>
                  <p className="mt-2 text-2xl font-semibold text-text-primary">{String(index + 1).padStart(2, "0")}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32">
        <div className="container-premium grid gap-6 lg:grid-cols-3">
          <InfoPanel title="Qué suele estar pasando" items={clinicalModule.whatHappens} icon={Activity} />
          <InfoPanel title="Errores comunes" items={clinicalModule.commonMistakes} icon={ClipboardList} />
          <InfoPanel title="Cómo trabajamos" items={clinicalModule.howWeWork} icon={CheckCircle2} featured />
        </div>
      </section>

      <section className="bg-white/[0.025] py-20 md:py-32">
        <div className="container-premium grid gap-12 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-accent-soft">Cuándo reservar valoración</p>
            <h2 className="mt-5 text-3xl font-semibold tracking-tight md:text-5xl">
              Reserva si el dolor ya condiciona cómo te mueves, descansas, trabajas o entrenas.
            </h2>
            <p className="mt-5 text-lg leading-8 text-text-secondary">
              No hace falta esperar a estar peor. Una valoración permite ordenar señales, decidir prioridades y saber qué camino tiene más sentido para ti.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {tools.map((tool) => (
              <div key={tool.title} className="card-premium p-6 transition duration-300 hover:-translate-y-1 hover:border-accent-soft/25 hover:bg-white/[0.07]">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/15 text-accent-soft">
                  <tool.icon size={21} />
                </div>
                <h3 className="text-xl font-semibold">{tool.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32">
        <div className="container-premium grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-accent-soft">Objetivo compartido</p>
            <h2 className="mt-5 text-3xl font-semibold tracking-tight md:text-5xl">Qué buscamos conseguir juntos.</h2>
          </div>
          <div className="grid gap-4">
            {clinicalModule.goals.map((goal) => (
              <div key={goal} className="rounded-3xl border border-white/10 bg-white/[0.045] p-5 text-lg font-semibold text-text-primary shadow-card">
                {goal}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white/[0.025] py-20 md:py-32">
        <div className="container-premium">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-accent-soft">Preguntas frecuentes</p>
            <h2 className="mt-5 text-3xl font-semibold tracking-tight md:text-5xl">Preguntas frecuentes del tratamiento.</h2>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {clinicalModule.faq.map((item) => (
              <article key={item.question} className="card-premium p-6">
                <h3 className="text-lg font-semibold">{item.question}</h3>
                <p className="mt-4 text-sm leading-6 text-text-secondary">{item.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32">
        <div className="container-premium">
          <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-accent/25 via-white/[0.05] to-accent-soft/10 p-8 text-center shadow-glow md:p-14">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-accent-soft">{clinicalModule.title}</p>
            <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-semibold tracking-tight md:text-5xl">
              Empieza con una valoración clara.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-text-secondary">
              Revisaremos tu caso y decidiremos si este tratamiento encaja con lo que necesitas ahora.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <ButtonLink href="/reserva">Reservar valoración</ButtonLink>
              <ButtonLink href={buildWhatsAppUrl({ reason: clinicalModule.title })} variant="secondary">Hablar por WhatsApp</ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function InfoPanel({
  title,
  items,
  icon: Icon,
  featured = false
}: {
  title: string;
  items: string[];
  icon: typeof Activity;
  featured?: boolean;
}) {
  return (
    <article className={`rounded-[2rem] border p-6 shadow-card backdrop-blur-xl ${featured ? "border-accent-soft/25 bg-accent/10" : "border-white/10 bg-white/[0.045]"}`}>
      <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/15 text-accent-soft">
        <Icon size={21} />
      </div>
      <h2 className="text-2xl font-semibold">{title}</h2>
      <ul className="mt-6 grid gap-3">
        {items.map((item) => (
          <li key={item} className="rounded-2xl border border-white/10 bg-background/55 p-4 text-sm leading-6 text-text-secondary">
            {item}
          </li>
        ))}
      </ul>
    </article>
  );
}

function publicAssetExists(assetPath: string) {
  return existsSync(join(process.cwd(), "public", assetPath.replace(/^\//, "")));
}
