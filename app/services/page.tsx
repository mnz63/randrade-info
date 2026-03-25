"use client";

import CatalogCard from "@/components/servicesCatalog/servicesCatalogCard";
import CatalogModal from "@/components/servicesCatalog/servicesCatalogModal";
import { mockCatalogServices } from "@/data/mockCatalogServices";
import { CatalogService } from "@/types/service";
import { Plus } from "lucide-react";
import { useState } from "react";

export default function Services() {
  const [services, setServices] =
    useState<CatalogService[]>(mockCatalogServices);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<CatalogService | undefined>();

  function handleSave(data: Omit<CatalogService, "id">) {
    if (editing) {
      setServices((prev) =>
        prev.map((s) => (s.id === editing.id ? { ...s, ...data } : s)),
      );
    } else {
      setServices((prev) => [...prev, { id: crypto.randomUUID(), ...data }]);
    }
  }

  function openCreate() {
    setEditing(undefined);
    setModalOpen(true);
  }

  function openEdit(service: CatalogService) {
    setEditing(service);
    setModalOpen(true);
  }

  return (
    <div className="service-list">
      <div className="service-list-header">
        <h1 className="service-list-title">Serviços</h1>
        <button className="btn-primary" onClick={openCreate}>
          <Plus size={16} />
          Novo Serviço
        </button>
      </div>

      <div className="service-grid">
        {services.map((s) => (
          <CatalogCard key={s.id} service={s} onClick={() => openEdit(s)} />
        ))}
      </div>

      {modalOpen && (
        <CatalogModal
          service={editing}
          onClose={() => setModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
