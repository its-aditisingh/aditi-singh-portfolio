import { Fragment, type ReactNode } from 'react';
import { useOutlet } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useIsModalRoute } from '@/hooks/useIsModalRoute';

/**
 * Wraps a list page whose detail routes are nested children.
 * - list only:            the list
 * - detail from the list: the list + the detail as a modal (exit animation via AnimatePresence)
 * - detail directly:      only the detail, as a full page
 */
export function CollectionRoute({ children }: { children: ReactNode }) {
  const outlet = useOutlet();
  const isModal = useIsModalRoute();

  if (outlet && !isModal) return outlet;

  return (
    <>
      {children}
      <AnimatePresence>{outlet && <Fragment key="detail">{outlet}</Fragment>}</AnimatePresence>
    </>
  );
}
