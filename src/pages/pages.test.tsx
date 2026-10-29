import { fireEvent, screen, waitFor, within } from '@testing-library/react';
import { currentlyLearning } from '@/data/skills';
import { journey } from '@/data/journey';
import { renderRoute } from '@/test/renderRoute';

describe('Home (docs/03-features/01-home.md)', () => {
  beforeEach(async () => {
    await renderRoute('/');
  });

  it('shows name, roles, headline and career objective', async () => {
    expect(screen.getByRole('heading', { level: 1, name: 'Aditi Singh' })).toBeInTheDocument();
    expect(screen.getByText(/Aspiring Assistant Professor, AI\/ML Engineer/)).toBeInTheDocument();
    expect(screen.getByText('MCA · AI/ML & Data Science')).toBeInTheDocument();
    expect(screen.getByText(/I aim to teach Computer Science/)).toBeInTheDocument();
    expect(screen.getByText('Open to Assistant Professor & AI/ML roles')).toBeInTheDocument();
  });

  it('has the Get In Touch and resume CTAs', async () => {
    const hero = screen.getByRole('region', { name: 'Aditi Singh' });
    expect(within(hero).getByRole('link', { name: /get in touch/i })).toHaveAttribute(
      'href',
      '/contact',
    );
    expect(within(hero).getByRole('link', { name: /download resume/i })).toHaveAttribute(
      'href',
      '/resume/Aditi-Singh-Resume.pdf',
    );
  });

  it('loads the portrait eagerly with a srcset', async () => {
    const photo = screen.getByRole('img', { name: /portrait of aditi singh/i });
    expect(photo).toHaveAttribute('loading', 'eager');
    expect(photo.getAttribute('srcset')).toMatch(/480w.*800w/);
  });

  it('shows the stats with final values', async () => {
    const stats = screen.getByRole('region', { name: 'Highlights' });
    // The accessible value lives in the sr-only span; the visible number is aria-hidden
    for (const value of ['95%', '94.8%', '14', '5+ months']) {
      expect(within(stats).getByText(value, { selector: '.sr-only' })).toBeInTheDocument();
    }
  });

  it('links every section from the explore grid', async () => {
    const explore = screen.getByRole('region', { name: 'Find your way around' });
    expect(within(explore).getAllByRole('link')).toHaveLength(6);
  });
});

describe('About (docs/03-features/02-about.md)', () => {
  it('shows both degrees with their scores', async () => {
    await renderRoute('/about');
    expect(screen.getByRole('heading', { level: 1, name: 'About me' })).toBeInTheDocument();
    const mca = screen.getByRole('region', { name: 'Education · 2024–2026' });
    const bca = screen.getByRole('region', { name: 'Education · 2021–2024' });
    expect(mca).toHaveTextContent('MCA');
    expect(mca).toHaveTextContent('95%');
    expect(bca).toHaveTextContent('94.8%');
  });

  it('lists every technical skill group', async () => {
    await renderRoute('/about');
    const skills = screen.getByRole('region', { name: 'Technical skills' });
    for (const group of ['AI / ML', 'Programming', 'Web', 'Database', 'BI & Tools', 'Cloud']) {
      expect(within(skills).getByRole('heading', { name: group })).toBeInTheDocument();
    }
  });

  it('expands "Currently learning" to show every item', async () => {
    await renderRoute('/about');
    const learning = screen.getByRole('region', { name: 'Currently learning' });
    expect(within(learning).getAllByRole('heading', { level: 3 })).toHaveLength(4);

    const toggle = within(learning).getByRole('button', {
      name: `Show all ${currentlyLearning.length}`,
    });
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    expect(within(learning).getAllByRole('heading', { level: 3 })).toHaveLength(
      currentlyLearning.length,
    );
  });

  it('renders the full journey timeline', async () => {
    await renderRoute('/about');
    const section = screen.getByRole('region', { name: 'From BCA to the classroom' });
    expect(within(section).getAllByRole('listitem')).toHaveLength(journey.length);
    expect(
      within(section).getByRole('link', { name: /National GOER 2025 Finalist/ }),
    ).toHaveAttribute('href', '/achievements/goer-2025-national-finalist');
  });

  it('scrolls to #education when linked directly', async () => {
    const scrollSpy = vi.mocked(Element.prototype.scrollIntoView);
    scrollSpy.mockClear();
    await renderRoute('/about#education');
    await waitFor(() => expect(scrollSpy).toHaveBeenCalled());
    expect(scrollSpy.mock.contexts[0]).toHaveAttribute('id', 'education');
  });
});
