import { act, fireEvent, screen, waitFor, within } from '@testing-library/react';
import { renderRoute } from '@/test/renderRoute';

const NAV_ORDER = [
  'Home',
  'About',
  'Projects',
  'Certificates',
  'Achievements',
  'Experience',
  'Contact',
];

beforeEach(() => {
  document.documentElement.classList.remove('dark');
  localStorage.clear();
});

describe('Navbar', () => {
  it('renders the 7 nav links in order', async () => {
    await renderRoute('/');
    const nav = screen.getByRole('navigation', { name: 'Main' });
    const labels = within(nav)
      .getAllByRole('link')
      .map((link) => link.textContent);
    expect(labels).toEqual(NAV_ORDER);
  });

  it('keeps the parent item active on a detail route', async () => {
    await renderRoute('/certificates/kaggle-time-series');
    const nav = screen.getByRole('navigation', { name: 'Main' });
    expect(within(nav).getByRole('link', { name: 'Certificates' })).toHaveAttribute(
      'aria-current',
      'page',
    );
    expect(within(nav).getByRole('link', { name: 'Home' })).not.toHaveAttribute('aria-current');
  });

  it('navigates when a nav link is clicked', async () => {
    const { router } = await renderRoute('/');
    const nav = screen.getByRole('navigation', { name: 'Main' });
    fireEvent.click(within(nav).getByRole('link', { name: 'Projects' }));
    await waitFor(() => expect(router.state.location.pathname).toBe('/projects'));
    expect(await screen.findByRole('heading', { level: 1, name: 'Projects' })).toBeInTheDocument();
  });

  it('links the resume download', async () => {
    await renderRoute('/');
    const resume = screen.getAllByRole('link', { name: /resume/i })[0];
    expect(resume).toHaveAttribute('href', '/resume/Aditi-Singh-Resume.pdf');
    expect(resume).toHaveAttribute('download');
  });
});

describe('Mobile menu', () => {
  it('opens, closes on Escape, and returns focus to the menu button', async () => {
    await renderRoute('/');
    const openButton = screen.getByRole('button', { name: 'Open menu' });
    act(() => openButton.focus());
    fireEvent.click(openButton);

    const dialog = await screen.findByRole('dialog', { name: 'Site menu' });
    expect(within(dialog).getAllByRole('link', { name: /home|about|projects|certificates|achievements|experience|contact/i })).toHaveLength(8); // 7 items + logo
    expect(document.body.style.overflow).toBe('hidden');

    fireEvent.keyDown(document, { key: 'Escape' });
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
    expect(openButton).toHaveFocus();
    expect(document.body.style.overflow).toBe('');
  });

  it('closes when a link is chosen', async () => {
    const { router } = await renderRoute('/');
    fireEvent.click(screen.getByRole('button', { name: 'Open menu' }));
    const dialog = await screen.findByRole('dialog', { name: 'Site menu' });
    fireEvent.click(within(dialog).getByRole('link', { name: /contact/i }));
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
    expect(router.state.location.pathname).toBe('/contact');
  });
});

describe('Theme toggle', () => {
  it('switches to dark and remembers the choice', async () => {
    await renderRoute('/');
    fireEvent.click(screen.getByRole('button', { name: 'Switch to dark theme' }));
    expect(document.documentElement).toHaveClass('dark');
    expect(localStorage.getItem('theme')).toBe('dark');
    expect(screen.getByRole('button', { name: 'Switch to light theme' })).toBeInTheDocument();
  });
});

describe('Routing', () => {
  it('shows the 404 page for unknown paths', async () => {
    await renderRoute('/does-not-exist');
    expect(screen.getByRole('heading', { level: 1, name: 'Page not found' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /back to home/i })).toHaveAttribute('href', '/');
  });

  it('renders a detail route with a link back to its list', async () => {
    await renderRoute('/projects/mind-scan-analyzer');
    expect(screen.getByRole('link', { name: /all projects/i })).toHaveAttribute('href', '/projects');
  });
});
