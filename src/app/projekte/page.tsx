import { TrackedCta } from "@/components/analytics/tracked-cta";
import { PageHero } from "@/components/sections/page-hero";
import { SectionFrame } from "@/components/sections/section-frame";
import { projects } from "@/lib/site-config";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Projekte & Beispiele",
  description:
    "Typische Projektkontexte von Elektro Kunath: Sanierung, Licht, PV-Einbindung und Smart-Home-Nachrüstung.",
  path: "/projekte",
});

export default function ProjektePage() {
  return (
    <>
      <PageHero
        kicker="Projekte"
        title="Referenznahe Beispiele aus dem Arbeitsalltag"
        description="Aus Datenschutzgründen anonymisiert. Fokus: Problemstellung, Vorgehen und Ergebnis."
      >
        <TrackedCta
          href="/kontakt"
          className="rounded-full"
          eventName="cta_projects_project_request"
          eventProps={{ area: "projects_hero" }}
        >
          Ähnliches Projekt anfragen
        </TrackedCta>
      </PageHero>

      <SectionFrame title="Projektbeispiele">
        <div className="grid gap-4 md:grid-cols-2">
          {projects.map((project) => (
            <article key={project.title} className="rounded-2xl border border-border bg-card p-6">
              <h2 className="font-heading text-xl">{project.title}</h2>
              <p className="mt-2 text-sm text-foreground/70">{project.context}</p>
              <p className="mt-4 text-sm text-foreground/82">
                <strong>Ausgangslage:</strong> {project.challenge}
              </p>
              <p className="mt-2 text-sm text-foreground/82">
                <strong>Umsetzung:</strong> {project.implementation}
              </p>
              <p className="mt-2 text-sm text-foreground/82">
                <strong>Ergebnis:</strong> {project.result}
              </p>
              <p className="mt-3 text-xs text-foreground/68">{project.proof}</p>
            </article>
          ))}
        </div>
      </SectionFrame>
    </>
  );
}
