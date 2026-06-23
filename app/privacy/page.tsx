import type { Metadata } from "next";
import SectionHeading from "@/components/brand/SectionHeading";
import { buildMetadata } from "@/lib/seo/metadata";
import { SITE } from "@/lib/config";

export const metadata: Metadata = buildMetadata({
  title: "Privacy",
  description: `How ${SITE.name} collects, uses, and protects your information.`,
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <section className="section">
      <div className="container container-narrow">
        <SectionHeading
          as="h1"
          eyebrow="Privacy"
          title="Your privacy at the symphony"
          subtitle="A plain-language summary of how we handle your information. This is a placeholder to be replaced with NWS's reviewed privacy policy before launch."
        />
        <div className="prose lead mt-6" style={{ color: "var(--text-body)" }}>
          <p>
            {SITE.legalName} ({SITE.nonprofitStatus}, EIN {SITE.ein}) collects only the
            information needed to sell tickets, process gifts and memberships, send the
            e-newsletter you opt into, and respond to your inquiries.
          </p>
          <p>
            Ticketing, donations, membership purchases, and patron login are handled by our
            third-party providers (Ticketmaster, Salesforce, and our donation partner) under
            their own privacy practices. The e-newsletter is managed through Mailchimp.
          </p>
          <p>
            As a California organization we honor CCPA/CPRA rights, including the right to know,
            delete, and opt out of the sale or sharing of personal information. Analytics and
            marketing pixels load only after you accept them in our consent banner.
          </p>
          <p>
            Questions? Contact the Ticket Office at{" "}
            <a href={`mailto:${SITE.ticketOfficeEmail}`}>{SITE.ticketOfficeEmail}</a>.
          </p>
        </div>
      </div>
    </section>
  );
}
