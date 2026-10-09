'use client';

import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h2 className="font-heading text-2xl font-bold text-primaryText">
        Something went wrong
      </h2>
      <p className="mt-2 text-sm text-secondaryText">
        {error.message || 'An unexpected error occurred.'}
      </p>
      <Button
        className="mt-6 bg-accentRed text-primaryText hover:bg-accentRedBright"
        onClick={reset}
      >
        Try again
      </Button>
    </div>
  );
}
