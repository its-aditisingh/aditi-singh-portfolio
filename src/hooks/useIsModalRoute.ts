import { useLocation } from 'react-router-dom';
import { isModalState } from '@/lib/modalRoute';

/** True when the current detail route was opened from its list (render as a modal). */
export function useIsModalRoute() {
  return isModalState(useLocation().state);
}
