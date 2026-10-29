import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { providerFuture, routerFuture, routes } from '@/routes/router';

const router = createBrowserRouter(routes, { future: routerFuture });

export function App() {
  return (
    <HelmetProvider>
      <RouterProvider router={router} future={providerFuture} />
    </HelmetProvider>
  );
}
