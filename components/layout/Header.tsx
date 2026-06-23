"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Button from "@/components/core/Button";
import Logo from "@/components/brand/Logo";
import { EXTERNAL, MEMBERSHIP_PURCHASE_URL, NAV } from "@/lib/config";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const close = () => setOpen(false);

  // Focus trap + Escape while the mobile menu is open.
  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    const focusables = panel?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled])',
    );
    focusables?.[0]?.focus();

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
      if (e.key === "Tab" && focusables && focusables.length > 0) {
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
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
    <header className="site-header">
      <div className="container site-header__bar">
        <Link href="/" className="brand-lockup" aria-label="New West Symphony — home">
          {/* Decorative: the link's aria-label + visible wordmark name the lockup,
              so an alt here would be redundant (axe image-redundant-alt). */}
          <Logo variant="mark" height={42} priority alt="" />
          <span className="brand-lockup__divider" aria-hidden="true" />
          <span className="brand-lockup__wordmark">
            New West
            <br />
            Symphony
          </span>
        </Link>

        <nav className="site-nav" aria-label="Primary">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="site-nav__link"
              aria-current={isActive(pathname, item.href) ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="site-header__actions">
          <Button href={EXTERNAL.ticketsThousandOaks} variant="ghost" size="sm" className="action--buy" track="buy_tickets_click" trackParams={{ location: "header" }}>
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
          aria-label="Open menu"
          onClick={() => setOpen(true)}
        >
          <span aria-hidden="true" style={{ fontSize: 22, lineHeight: 1 }}>
            ☰
          </span>
        </button>
      </div>

      <div
        id="mobile-menu"
        className="mobile-menu"
        data-open={open}
        onClick={(e) => {
          if (e.target === e.currentTarget) setOpen(false);
        }}
      >
        <div className="mobile-menu__panel" ref={panelRef} role="dialog" aria-modal="true" aria-label="Site menu">
          <div className="mobile-menu__head">
            <Logo variant="mark" height={36} />
            <button
              type="button"
              className="mobile-menu__close"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
            >
              ✕
            </button>
          </div>
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="mobile-menu__link"
              aria-current={isActive(pathname, item.href) ? "page" : undefined}
              onClick={close}
            >
              {item.label}
            </Link>
          ))}
          <div className="mobile-menu__actions">
            <Button href={EXTERNAL.ticketsThousandOaks} variant="ghost" fullWidth onClick={close} track="buy_tickets_click" trackParams={{ location: "mobile-menu" }}>
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
    </header>
  );
}
