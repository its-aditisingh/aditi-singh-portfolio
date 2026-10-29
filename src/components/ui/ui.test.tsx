import { useState } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { FilterTabs } from './FilterTabs';

function Harness() {
  const [value, setValue] = useState<'all' | 'cloud'>('all');
  return (
    <FilterTabs
      label="Filter certificates by category"
      value={value}
      onChange={setValue}
      items={[
        { value: 'all', label: 'All', count: 14 },
        { value: 'cloud', label: 'Cloud', count: 1 },
      ]}
    />
  );
}

describe('FilterTabs', () => {
  it('marks the active tab and switches on click', () => {
    render(<Harness />);
    const all = screen.getByRole('button', { name: /all/i });
    const cloud = screen.getByRole('button', { name: /cloud/i });
    expect(all).toHaveAttribute('aria-pressed', 'true');
    expect(cloud).toHaveAttribute('aria-pressed', 'false');

    fireEvent.click(cloud);
    expect(cloud).toHaveAttribute('aria-pressed', 'true');
    expect(all).toHaveAttribute('aria-pressed', 'false');
  });
});
