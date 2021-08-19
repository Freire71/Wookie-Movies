import React from 'react';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';
import theme from '../config/Theme';
import { movies } from './payloads/MoviesPayload';
import { QueryClient, QueryClientProvider, setLogger } from 'react-query';

export function renderWithProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

export function renderWithThemeAndReactQueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  setLogger({
    log: console.log,
    warn: console.warn,
    error: () => {},
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </QueryClientProvider>
  );
}

export function reactQueryWrapper({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  setLogger({
    log: console.log,
    warn: console.warn,
    error: () => {},
  });

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

const customRender = (ui: any) => render(ui, { wrapper: renderWithProvider });

const pageRender = (ui: any) =>
  render(ui, { wrapper: renderWithThemeAndReactQueryProvider });

export * from '@testing-library/react-native';

export { customRender as render, movies, pageRender };

export function testID(id: string) {
  return __DEV__ ? { testID: id } : {};
}
