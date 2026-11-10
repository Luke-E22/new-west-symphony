import Link from "next/link";

const TABS = [
  { key: "concerts", label: "Masterpiece Series", href: "/concerts" },
  { key: "events", label: "Full Calendar", href: "/events" },
] as const;

/** Switches between the concert season and the full events calendar. */
export default function ConcertTabs({ active }: { active: (typeof TABS)[number]["key"] }) {
  return (
    <nav className="page-tabs" aria-label="Concerts and events">
      <div className="container page-tabs__inner">
        {TABS.map((tab) => (
          <Link
            key={tab.key}
            href={tab.href}
            className="page-tabs__link"
            aria-current={tab.key === active ? "page" : undefined}
          >
            {tab.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
