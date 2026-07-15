import type { PolicyBlock } from "@/lib/data";

/**
 * Renders the privacy notice's block content. The policy text is stored as
 * plain strings (see lib/data/privacy.ts) so the legal wording stays verbatim;
 * this component turns [label](href) spans, bare URLs, and email addresses into
 * real links at render time.
 */

// [label](href) | bare URL | email
const INLINE =
  /\[([^\]]+)\]\(([^)]+)\)|(https?:\/\/[^\s"<>]+)|([A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,})/g;

function PolicyLink({ href, children }: { href: string; children: React.ReactNode }) {
  if (href.startsWith("#") || href.startsWith("mailto:")) {
    return <a href={href}>{children}</a>;
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

function Inline({ text }: { text: string }) {
  const out: React.ReactNode[] = [];
  const re = new RegExp(INLINE.source, "g");
  let last = 0;
  let key = 0;
  let m: RegExpExecArray | null;

  while ((m = re.exec(text)) !== null) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const [full, label, href, url, email] = m;

    if (label && href) {
      out.push(
        <PolicyLink key={key++} href={href}>
          {label}
        </PolicyLink>
      );
    } else if (url) {
      // A sentence-ending "." or "," belongs to the prose, not the URL.
      const clean = url.replace(/[.,;:]+$/, "");
      out.push(
        <PolicyLink key={key++} href={clean}>
          {clean}
        </PolicyLink>
      );
      if (clean.length < url.length) out.push(url.slice(clean.length));
    } else if (email) {
      out.push(
        <a key={key++} href={`mailto:${email}`}>
          {email}
        </a>
      );
    }
    last = m.index + full.length;
  }
  if (last < text.length) out.push(text.slice(last));

  return <>{out}</>;
}

export default function PolicyBody({ blocks }: { blocks: PolicyBlock[] }) {
  return (
    <>
      {blocks.map((b, i) => {
        switch (b.kind) {
          case "p":
            return (
              <p className="policy__p" key={i}>
                <Inline text={b.text} />
              </p>
            );
          case "inShort":
            return (
              <p className="policy__in-short" key={i}>
                <strong>In Short:</strong> <Inline text={b.text} />
              </p>
            );
          case "h3":
            return (
              <h3 className="policy__h3" key={i}>
                {b.text}
              </h3>
            );
          case "ul":
            return (
              <ul className="policy__list" key={i}>
                {b.items.map((item, j) => (
                  <li key={j}>
                    <Inline text={item} />
                  </li>
                ))}
              </ul>
            );
          case "address":
            return (
              <address className="policy__address" key={i}>
                {b.lines.map((line, j) => (
                  <span key={j}>{line}</span>
                ))}
              </address>
            );
          case "table":
            return (
              <div className="policy__table-wrap" key={i}>
                <table className="policy__table">
                  <thead>
                    <tr>
                      {b.head.map((h) => (
                        <th key={h} scope="col">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {b.rows.map((row) => (
                      <tr key={row[0]}>
                        <th scope="row">{row[0]}</th>
                        {row.slice(1).map((cell, j) => (
                          <td key={j}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
        }
      })}
    </>
  );
}
