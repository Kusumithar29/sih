import { type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { SiteShell } from '@/components/site-shell';
import { GamesPage } from '@/components/games-page';
import { GamePage } from '@/components/game-page';
import { PassportPage } from '@/components/passport-page';
import { ResultPage } from '@/components/result-page';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import {
  Route,
  Switch,
  useLocation,
  Router as WouterRouter,
} from 'wouter';

const queryClient = new QueryClient();

function Router() {
  return (
    // Keep a shared shell (sidebar, navbar) outside the boundary so it
    // survives a page crash.
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/">
          <SiteShell active="/games"><GamesPage /></SiteShell>
        </Route>
        <Route path="/games/:gameId/result">
          <SiteShell active="/games"><ResultPage /></SiteShell>
        </Route>
        <Route path="/games/:gameId">
          <SiteShell active="/games"><GamePage /></SiteShell>
        </Route>
        <Route path="/passport">
          <SiteShell active="/passport"><PassportPage /></SiteShell>
        </Route>
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
