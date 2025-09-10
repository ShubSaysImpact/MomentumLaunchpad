import {
  LayoutDashboard,
  Target,
  TrendingUp,
  DollarSign,
  RotateCw,
  Lightbulb,
  Pin,
} from 'lucide-react';

export type NavItem = {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  disabled?: boolean;
};

export const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Zone of Impact',
    href: '/zone-of-impact',
    icon: Target,
  },
  {
    title: 'Traction & Buy-in',
    href: '/traction-buy-in',
    icon: TrendingUp,
  },
  {
    title: 'Monetisation',
    href: '/monetisation',
    icon: DollarSign,
  },
  {
    title: 'Retrospective',
    href: '/retrospective',
    icon: RotateCw,
  },
  {
    title: 'Learnings',
    href: '/learnings',
    icon: Lightbulb,
  },
  {
    title: 'Pin Board',
    href: '/pin-board',
    icon: Pin,
  },
];
