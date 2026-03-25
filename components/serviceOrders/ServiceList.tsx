"use client";

import { mockServices } from "@/data/mockServices";
import { ServiceOrder, ServiceStatus } from "@/types/service";
import { useState } from "react";
import ServiceCard from "./ServiceCard";

const statusOrder: ServiceStatus[] = ["em_andamento", "pendente", "realizado"];

export default function ServiceList() {
  const [services, setServices] = useState<ServiceOrder[]>(mockServices);

  const sorted = [...services].sort(
    (a, b) => statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status),
  );

  const counts = {
    total: services.length,
    pendente: services.filter((s) => s.status === "pendente").length,
    em_andamento: services.filter((s) => s.status === "em_andamento").length,
    realizado: services.filter((s) => s.status === "realizado").length,
  };

  function handleUpdate(updated: ServiceOrder) {
    setServices((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
  }

  return (
    <div className="service-list">
      <div className="service-list-header">
        <h1 className="service-list-title">Ordens de Serviço</h1>
        <div className="service-stats">
          <span className="stat">
            <strong>{counts.total}</strong> Total
          </span>
          <span className="stat stat--em_andamento">
            <strong>{counts.em_andamento}</strong> Em andamento
          </span>
          <span className="stat stat--pendente">
            <strong>{counts.pendente}</strong> Pendentes
          </span>
          <span className="stat stat--realizado">
            <strong>{counts.realizado}</strong> Realizados
          </span>
        </div>
      </div>

      <div className="service-grid">
        {sorted.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            onUpdate={handleUpdate}
          />
        ))}
      </div>
    </div>
  );
}
