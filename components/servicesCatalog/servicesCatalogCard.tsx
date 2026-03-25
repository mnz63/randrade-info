"use client";

import { CatalogService } from "@/types/service";
import { Wrench } from "lucide-react";

interface CatalogCardProps {
  service: CatalogService;
  onClick: () => void;
}

export default function CatalogCard({ service, onClick }: CatalogCardProps) {
  return (
    <div className="catalog-card" onClick={onClick}>
      <div className="catalog-card-icon">
        <Wrench size={18} />
      </div>
      <div className="catalog-card-info">
        <span className="catalog-card-name">{service.name}</span>
        <span className="catalog-card-price">
          R$ {service.price.toFixed(2)}
        </span>
      </div>
    </div>
  );
}
