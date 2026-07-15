import type { Metadata } from "next";
import SectionHeading from "@/components/brand/SectionHeading";
import PolicyBody from "@/components/sections/PolicyBody";
import { buildMetadata } from "@/lib/seo/metadata";
import { SITE } from "@/lib/config";
import {
  PRIVACY_INTRO,
  PRIVACY_SECTIONS,
  PRIVACY_SUMMARY,
  PRIVACY_UPDATED,
} from "@/lib/data";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description: `How ${SITE.name} collects, uses, and protects your information.`,
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <section className="section">
      <div className="container container-narrow policy">
        <SectionHeading
          as="h1"
          eyebrow="Legal"
          title="Privacy Policy"
          subtitle={`Last updated ${PRIVACY_UPDATED}`}
        />

        <div className="mt-6">
          <PolicyBody blocks={PRIVACY_INTRO} />
        </div>

        <h2 className="policy__h2">Summary of key points</h2>
        <PolicyBody blocks={PRIVACY_SUMMARY} />

        <h2 className="policy__h2 anchor-target" id="toc">
          Table of contents
        </h2>
        <ol className="policy__toc">
          {PRIVACY_SECTIONS.map((s) => (
            <li key={s.id}>
              <a href={`#${s.id}`}>
                {s.n}. {s.title}
              </a>
            </li>
          ))}
        </ol>

        {PRIVACY_SECTIONS.map((s) => (
          <section className="policy__section anchor-target" id={s.id} key={s.id}>
            <h2 className="policy__h2">
              {s.n}. {s.title}
            </h2>
            <PolicyBody blocks={s.blocks} />
          </section>
        ))}
      </div>
    </section>
  );
}
