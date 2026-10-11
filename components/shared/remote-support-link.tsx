import { type ReactNode } from 'react';
import { REMOTE_SUPPORT_URL } from '@/src/config/site';
import { cn } from '@/lib/utils';

interface RemoteSupportLinkProps {
  className?: string;
  children: ReactNode;
}

/**
 * The single remote-support link. Every instance opens the same URL in a new
 * tab, carries the same accessible label and keeps a visible keyboard focus
 * ring, so the four placements (nav, mobile menu, footer, services) can never
 * drift apart.
 *
 * It is only a link — no form, no embed.
 */
export function RemoteSupportLink({ className, children }: RemoteSupportLinkProps) {
  return (
    <a
      href={REMOTE_SUPPORT_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Start a remote support session (opens in a new tab)"
      className={cn(
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accentRed',
        className
      )}
    >
      {children}
    </a>
  );
}
