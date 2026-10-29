import type { MouseEvent } from 'react';
import { Link, type LinkProps } from 'react-router-dom';
import { setModalOrigin } from '@/lib/modalOrigin';
import { modalState } from '@/lib/modalRoute';

/**
 * Link from a list card to its detail: opens as a modal over the list, without scrolling the list.
 * Remembers the card's position so the modal can grow out of it (container transform).
 */
export function DetailLink({ onClick, ...props }: Omit<LinkProps, 'state' | 'preventScrollReset'>) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    setModalOrigin(event.currentTarget.getBoundingClientRect());
    onClick?.(event);
  };

  return <Link {...props} onClick={handleClick} state={modalState()} preventScrollReset />;
}
