import { PricingOverview } from '@/components/sections/pricing-overview';

export const metadata = { title: 'Pricing' };

export default function PricingPage() {
  return <main><div className="mx-auto max-w-3xl px-4 pb-4 pt-16 text-center sm:px-6 lg:px-8"><p className="text-sm font-semibold uppercase tracking-[0.2em] text-accentRed">Simple plans</p><h1 className="mt-3 font-heading text-4xl font-bold tracking-tight text-primaryText sm:text-5xl">Pricing that scales with your operation</h1></div><PricingOverview /></main>;
}
