import { createContext, useContext } from 'react';

export interface DetailContextValue {
  mode: 'modal' | 'page';
  titleId: string;
}

export const DetailContext = createContext<DetailContextValue>({ mode: 'page', titleId: '' });

export function useDetailContext() {
  return useContext(DetailContext);
}

/**
 * Heading tag for content `depth` levels below the detail title: the title is h1 as a page and
 * h2 in the modal (the list keeps its h1), so sub-headings shift with it (axe: heading-order).
 */
export function useSubheading(depth: 1 | 2 = 1): 'h2' | 'h3' | 'h4' {
  const { mode } = useDetailContext();
  const level = (mode === 'modal' ? 2 : 1) + depth;
  return `h${level}` as 'h2' | 'h3' | 'h4';
}
