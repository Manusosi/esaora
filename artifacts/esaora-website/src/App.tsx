import { lazy, Suspense } from 'react';
import { Switch, Route, Router as WouterRouter } from 'wouter';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { LanguageProvider } from '@/i18n/LanguageContext';
import { NavBar } from '@/components/NavBar';
import { Footer } from '@/components/Footer';
import { HomePage } from '@/pages/HomePage';
import NotFound from '@/pages/not-found';

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

const queryClient = new QueryClient();

/** Minimal full-screen loading shell that matches the brand */
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

function Router() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        {/* Home */}
        <Route path="/" component={HomePage} />

        {/* About section */}
        <Route path="/about"     component={AboutPage} />
        <Route path="/our-story" component={OurStoryPage} />
        <Route path="/vision"    component={VisionPage} />
        <Route path="/governance"component={GovernancePage} />

        {/* Our Work — Thematic Pillars */}
        <Route path="/our-work/wash"         component={WashPage} />
        <Route path="/our-work/climate"      component={ClimatePage} />
        <Route path="/our-work/blue-economy" component={BlueEconomyPage} />
        <Route path="/our-work/public-health"component={PublicHealthPage} />

        {/* Countries */}
        <Route path="/countries/kenya"       component={KenyaPage} />
        <Route path="/countries/tanzania"    component={TanzaniaPage} />
        <Route path="/countries/mozambique"  component={MozambiquePage} />
        <Route path="/countries/madagascar"  component={MadagascarPage} />

        {/* Programs */}
        <Route path="/programs" component={ProgramsPage} />
        <Route path="/reports"  component={ReportsPage} />

        {/* Engagement */}
        <Route path="/partners" component={PartnersPage} />
        <Route path="/news"     component={NewsPage} />
        <Route path="/gallery"  component={GalleryPage} />
        <Route path="/contact"  component={ContactPage} />

        {/* 404 */}
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LanguageProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
            <NavBar />
            <Router />
            <Footer />
          </WouterRouter>
        </LanguageProvider>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
