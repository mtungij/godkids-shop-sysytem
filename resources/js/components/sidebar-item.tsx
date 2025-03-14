import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import clsx from 'clsx';
import { log } from 'console';
import React from 'react';

type SidebarItemProps = {
  icon: React.ReactNode; // The icon element passed as a prop
  label: string; // The label text for the sidebar item
  href?: string; // Optional href for navigation
};

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, href = "#" }) => {
  // Check if the current URL matches the href
  const isActive =  window.location.href.startsWith(href);
  return (
    <li>
      <Link
        className={clsx(
          'flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700',
          isActive ? 'bg-gray-200 dark:bg-gray-700 text-cyan-500' : 'text-zinc-600 dark:text-zinc-400'
        )}
        href={href}
      >
        <span className="icon">{icon}</span>
        <span>{label}</span>
      </Link>
    </li>
  );
};

export default SidebarItem;