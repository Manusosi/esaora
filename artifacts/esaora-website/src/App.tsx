import { lazy, Suspense } from 'react';
// HMR Trigger: Refreshing route manifest to resolve module fetch issues.
import { Switch, Route, Router as WouterRouter } from 'wouter';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { LanguageProvider } from '@/i18n/LanguageContext';
import { NavBar } from '@/components/NavBar';
import { Footer } from '@/components/Footer';
import { CookieConsent } from '@/components/CookieConsent';

// ── Shared UI Hooks ──
import { HomePage } from '@/pages/HomePage';
import NotFound from '@/pages/not-found';
import { useSiteSettings } from '@workspace/esaora-core/hooks/useData';

// ── Phase 2: About Section ──────────────────────────────────────────────────
const AboutPage        = lazy(() => import('@/pages/AboutPage'));
const OurStoryPage     = lazy(() => import('@/pages/OurStoryPage'));
const VisionPage       = lazy(() => import('@/pages/VisionPage'));
const GovernancePage   = lazy(() => import('@/pages/GovernancePage'));

// ── Phase 3: Thematic Pillars ───────────────────────────────────────────────
const WashPage         = lazy(() => import('@/pages/WashPage'));
const ClimatePage      = lazy(() => import('@/pages/ClimatePage'));
const BlueEconomyPage  = lazy(() => import('@/pages/BlueEconomyPage'));
const PublicHealthPage = lazy(() => import('@/pages/PublicHealthPage'));

// ── Phase 4: Country Pages ──────────────────────────────────────────────────
const KenyaPage        = lazy(() => import('@/pages/KenyaPage'));
const TanzaniaPage     = lazy(() => import('@/pages/TanzaniaPage'));
const MozambiquePage   = lazy(() => import('@/pages/MozambiquePage'));
const MadagascarPage   = lazy(() => import('@/pages/MadagascarPage'));

// ── Phase 5: Engagement Pages ───────────────────────────────────────────────
const PartnersPage     = lazy(() => import('@/pages/PartnersPage'));
const NewsPage         = lazy(() => import('@/pages/NewsPage'));
const GalleryPage      = lazy(() => import('@/pages/GalleryPage'));
const ContactPage      = lazy(() => import('@/pages/ContactPage'));

// ── Phase 6: Supporting ─────────────────────────────────────────────────────
const ProgramsPage     = lazy(() => import('@/pages/ProgramsPage'));
const ReportsPage      = lazy(() => import('@/pages/ReportsPage'));
const LegalPage        = lazy(() => import('@/pages/LegalPage'));

// ── Dynamic pages ─────────────────────────────────────────────
const NewsArticlePage  = lazy(() => import('@/pages/NewsArticlePage'));
const ProgramDetailPage = lazy(() => import('@/pages/ProgramDetailPage'));
const DonatePage       = lazy(() => import('@/pages/DonatePage'));
const TeamPage         = lazy(() => import('@/pages/TeamPage'));
const TeamMemberPage   = lazy(() => import('@/pages/TeamMemberPage'));

const queryClient = new QueryClient();

function PageLoader() {
  return (
    <div className="min-h-screen bg-[#001833] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-2 border-[#00d2ff]/30 border-t-[#00d2ff] rounded-full animate-spin" />
        <span className="text-white/40 text-xs tracking-widest uppercase font-medium">Loading</span>
      </div>
    </div>
  );
}

function App() {
  const { settings, loading } = useSiteSettings('maintenance_mode');

  if (loading) return <PageLoader />;

  if (settings.maintenance_mode === 'true') {
    return (
      <div className="min-h-screen bg-[#0B1F3A] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 border-2 border-[#00d2ff]/30 border-t-[#00d2ff] rounded-full animate-spin mb-8" />
        <h1 className="text-4xl font-bold text-white mb-4">Under Maintenance</h1>
        <p className="text-[#00d2ff] text-xl max-w-lg leading-relaxed">
          The ESA-ORA Consortium platform is currently undergoing scheduled maintenance. Please check back shortly.
        </p>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LanguageProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
            <Suspense fallback={<PageLoader />}>
              <NavBar />
              <Switch>
                <Route path="/" component={HomePage} />
                <Route path="/about"      component={AboutPage} />
                <Route path="/our-story"  component={OurStoryPage} />
                <Route path="/vision"     component={VisionPage} />
                <Route path="/governance" component={GovernancePage} />
                <Route path="/our-work/wash"          component={WashPage} />
                <Route path="/our-work/climate"       component={ClimatePage} />
                <Route path="/our-work/blue-economy"  component={BlueEconomyPage} />
                <Route path="/our-work/public-health" component={PublicHealthPage} />
                <Route path="/countries/kenya"      component={KenyaPage} />
                <Route path="/countries/tanzania"   component={TanzaniaPage} />
                <Route path="/countries/mozambique" component={MozambiquePage} />
                <Route path="/countries/madagascar" component={MadagascarPage} />
                <Route path="/programs" component={ProgramsPage} />
                <Route path="/programs/:slug" component={ProgramDetailPage} />
                <Route path="/reports"  component={ReportsPage} />
                <Route path="/partners" component={PartnersPage} />
                <Route path="/news"     component={NewsPage} />
                <Route path="/news/:slug" component={NewsArticlePage} />
                <Route path="/gallery"  component={GalleryPage} />
                <Route path="/contact"  component={ContactPage} />
                <Route path="/team"     component={TeamPage} />
                <Route path="/team/:slug" component={TeamMemberPage} />
                <Route path="/donate"   component={DonatePage} />
                <Route path="/privacy">{() => <LegalPage title="Privacy Policy" type="privacy" />}</Route>
                <Route path="/terms">{() => <LegalPage title="Terms of Service" type="terms" />}</Route>
                <Route path="/cookies">{() => <LegalPage title="Cookie Policy" type="cookies" />}</Route>
                <Route component={NotFound} />
              </Switch>
              <Footer />
            </Suspense>
          </WouterRouter>
        </LanguageProvider>
        <Toaster />
        <CookieConsent />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
