"use client";

import { CatalogService } from "@/types/service";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

interface CatalogModalProps {
  service?: CatalogService;
  onClose: () => void;
  onSave: (data: Omit<CatalogService, "id">) => void;
}

export default function CatalogModal({
  service,
  onClose,
  onSave,
}: CatalogModalProps) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    if (service) {
      setName(service.name);
      setPrice(service.price.toString());
    }
  }, [service]);

  function handleSubmit() {
    if (!name.trim() || !price) return;
    onSave({ name: name.trim(), price: parseFloat(price) });
    onClose();
  }

  const isEditing = !!service;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <span className="modal-client">
            {isEditing ? "Editar Serviço" : "Novo Serviço"}
          </span>
          <button className="modal-close" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="form-group">
          <label className="form-label">Nome do serviço</label>
          <input
            className="form-input"
            type="text"
            placeholder="Ex: Formatação"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Preço (R$)</label>
          <input
            className="form-input"
            type="number"
            placeholder="Ex: 120.00"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            min={0}
          />
        </div>

        <button className="btn-primary" onClick={handleSubmit}>
          {isEditing ? "Salvar alterações" : "Cadastrar serviço"}
        </button>
      </div>
    </div>
  );
}
