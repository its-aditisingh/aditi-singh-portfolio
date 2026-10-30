import type { RouteObject } from 'react-router-dom';
import { RootLayout } from '@/components/layout/RootLayout';
import { HomePage } from '@/pages/HomePage';
import { NotFoundPage } from '@/pages/NotFoundPage';

// Route table: docs/02-architecture/routing-and-navigation.md
// Detail routes are children of their list so a detail opened from the list can render as a
// modal over it (see CollectionRoute); visited directly, the detail renders as a full page.
//
// Code splitting (NFR-P3): Home and the layout ship in the entry chunk (Home is the LCP page);
// every other page and detail view is a `lazy` route, fetched by the router before it navigates.
export const routes: RouteObject[] = [
  {
    path: '/',
    element: <RootLayout />,
    // Shown only while a lazy route is fetched on a direct visit (e.g. a shared /certificates link)
    HydrateFallback: () => <div className="min-h-screen bg-canvas" />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: 'about',
        lazy: () => import('@/pages/AboutPage').then((m) => ({ Component: m.AboutPage })),
      },
      {
        path: 'research',
        lazy: () => import('@/pages/ResearchPage').then((m) => ({ Component: m.ResearchPage })),
      },
      {
        path: 'projects',
        lazy: () => import('@/pages/ProjectsPage').then((m) => ({ Component: m.ProjectsPage })),
        children: [
          {
            path: ':slug',
            lazy: () =>
              import('@/components/detail/ProjectDetail').then((m) => ({ Component: m.ProjectDetail })),
          },
        ],
      },
      {
        path: 'certificates',
        lazy: () =>
          import('@/pages/CertificatesPage').then((m) => ({ Component: m.CertificatesPage })),
        children: [
          {
            path: ':slug',
            lazy: () =>
              import('@/components/detail/CertificateDetail').then((m) => ({
                Component: m.CertificateDetail,
              })),
          },
        ],
      },
      {
        path: 'achievements',
        lazy: () =>
          import('@/pages/AchievementsPage').then((m) => ({ Component: m.AchievementsPage })),
        children: [
          {
            path: ':slug',
            lazy: () =>
              import('@/components/detail/AchievementDetail').then((m) => ({
                Component: m.AchievementDetail,
              })),
          },
        ],
      },
      {
        path: 'experience',
        lazy: () => import('@/pages/ExperiencePage').then((m) => ({ Component: m.ExperiencePage })),
        children: [
          {
            path: ':slug',
            lazy: () =>
              import('@/components/detail/ExperienceDetail').then((m) => ({
                Component: m.ExperienceDetail,
              })),
          },
        ],
      },
      {
        path: 'contact',
        lazy: () => import('@/pages/ContactPage').then((m) => ({ Component: m.ContactPage })),
      },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
];

// Opt into v7 behaviour now so the upgrade is painless (also silences v6 warnings)
export const routerFuture = {
  v7_relativeSplatPath: true,
  v7_fetcherPersist: true,
  v7_normalizeFormMethod: true,
  v7_partialHydration: true,
  v7_skipActionErrorRevalidation: true,
} as const;

export const providerFuture = { v7_startTransition: true } as const;
