import Image from "next/image";
import { BOARD_MEMBERS, AVATAR_GRADIENTS } from "@/lib/data";

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
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
