import { HeroSection } from '@/components/HeroSection';
import { StatsBar } from '@/components/StatsBar';
import { BlueprintSection } from '@/components/BlueprintSection';
import { VideoSection } from '@/components/VideoSection';
import { CountryMapSection } from '@/components/CountryMapSection';
import { ObjectivesSlider } from '@/components/ObjectivesSlider';
import { GovernanceSection } from '@/components/GovernanceSection';
import { NewsSection } from '@/components/NewsSection';
import { PartnerMarquee } from '@/components/PartnerMarquee';
import { CTASection } from '@/components/CTASection';

export function HomePage() {
  return (
    <main>
      <HeroSection />
      <StatsBar />
      <BlueprintSection />
      <VideoSection />
      <CountryMapSection />
      <ObjectivesSlider />
      <GovernanceSection />
      <NewsSection />
      <PartnerMarquee />
      <CTASection />
    </main>
  );
}
