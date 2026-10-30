import type { Stat } from '@/types';

/** 1 → "01" — mono index numbers used across cards and headings. */
export function formatIndex(index: number) {
  return String(index).padStart(2, '0');
}

/** The number part of a stat, e.g. 94.8 with decimals 1 → "94.8". */
export function formatStatNumber(stat: Stat) {
  return stat.value.toFixed(stat.decimals ?? 0);
}

/** Full stat as plain text, e.g. "5+ months" — used for accessible labels. */
export function formatStat(stat: Stat) {
  return `${stat.prefix ?? ''}${formatStatNumber(stat)}${stat.suffix ?? ''}`;
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function dateParts(iso: string) {
  const [year = 0, month, day] = iso.split('-').map(Number);
  return { year, month, day };
}

/** "2026" → "2026", "2025-03" → "Mar 2025", "2026-10-22" → "22 Oct 2026". */
export function formatDate(iso: string) {
  const { year, month, day } = dateParts(iso);
  if (!month) return String(year);
  const name = MONTHS[month - 1] ?? '';
  return day ? `${day} ${name} ${year}` : `${name} ${year}`;
}

/** Month precision only: "2026-01-25" → "Jan 2026". */
export function formatMonthYear(iso: string) {
  const { year, month } = dateParts(iso);
  return month ? `${MONTHS[month - 1] ?? ''} ${year}` : String(year);
}

/** Whole months between two dates, e.g. 2026-01-25 → 2026-06-30 = 5. */
export function monthsBetween(start: string, end: string) {
  const a = dateParts(start);
  const b = dateParts(end);
  let months = (b.year - a.year) * 12 + ((b.month ?? 1) - (a.month ?? 1));
  if ((b.day ?? 1) < (a.day ?? 1)) months -= 1;
  return Math.max(months, 0);
}

export function formatDuration(months: number) {
  if (months < 12) return `${months} month${months === 1 ? '' : 's'}`;
  const years = Math.floor(months / 12);
  const rest = months % 12;
  return `${years} yr${years === 1 ? '' : 's'}${rest ? ` ${rest} mo` : ''}`;
}

/** Duration label for a range, or null when unknown or under a month ("5 months"). */
export function durationLabel(start?: string, end?: string) {
  if (!start || !end) return null;
  const months = monthsBetween(start, end);
  return months >= 1 ? formatDuration(months) : null;
}

/** "Jan 2026 – Jun 2026", "Mar 2025" (end only or same month), "Jan 2026 – Present". */
export function formatRange(start?: string, end?: string) {
  if (start && end && formatMonthYear(start) === formatMonthYear(end)) return formatMonthYear(end);
  if (start && end) return `${formatMonthYear(start)} – ${formatMonthYear(end)}`;
  if (end) return formatMonthYear(end);
  if (start) return `${formatMonthYear(start)} – Present`;
  return '';
}
