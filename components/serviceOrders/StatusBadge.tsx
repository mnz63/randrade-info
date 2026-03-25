import { ServiceStatus } from "@/types/service";

interface StatusBadgeProps {
  status: ServiceStatus;
}

const statusConfig = {
  pendente: {
    label: "Pendente",
    className: "badge badge--pendente",
  },
  em_andamento: {
    label: "Em Andamento",
    className: "badge badge--em_andamento",
  },
  realizado: {
    label: "Realizado",
    className: "badge badge--realizado",
  },
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status];
  return <span className={config.className}>{config.label}</span>;
}
