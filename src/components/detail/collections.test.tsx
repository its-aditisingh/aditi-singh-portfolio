import { fireEvent, screen, waitFor, within } from '@testing-library/react';
import { renderRoute } from '@/test/renderRoute';

const esc = () => fireEvent.keyDown(document, { key: 'Escape' });

describe('Projects (docs/03-features/03-projects.md)', () => {
  it('lists every project', async () => {
    await renderRoute('/projects');
    const links = screen
      .getAllByRole('link')
      .filter((link) => link.getAttribute('href')?.startsWith('/projects/'));
    expect(links).toHaveLength(5);
  });

  it('opens a project as a modal over the list and closes it with Escape', async () => {
    const { router } = await renderRoute('/projects');
    fireEvent.click(screen.getByRole('link', { name: /Mind Scan Analyzer/ }));

    expect(await screen.findByRole('dialog', { name: 'Mind Scan Analyzer' })).toBeInTheDocument();
    expect(router.state.location.pathname).toBe('/projects/mind-scan-analyzer');
    // the list stays rendered behind the modal
    expect(screen.getByRole('heading', { level: 1, name: 'Projects' })).toBeInTheDocument();

    esc();
    await waitFor(() => expect(router.state.location.pathname).toBe('/projects'));
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  });

  it('Next replaces the entry, so Escape still returns straight to the list', async () => {
    const { router } = await renderRoute('/projects');
    fireEvent.click(screen.getByRole('link', { name: /Mind Scan Analyzer/ }));
    const dialog = await screen.findByRole('dialog', { name: 'Mind Scan Analyzer' });

    fireEvent.click(within(dialog).getByRole('link', { name: /^Next/ }));
    expect(
      await screen.findByRole('dialog', { name: 'Cancer Variant Prioritization (ML)' }),
    ).toBeInTheDocument();

    esc();
    await waitFor(() => expect(router.state.location.pathname).toBe('/projects'));
  });

  it('renders as a full page on a direct visit', async () => {
    await renderRoute('/projects/mind-scan-analyzer');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 1, name: 'Mind Scan Analyzer' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /live demo/i })).toHaveAttribute(
      'href',
      'https://mind-scan-analyzer.lovable.app/',
    );
    expect(screen.getByRole('link', { name: /live demo/i })).toHaveAttribute('target', '_blank');
    expect(screen.getByText('98.41%')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Dataset & source' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /paper \(doi\)/i })).toHaveAttribute(
      'href',
      'https://doi.org/10.3389/fpsyt.2021.707581',
    );
    expect(screen.getByRole('slider', { name: /compare/i })).toBeInTheDocument();
  });

  it('shows the GitHub ML projects with their dataset', async () => {
    await renderRoute('/projects/tesla-stock-price-prediction');
    expect(
      screen.getByRole('heading', { level: 1, name: 'Tesla Stock Price Prediction' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /Tesla \(TSLA\) daily stock prices/ }),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /csv on github/i })).toHaveAttribute(
      'href',
      'https://github.com/its-aditisingh/tesla-stock-price-prediction/blob/main/tsla.csv',
    );
  });

  it('shows a not-found state for an unknown slug', async () => {
    await renderRoute('/projects/does-not-exist');
    expect(screen.getByRole('heading', { name: "We couldn't find that one" })).toBeInTheDocument();
  });
});

describe('Certificates (docs/03-features/04-certificates.md)', () => {
  // Scope to the grid — the featured shuffle deck above it links to certificates too
  const cardLinks = () =>
    within(screen.getByRole('list', { name: 'All certificates' })).getAllByRole('link');

  it('steps through the featured deck with buttons and arrow keys', async () => {
    await renderRoute('/certificates');
    const deck = screen.getByRole('group', { name: 'Featured certificates' });
    const topLink = () => within(deck).getByRole('link'); // only the top card is exposed
    expect(within(deck).getByText('1 / 5')).toBeInTheDocument();
    const first = topLink().getAttribute('href');

    fireEvent.click(within(deck).getByRole('button', { name: /next featured/i }));
    await waitFor(() => expect(within(deck).getByText('2 / 5')).toBeInTheDocument());
    expect(topLink().getAttribute('href')).not.toBe(first);

    fireEvent.keyDown(deck, { key: 'ArrowLeft' });
    await waitFor(() => expect(within(deck).getByText('1 / 5')).toBeInTheDocument());
    expect(topLink()).toHaveAttribute('href', first);
  });

  it('shows all 14, and filters by category via the URL', async () => {
    const { router } = await renderRoute('/certificates');
    expect(cardLinks()).toHaveLength(14);

    fireEvent.click(screen.getByRole('button', { name: /^Cloud/ }));
    await waitFor(() => expect(cardLinks()).toHaveLength(1));
    expect(router.state.location.search).toBe('?category=cloud');
  });

  it('reads the filter from a shared link', async () => {
    await renderRoute('/certificates?category=ai-ml');
    expect(cardLinks()).toHaveLength(6);
    expect(screen.getByRole('button', { name: /^AI & ML/ })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
  });

  it('sorts oldest first with undated certificates last', async () => {
    await renderRoute('/certificates');
    fireEvent.change(screen.getByLabelText('Sort'), { target: { value: 'oldest' } });
    await waitFor(() =>
      expect(cardLinks()[0]).toHaveAttribute(
        'href',
        '/certificates/anudip-aws-advanced-program?sort=oldest',
      ),
    );
    expect(cardLinks().at(-1)?.getAttribute('href')).toMatch(/gfg-data-science-bootcamp/);
  });

  it('keeps the filtered list behind the modal and returns to it', async () => {
    const { router } = await renderRoute('/certificates?category=cloud');
    fireEvent.click(cardLinks()[0] as HTMLElement);
    await screen.findByRole('dialog', { name: 'Advanced Program on Amazon Web Services' });
    expect(router.state.location.search).toBe('?category=cloud');

    esc();
    await waitFor(() => expect(router.state.location.pathname).toBe('/certificates'));
    expect(router.state.location.search).toBe('?category=cloud');
    expect(cardLinks()).toHaveLength(1);
  });

  it('shows credential details, copy and file links', async () => {
    await renderRoute('/certificates/saylor-cs207-fundamentals-of-ml');
    expect(screen.getByText('1911370930AS')).toBeInTheDocument();
    expect(screen.getByText('96.00%')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Copy' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /view pdf/i })).toHaveAttribute(
      'href',
      '/certificates/saylor-cs207-fundamentals-of-ml.pdf',
    );
    // Saylor has no public verify URL; ISRO does
    expect(screen.queryByRole('link', { name: /verify/i })).not.toBeInTheDocument();
  });

  it('links to the issuer verification page when there is one', async () => {
    await renderRoute('/certificates/isro-iirs-tropical-cyclone-workshop');
    expect(screen.getByRole('link', { name: /verify/i })).toHaveAttribute(
      'href',
      'https://isrolms.iirs.gov.in/mod/customcert/verify_certificate.php',
    );
  });
});

describe('Achievements (docs/03-features/05-achievements.md)', () => {
  it('lists GOER and anchoring, with no grade repeats', async () => {
    await renderRoute('/achievements');
    const links = screen
      .getAllByRole('link')
      .filter((link) => link.getAttribute('href')?.startsWith('/achievements/'));
    expect(links).toHaveLength(2);
    expect(links[0]).toHaveAttribute('href', '/achievements/goer-2025-national-finalist');
  });

  it('Escape in the photo lightbox closes only the lightbox, not the detail modal', async () => {
    const { router } = await renderRoute('/achievements');
    fireEvent.click(screen.getByRole('link', { name: /National GOER 2025/ }));
    const dialog = await screen.findByRole('dialog', { name: /National GOER 2025/ });

    const photos = within(dialog).getAllByRole('button', { name: /^View larger: / });
    expect(photos.length).toBeGreaterThanOrEqual(5); // certificate proof + 4 photos
    fireEvent.click(photos[1] as HTMLElement);

    const viewer = await screen.findByRole('dialog', { name: 'Image viewer' });
    expect(within(viewer).getByText('1 / 4')).toBeInTheDocument();
    fireEvent.keyDown(document, { key: 'ArrowRight' });
    expect(within(viewer).getByText('2 / 4')).toBeInTheDocument();

    esc();
    await waitFor(() =>
      expect(screen.queryByRole('dialog', { name: 'Image viewer' })).not.toBeInTheDocument(),
    );
    expect(screen.getByRole('dialog', { name: /National GOER 2025/ })).toBeInTheDocument();
    expect(router.state.location.pathname).toBe('/achievements/goer-2025-national-finalist');
  });
});

describe('Experience (docs/03-features/06-experience.md)', () => {
  it('shows the timeline', async () => {
    await renderRoute('/experience');
    expect(
      screen.getAllByRole('listitem').filter((li) => li.querySelector('a[href^="/experience/"]')),
    ).toHaveLength(2);
  });

  it('computes the duration and shows the proof', async () => {
    await renderRoute('/experience/shanti-infosoft-ai-ml-intern');
    expect(screen.getByText(/Jan 2026 – Jun 2026/)).toHaveTextContent(
      'Jan 2026 – Jun 2026 · 5 months',
    );
    expect(screen.getByText('SHACT2025-073')).toBeInTheDocument();
    expect(screen.getByText(/Demonstrated excellent skills in AI\/ML/)).toBeInTheDocument();
  });

  it('omits sections with no data', async () => {
    await renderRoute('/experience/anudip-aws-training');
    expect(screen.getByText(/Feb 2025 – May 2025/)).toHaveTextContent('Feb 2025 – May 2025 · 3 months');
    expect(screen.queryByRole('heading', { name: 'What I did' })).not.toBeInTheDocument();
  });
});
