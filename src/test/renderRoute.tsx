import { render, waitFor } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { RouterProvider, createMemoryRouter, type RouteObject } from 'react-router-dom';
import { providerFuture, routerFuture, routes } from '@/routes/router';

// Warm every lazy route module once. Otherwise the first test that clicks into a page pays the
// cold module transform, which can outlast findBy's 1s timeout (flaky in CI, never in browsers).
function lazyLoaders(list: RouteObject[]): Promise<unknown>[] {
  return list.flatMap((route) => [
    ...(typeof route.lazy === 'function' ? [route.lazy()] : []),
    ...lazyLoaders(route.children ?? []),
  ]);
}
const preloaded = Promise.all(lazyLoaders(routes));

/**
 * Renders the real route table at `path` (same layout as production) and waits until the
 * router has loaded any lazy route modules, so the page is on screen when this resolves.
 */
export async function renderRoute(path = '/') {
  await preloaded;
  const router = createMemoryRouter(routes, { initialEntries: [path], future: routerFuture });
  const result = render(
    <HelmetProvider>
      <RouterProvider router={router} future={providerFuture} />
    </HelmetProvider>,
  );
  // Router state settles first; with v7_startTransition React commits the page a tick later,
  // so also wait for the layout to replace the HydrateFallback in the DOM.
  await waitFor(() => {
    if (!router.state.initialized || router.state.navigation.state !== 'idle') {
      throw new Error('router still loading');
    }
    if (!result.container.querySelector('#main')) throw new Error('page not committed yet');
  });
  return { router, ...result };
}
