import { neighbours, sortByDate } from './collections';
import { formatDate, formatDuration, formatRange, monthsBetween } from './format';

describe('format', () => {
  it('formats partial ISO dates', () => {
    expect(formatDate('2026')).toBe('2026');
    expect(formatDate('2025-03')).toBe('Mar 2025');
    expect(formatDate('2026-10-22')).toBe('22 Oct 2026');
  });

  it('counts whole months', () => {
    expect(monthsBetween('2026-01-25', '2026-06-30')).toBe(5);
    expect(monthsBetween('2026-01-25', '2026-06-20')).toBe(4);
    expect(formatDuration(5)).toBe('5 months');
    expect(formatDuration(1)).toBe('1 month');
    expect(formatDuration(14)).toBe('1 yr 2 mo');
  });

  it('formats ranges with missing ends', () => {
    expect(formatRange('2026-01-25', '2026-06-30')).toBe('Jan 2026 – Jun 2026');
    expect(formatRange(undefined, '2025-03')).toBe('Mar 2025');
    expect(formatRange('2026-01-25')).toBe('Jan 2026 – Present');
  });
});

describe('collections', () => {
  const items = [
    { slug: 'a', date: '2025-03' },
    { slug: 'b', date: undefined },
    { slug: 'c', date: '2026-10-22' },
  ];

  it('sorts by date with undated items last in both orders', () => {
    expect(sortByDate(items, (i) => i.date, 'newest').map((i) => i.slug)).toEqual(['c', 'a', 'b']);
    expect(sortByDate(items, (i) => i.date, 'oldest').map((i) => i.slug)).toEqual(['a', 'c', 'b']);
  });

  it('wraps prev/next around the ends', () => {
    expect(neighbours(items, 'a')).toEqual({ prev: items[2], next: items[1] });
    expect(neighbours(items, 'missing')).toEqual({ prev: undefined, next: undefined });
  });

  it('offers only "next" when there are two items (prev would repeat it)', () => {
    const two = items.slice(0, 2);
    expect(neighbours(two, 'a')).toEqual({ prev: undefined, next: two[1] });
    expect(neighbours(two, 'b')).toEqual({ prev: undefined, next: two[0] });
  });
});
