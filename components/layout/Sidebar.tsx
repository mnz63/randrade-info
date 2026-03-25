"use client";

import { File, Wrench } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sidebar">
      <div
        className="sidebar-logo"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 1,
        }}
      >
        <span className="sidebar-logo-text">RandradeInfo</span>
        <span
          className="sidebar-logo-text"
          style={{
            textAlign: "center",
            fontWeight: 400,
            fontSize: "0.7rem",
          }}
        >
          Soluções em informática
        </span>
      </div>

      <nav className="sidebar-nav">
        <p className="sidebar-section-label">Menu</p>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          <Link
            href="/"
            className={`sidebar-link ${pathname === "/" ? "sidebar-link--active" : ""}`}
          >
            <File size={18} />
            Ordens de Serviços
          </Link>
          <Link
            href="/services"
            className={`sidebar-link ${pathname === "/services" ? "sidebar-link--active" : ""}`}
          >
            <Wrench size={18} />
            Serviços
          </Link>
        </div>
      </nav>
    </aside>
  );
}
