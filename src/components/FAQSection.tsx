import { faqItems } from "@/data/site";
import { SectionHeading } from "@/components/SectionHeading";

export function FAQSection() {
  return (
    <section className="py-20 md:py-32">
      <div className="container-premium">
        <SectionHeading
          eyebrow="Preguntas frecuentes"
          title="Respuestas claras antes de reservar."
          copy="Información directa para decidir si la fisioterapia a domicilio encaja contigo."
        />
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {faqItems.map((item) => (
            <article key={item.question} className="card-premium p-6">
              <h3 className="text-lg font-semibold">{item.question}</h3>
              <p className="mt-4 text-sm leading-6 text-text-secondary">{item.answer}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
