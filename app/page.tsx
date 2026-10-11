import { HeroNew } from '@/components/sections/hero-new';
import { MarqueeStrip } from '@/components/sections/marquee-strip';
import { Statement } from '@/components/sections/statement';
import { Services } from '@/components/sections/services';
import { FeatureBentoGrid } from '@/components/sections/feature-bento-grid';
import { WhoItsFor } from '@/components/sections/who-its-for';
import { NarcoticsLedgerPinned } from '@/components/sections/narcotics-ledger-pinned';
import { AppsShowcase } from '@/components/sections/apps-showcase';
import { HowItWorksNew } from '@/components/sections/how-it-works-new';
import { PricingNew } from '@/components/sections/pricing-new';
import { FAQ } from '@/components/sections/faq';
import { ClosingBand } from '@/components/sections/closing-band';

export default function Home() {
  return (
    <>
      <HeroNew />
      <MarqueeStrip />
      <Statement />
      <Services />
      <FeatureBentoGrid />
      <WhoItsFor />
      <NarcoticsLedgerPinned />
      <AppsShowcase />
      <HowItWorksNew />
      <PricingNew />
      <FAQ />
      <ClosingBand />
    </>
  );
}
