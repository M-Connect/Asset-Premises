import {
  ShieldIcon,
  CheckCircleIcon,
  AlertTriangleIcon,
  XCircleIcon,
  ClockIcon
} from 'lucide-react';

export default function WarrantyIcon({ status }) {
  let StatusIcon = ShieldIcon;
  switch (status) {
    case 'active':
      StatusIcon = CheckCircleIcon;
      break;
    case 'expired':
      StatusIcon = XCircleIcon;
      break;
    case 'pending':
      StatusIcon = ClockIcon;
      break;
    case 'issue':
      StatusIcon = AlertTriangleIcon;
      break;
  }

  return <StatusIcon />;
}