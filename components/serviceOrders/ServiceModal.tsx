"use client";

import { mockCatalogServices } from "@/data/mockCatalogServices";
import {
  CatalogService,
  PaymentMethod,
  ServiceOrder,
  ServiceStatus,
} from "@/types/service";
import {
  Banknote,
  Calendar,
  CreditCard,
  Plus,
  QrCode,
  Trash2,
  User,
  X,
} from "lucide-react";
import { useState } from "react";
import StatusBadge from "./StatusBadge";

interface ServiceModalProps {
  service: ServiceOrder;
  onClose: () => void;
  onUpdate: (updated: ServiceOrder) => void;
}

const paymentConfig: Record<
  PaymentMethod,
  { label: string; icon: React.ReactNode; className: string }
> = {
  especie: {
    label: "Espécie",
    icon: <Banknote size={14} />,
    className: "payment-badge payment-badge--especie",
  },
  pix: {
    label: "Pix",
    icon: <QrCode size={14} />,
    className: "payment-badge payment-badge--pix",
  },
  cartao: {
    label: "Cartão",
    icon: <CreditCard size={14} />,
    className: "payment-badge payment-badge--cartao",
  },
};

const statusList: ServiceStatus[] = ["pendente", "em_andamento", "realizado"];

const statusLabels: Record<ServiceStatus, string> = {
  pendente: "Pendente",
  em_andamento: "Em Andamento",
  realizado: "Realizado",
};

export default function ServiceModal({
  service,
  onClose,
  onUpdate,
}: ServiceModalProps) {
  const [currentService, setCurrentService] = useState<ServiceOrder>(service);
  const [showServicePicker, setShowServicePicker] = useState(false);
  const [showStatusPicker, setShowStatusPicker] = useState(false);

  const total = currentService.services.reduce((sum, s) => sum + s.price, 0);
  const formattedDate = new Date(currentService.createdAt).toLocaleDateString(
    "pt-BR",
  );
  const payment = paymentConfig[currentService.paymentMethod];

  function handleAddService(catalog: CatalogService) {
    const updated = {
      ...currentService,
      services: [
        ...currentService.services,
        { name: catalog.name, price: catalog.price },
      ],
    };
    setCurrentService(updated);
    onUpdate(updated);
    setShowServicePicker(false);
  }

  function handleRemoveService(index: number) {
    const updated = {
      ...currentService,
      services: currentService.services.filter((_, i) => i !== index),
    };
    setCurrentService(updated);
    onUpdate(updated);
  }

  function handleStatusChange(status: ServiceStatus) {
    const updated = { ...currentService, status };
    setCurrentService(updated);
    onUpdate(updated);
    setShowStatusPicker(false);
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div className="modal-client">
            <User size={16} />
            <span>{currentService.clientName}</span>
          </div>
          <div className="modal-header-right">
            {/* Status clicável */}
            <div className="status-picker-wrapper">
              <div
                onClick={() => setShowStatusPicker((v) => !v)}
                style={{ cursor: "pointer" }}
              >
                <StatusBadge status={currentService.status} />
              </div>
              {showStatusPicker && (
                <div className="dropdown">
                  {statusList.map((s) => (
                    <button
                      key={s}
                      className={`dropdown-item ${currentService.status === s ? "dropdown-item--active" : ""}`}
                      onClick={() => handleStatusChange(s)}
                    >
                      {statusLabels[s]}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button className="modal-close" onClick={onClose}>
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Meta */}
        <div className="modal-meta">
          <div className="modal-date">
            <Calendar size={13} />
            <span>{formattedDate}</span>
          </div>
          <span className={payment.className}>
            {payment.icon}
            {payment.label}
          </span>
        </div>

        {/* Serviços */}
        <div className="modal-services">
          <p className="modal-section-label">Serviços</p>
          <div className="modal-service-list">
            {currentService.services.length === 0 && (
              <p className="empty-services">Nenhum serviço adicionado.</p>
            )}
            {currentService.services.map((s, i) => (
              <div key={i} className="modal-service-row">
                <span>{s.name}</span>
                <div className="modal-service-row-right">
                  <span>R$ {s.price.toFixed(2)}</span>
                  <button
                    className="remove-btn"
                    onClick={() => handleRemoveService(i)}
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Botão adicionar serviço */}
          <div className="service-picker-wrapper">
            <button
              className="add-service-btn"
              onClick={() => setShowServicePicker((v) => !v)}
            >
              <Plus size={16} />
            </button>
            {showServicePicker && (
              <div className="dropdown dropdown--up">
                {mockCatalogServices.map((s) => (
                  <button
                    key={s.id}
                    className="dropdown-item"
                    onClick={() => handleAddService(s)}
                  >
                    <span>{s.name}</span>
                    <span className="dropdown-item-price">
                      R$ {s.price.toFixed(2)}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Total */}
        <div className="modal-total">
          <span>Total</span>
          <span>R$ {total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
