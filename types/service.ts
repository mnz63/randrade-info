export type ServiceStatus = 'pendente' | 'em_andamento' | 'realizado';
export type PaymentMethod = 'especie' | 'pix' | 'cartao';

export interface ServiceItem {
  name: string;
  price: number;
}

export interface ServiceOrder {
  id: string;
  clientName: string;
  services: ServiceItem[];
  status: ServiceStatus;
  paymentMethod: PaymentMethod;
  createdAt: string;
}

export interface CatalogService {
  id: string;
  name: string;
  price: number;
}