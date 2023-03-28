/* @refresh reload */
import { render } from 'solid-js/web';
import { Router } from '@solidjs/router';
import './index.css';
import App from './app';
import { QueryClient, QueryClientProvider } from '@tanstack/solid-query';

const root = document.getElementById('root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got mispelled?',
  );
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

render(
  () => (
    <QueryClientProvider client={queryClient}>
      <Router>
        <App />
      </Router>
    </QueryClientProvider>
  ),
  root!,
);
