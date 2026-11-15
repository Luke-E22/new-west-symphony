"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import Button from "@/components/core/Button";
import Logo from "@/components/brand/Logo";
import { EXTERNAL, MEMBERSHIP_PURCHASE_URL } from "@/lib/config";
import {
  NAV_GROUPS,
  currentGroupKey,
  isCurrentLink,
  type NavGroup,
  type NavLink,
} from "@/lib/navigation";

/** Hover opens a menu after a short pause so a passing pointer doesn't flicker it. */
const HOVER_OPEN_MS = 200;
const HOVER_CLOSE_MS = 300;

function Chevron() {
  return (
    <svg className="nav-chevron" width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
      <path d="M1.5 3.5 5 7l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function MenuLink({
  link,
  className,
  pathname,
  onNavigate,
}: {
  link: NavLink;
  className: string;
  pathname: string;
  onNavigate: () => void;
}): ReactNode {
  if (link.external) {
    return (
      <a href={link.href} className={className} target="_blank" rel="noopener noreferrer" onClick={onNavigate}>
        {link.label}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  }
  if (link.fullLoad) {
    return (
      <a href={link.href} className={className} onClick={onNavigate}>
        {link.label}
      </a>
    );
  }
  return (
    <Link
      href={link.href}
      className={className}
      aria-current={isCurrentLink(pathname, link.href) ? "page" : undefined}
      onClick={onNavigate}
    >
      {link.label}
    </Link>
  );
}

/**
 * Desktop dropdowns follow the W3C disclosure-navigation pattern: each menu is
 * a button with aria-expanded that shows or hides a plain list of links. Click
 * or tap always works; a mouse can also open one by resting on it. Escape, a
 * click elsewhere, or tabbing away closes it.
 */
function DesktopNav({ pathname }: { pathname: string }) {
  const [openKey, setOpenKey] = useState<string | null>(null);
  const openedByHover = useRef(false);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const navRef = useRef<HTMLElement>(null);
  const current = currentGroupKey(pathname);

  useEffect(() => {
    if (!openKey) return;
    function onPointerDown(e: PointerEvent) {
      if (!navRef.current?.contains(e.target as Node)) setOpenKey(null);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key !== "Escape") return;
      const trigger = navRef.current?.querySelector<HTMLButtonElement>(`[aria-controls="nav-${openKey}"]`);
      setOpenKey(null);
      trigger?.focus();
    }
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [openKey]);

  useEffect(() => () => clearTimeout(hoverTimer.current), []);

  const close = () => {
    clearTimeout(hoverTimer.current);
    setOpenKey(null);
  };

  function hoverOpen(group: NavGroup) {
    clearTimeout(hoverTimer.current);
    // Moving across the bar with a menu already open switches straight away.
    hoverTimer.current = setTimeout(
      () => {
        openedByHover.current = true;
        setOpenKey(group.key);
      },
      openKey ? 0 : HOVER_OPEN_MS,
    );
  }

  function hoverClose(group: NavGroup) {
    clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => {
      setOpenKey((key) => (key === group.key ? null : key));
    }, HOVER_CLOSE_MS);
  }

  function toggle(group: NavGroup) {
    clearTimeout(hoverTimer.current);
    // A click on a menu the pointer just opened keeps it open rather than
    // snapping it shut.
    if (openKey === group.key && openedByHover.current) {
      openedByHover.current = false;
      return;
    }
    openedByHover.current = false;
    setOpenKey((key) => (key === group.key ? null : group.key));
  }

  return (
    <nav className="site-nav" aria-label="Primary" ref={navRef}>
      <ul className="site-nav__list">
        {NAV_GROUPS.map((group) => {
          const open = openKey === group.key;
          return (
            <li
              key={group.key}
              className="site-nav__item"
              onPointerEnter={(e) => e.pointerType === "mouse" && hoverOpen(group)}
              onPointerLeave={(e) => e.pointerType === "mouse" && hoverClose(group)}
              onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
                  setOpenKey((key) => (key === group.key ? null : key));
                }
              }}
            >
              <button
                type="button"
                className="site-nav__link site-nav__trigger"
                aria-expanded={open}
                aria-controls={`nav-${group.key}`}
                data-current={current === group.key || undefined}
                onClick={() => toggle(group)}
              >
                {group.label}
                <Chevron />
              </button>
              <div
                id={`nav-${group.key}`}
                className={group.alignEnd ? "site-nav__panel site-nav__panel--end" : "site-nav__panel"}
                hidden={!open}
              >
                <div className="site-nav__card">
                  {group.columns.map((column, i) => (
                    <div className="site-nav__col" key={column.heading ?? i}>
                      {column.heading && <p className="site-nav__heading">{column.heading}</p>}
                      <ul className="site-nav__sublist">
                        {column.links.map((link) => (
                          <li key={link.href}>
                            <MenuLink
                              link={link}
                              className="site-nav__sublink"
                              pathname={pathname}
                              onNavigate={close}
                            />
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [mobileGroup, setMobileGroup] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const close = () => setOpen(false);
  // Dismiss (✕ / backdrop / Escape) returns focus to the toggle (WCAG 2.4.3);
  // nav links use `close` since navigation moves focus to the new page.
  const dismiss = () => {
    setOpen(false);
    toggleRef.current?.focus();
  };

  // Focus trap + Escape while the mobile menu is open. The focusable list is
  // read on every Tab because expanding a section adds links.
  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    const focusables = () =>
      [...(panel?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])") ?? [])].filter(
        (el) => el.offsetParent !== null,
      );
    focusables()[0]?.focus();

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
      const items = focusables();
      if (e.key === "Tab" && items.length > 0) {
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="site-header">
        <div className="container site-header__bar">
        <Link href="/" className="brand-lockup" aria-label="New West Symphony — home">
          {/* Decorative: the link's aria-label + visible wordmark name the lockup,
              so an alt here would be redundant (axe image-redundant-alt). */}
          <Logo variant="mark" height={42} preload alt="" />
          <span className="brand-lockup__divider" aria-hidden="true" />
          <span className="brand-lockup__wordmark">
            New West
            <br />
            Symphony
          </span>
        </Link>

        <DesktopNav pathname={pathname} />

        <div className="site-header__actions">
          {/* Routes to the season listing: each concert sells per venue, so
              there's no single ticketing URL to deep-link from the chrome. */}
          <Button href="/concerts" variant="ghost" size="sm" className="action--buy" track="buy_tickets_click" trackParams={{ location: "header" }}>
            Buy Tickets
          </Button>
          <Button href={MEMBERSHIP_PURCHASE_URL} variant="gold" size="sm" track="become_member_click" trackParams={{ location: "header" }}>
            Become a Member
          </Button>
          <Button href={EXTERNAL.donate} variant="solid" size="sm" track="donate_click" trackParams={{ location: "header" }}>
            Donate
          </Button>
        </div>

        <button
          ref={toggleRef}
          type="button"
          className="site-header__menu-toggle"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => {
            // Start with the current page's section expanded.
            setMobileGroup(currentGroupKey(pathname) ?? null);
            setOpen(true);
          }}
        >
          <span aria-hidden="true" className="site-header__menu-glyph">
            ☰
          </span>
        </button>
        </div>
      </header>

      {/* Rendered OUTSIDE <header>: the header's backdrop-filter would otherwise
          make this fixed overlay positioned/clipped to the header strip (a known
          iOS Safari containing-block quirk), trapping the menu behind the hero. */}
      <div
        id="mobile-menu"
        className="mobile-menu"
        data-open={open}
        onClick={(e) => {
          if (e.target === e.currentTarget) dismiss();
        }}
      >
        <div className="mobile-menu__panel" ref={panelRef} role="dialog" aria-modal="true" aria-label="Site menu">
          <div className="mobile-menu__head">
            <Logo variant="mark" height={36} />
            <button
              type="button"
              className="mobile-menu__close"
              aria-label="Close menu"
              onClick={dismiss}
            >
              ✕
            </button>
          </div>
          {NAV_GROUPS.map((group) => {
            const expanded = mobileGroup === group.key;
            return (
              <div className="mobile-menu__group" key={group.key}>
                <button
                  type="button"
                  className="mobile-menu__link mobile-menu__trigger"
                  aria-expanded={expanded}
                  aria-controls={`mobile-nav-${group.key}`}
                  data-current={currentGroupKey(pathname) === group.key || undefined}
                  onClick={() => setMobileGroup((key) => (key === group.key ? null : group.key))}
                >
                  {group.label}
                  <Chevron />
                </button>
                <div id={`mobile-nav-${group.key}`} className="mobile-menu__section" hidden={!expanded}>
                  {group.columns.map((column, i) => (
                    <div key={column.heading ?? i}>
                      {column.heading && <p className="mobile-menu__heading">{column.heading}</p>}
                      <ul className="mobile-menu__sublist">
                        {column.links.map((link) => (
                          <li key={link.href}>
                            <MenuLink
                              link={link}
                              className="mobile-menu__sublink"
                              pathname={pathname}
                              onNavigate={close}
                            />
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
          <div className="mobile-menu__actions">
            <Button href="/concerts" variant="ghost" fullWidth onClick={close} track="buy_tickets_click" trackParams={{ location: "mobile-menu" }}>
              Buy Tickets
            </Button>
            <Button href={MEMBERSHIP_PURCHASE_URL} variant="gold" fullWidth onClick={close} track="become_member_click" trackParams={{ location: "mobile-menu" }}>
              Become a Member
            </Button>
            <Button href={EXTERNAL.donate} variant="solid" fullWidth onClick={close} track="donate_click" trackParams={{ location: "mobile-menu" }}>
              Donate
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
