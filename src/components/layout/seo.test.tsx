import { waitFor } from '@testing-library/react';
import { renderRoute } from '@/test/renderRoute';

const meta = (selector: string) => document.head.querySelector(selector)?.getAttribute('content');
const SITE = import.meta.env.VITE_SITE_URL;

describe('Seo (NFR-S1/S2/S4/S5)', () => {
  it('sets title, description, canonical and share tags per page', async () => {
    await renderRoute('/certificates/saylor-cs207-fundamentals-of-ml');
    await waitFor(() =>
      expect(document.title).toBe('CS207: Fundamentals of Machine Learning · Aditi Singh'),
    );
    expect(document.head.querySelector('link[rel="canonical"]')).toHaveAttribute(
      'href',
      `${SITE}/certificates/saylor-cs207-fundamentals-of-ml`,
    );
    expect(meta('meta[property="og:url"]')).toBe(
      `${SITE}/certificates/saylor-cs207-fundamentals-of-ml`,
    );
    expect(meta('meta[name="description"]')).toMatch(
      /^CS207: Fundamentals of Machine Learning — Saylor/,
    );
    // the certificate image is the share image, as an absolute URL
    expect(meta('meta[property="og:image"]')).toMatch(new RegExp(`^${SITE}/`));
  });

  it('adds Person structured data on Home', async () => {
    await renderRoute('/');
    await waitFor(() =>
      expect(document.head.querySelector('script[type="application/ld+json"]')).not.toBeNull(),
    );
    const data = JSON.parse(
      document.head.querySelector('script[type="application/ld+json"]')?.textContent ?? '{}',
    );
    expect(data).toMatchObject({ '@type': 'Person', name: 'Aditi Singh', url: `${SITE}/` });
    expect(data.sameAs).toEqual([
      'https://www.linkedin.com/in/adyti',
      'https://github.com/its-aditisingh',
    ]);
  });
});
