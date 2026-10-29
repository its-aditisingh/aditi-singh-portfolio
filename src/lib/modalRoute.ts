// Modal-route state (docs/02-architecture/routing-and-navigation.md).
// Links from a list put this token in history state. A page refresh creates a new token, so a
// refreshed or shared detail URL renders as a full page instead of a modal over the list.
const SESSION = Math.random().toString(36).slice(2);

export interface ModalState {
  modal: string;
}

export function modalState(): ModalState {
  return { modal: SESSION };
}

export function isModalState(state: unknown): boolean {
  return (
    typeof state === 'object' && state !== null && (state as Partial<ModalState>).modal === SESSION
  );
}
