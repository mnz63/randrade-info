import { ServiceOrder } from '@/types/service';

export const mockServices: ServiceOrder[] = [
  {
    id: '1',
    clientName: 'João Silva',
    services: [
      { name: 'Formatação', price: 120 },
      { name: 'Instalação de Software', price: 60 },
    ],
    status: 'em_andamento',
    paymentMethod: 'pix',
    createdAt: '2025-03-20',
  },
  {
    id: '2',
    clientName: 'Maria Souza',
    services: [
      { name: 'Limpeza', price: 80 },
      { name: 'Diagnóstico', price: 50 },
    ],
    status: 'pendente',
    paymentMethod: 'cartao',
    createdAt: '2025-03-21',
  },
  {
    id: '3',
    clientName: 'Carlos Mendes',
    services: [
      { name: 'Troca de Peças', price: 250 },
    ],
    status: 'realizado',
    paymentMethod: 'especie',
    createdAt: '2025-03-18',
  },
  {
    id: '4',
    clientName: 'Ana Paula',
    services: [
      { name: 'Formatação', price: 120 },
      { name: 'Limpeza', price: 80 },
      { name: 'Troca de Peças', price: 250 },
    ],
    status: 'pendente',
    paymentMethod: 'pix',
    createdAt: '2025-03-22',
  },
];