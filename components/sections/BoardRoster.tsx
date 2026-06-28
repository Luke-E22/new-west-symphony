import Image from "next/image";
import { BOARD_MEMBERS, AVATAR_GRADIENTS } from "@/lib/data";
import { SocialIcon } from "@/components/Icons";

const LINK_LABELS = {
  linkedin: "on LinkedIn",
  instagram: "on Instagram",
  website: "— personal website",
} as const;

/**
 * Board of Directors roster with real headshots. The data order centers Luke
 * Erickson (4th of 7) and the centered flex layout keeps him mid-row.
 */
export default function BoardRoster() {
  return (
    <div className="roster">
      {BOARD_MEMBERS.map((m, i) => (
        <figure className="roster-person" key={m.name}>
          <div className="roster-person__av">
            {m.photo ? (
              <Image
                src={m.photo}
                alt={`${m.name}, ${m.role}`}
                fill
                sizes="150px"
                style={{ objectFit: "cover" }}
              />
            ) : (
              <span
                aria-hidden="true"
                style={{
                  display: "block",
                  width: "100%",
                  height: "100%",
                  background: AVATAR_GRADIENTS[i % AVATAR_GRADIENTS.length],
                }}
              />
            )}
          </div>
          <figcaption>
            <div className="roster-person__name">{m.name}</div>
            <div className="roster-person__role">{m.role}</div>
            {m.links && m.links.length > 0 && (
              <div className="roster-person__links">
                {m.links.map((link) => (
                  <a
                    key={link.kind}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="roster-person__link"
                    aria-label={`${m.name} ${LINK_LABELS[link.kind]}`}
                  >
                    <SocialIcon name={link.kind} size={16} />
                  </a>
                ))}
              </div>
            )}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
