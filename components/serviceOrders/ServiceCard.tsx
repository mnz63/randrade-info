"use client";

import { ServiceOrder } from "@/types/service";
import { Calendar, Tag, User } from "lucide-react";
import { useState } from "react";
import ServiceModal from "./ServiceModal";
import StatusBadge from "./StatusBadge";

interface ServiceCardProps {
  service: ServiceOrder;
  onUpdate: (updated: ServiceOrder) => void;
}

export default function ServiceCard({ service, onUpdate }: ServiceCardProps) {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(service);
  const formattedDate = new Date(current.createdAt).toLocaleDateString("pt-BR");

  function handleUpdate(updated: ServiceOrder) {
    setCurrent(updated);
    onUpdate(updated);
  }

  return (
    <>
      <div
        className={`service-card service-card--${current.status}`}
        onClick={() => setOpen(true)}
        style={{ cursor: "pointer" }}
      >
        <div className="service-card-header">
          <div className="service-card-client">
            <User size={15} />
            <span>{current.clientName}</span>
          </div>
          <StatusBadge status={current.status} />
        </div>

        <div className="service-card-tags">
          {current.services.map((s, i) => (
            <span key={i} className="service-tag">
              <Tag size={11} />
              {s.name}
            </span>
          ))}
        </div>

        <div className="service-card-footer">
          <Calendar size={13} />
          <span>{formattedDate}</span>
        </div>
      </div>

      {open && (
        <ServiceModal
          service={current}
          onClose={() => setOpen(false)}
          onUpdate={handleUpdate}
        />
      )}
    </>
  );
}
