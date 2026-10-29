import { fireEvent, screen, waitFor, within } from '@testing-library/react';
import { WEB3FORMS_ENDPOINT } from '@/lib/contact';
import { renderRoute } from '@/test/renderRoute';

const ok = () =>
  Promise.resolve({ ok: true, status: 200, json: async () => ({ success: true }) } as Response);
const fail = () =>
  Promise.resolve({
    ok: false,
    status: 400,
    json: async () => ({ success: false, message: 'Invalid access key' }),
  } as Response);

// Scope to the form: the footer's email icon is also labelled "Email"
const form = () => screen.getByRole('form', { name: 'Contact form' });
const field = (label: string) => within(form()).getByLabelText(new RegExp(`^${label}`));

function fill(values: Partial<Record<'Name' | 'Email' | 'Subject' | 'Message', string>>) {
  for (const [label, value] of Object.entries(values)) {
    const input = field(label);
    fireEvent.change(input, { target: { value } });
    fireEvent.blur(input);
  }
}

const valid = { Name: 'Priya Sharma', Email: 'priya@example.edu', Message: 'Hello! We have an opening.' };
const submit = () => fireEvent.click(within(form()).getByRole('button', { name: /send message/i }));

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

describe('Contact without a Web3Forms key', () => {
  it('hides the form and offers email instead', async () => {
    vi.stubEnv('VITE_WEB3FORMS_KEY', '');
    await renderRoute('/contact');
    expect(screen.queryByRole('form', { name: 'Contact form' })).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: /email aditi/i })).toHaveAttribute(
      'href',
      'mailto:adytisingh@gmail.com',
    );
  });
});

describe('Contact form (docs/03-features/07-contact.md)', () => {
  beforeEach(() => vi.stubEnv('VITE_WEB3FORMS_KEY', 'test-key'));

  it('shows the contact details, without a phone number', async () => {
    await renderRoute('/contact');
    const details = screen.getByRole('list', { name: 'Contact details' });
    expect(within(details).getByRole('link', { name: 'adytisingh@gmail.com' })).toBeInTheDocument();
    expect(within(details).getByRole('button', { name: 'Copy' })).toBeInTheDocument();
    expect(details).not.toHaveTextContent(/\+91/);
  });

  it('blocks an invalid submit, shows inline errors and focuses the first invalid field', async () => {
    const fetchMock = vi.fn(ok);
    vi.stubGlobal('fetch', fetchMock);
    await renderRoute('/contact');

    fill({ Email: 'not-an-email' });
    submit();

    const name = field('Name');
    expect(name).toHaveFocus();
    expect(name).toHaveAttribute('aria-invalid', 'true');
    expect(name).toHaveAccessibleDescription('Please enter your name.');
    expect(field('Email')).toHaveAccessibleDescription('Please enter a valid email address.');
    expect(screen.getByText('Message should be at least 10 characters.')).toBeInTheDocument();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('sends a valid message to Web3Forms and resets afterwards', async () => {
    const fetchMock = vi.fn(ok);
    vi.stubGlobal('fetch', fetchMock);
    await renderRoute('/contact');

    fill(valid);
    submit();

    expect(await screen.findByRole('button', { name: /message sent/i })).toBeDisabled();
    expect(screen.getByText(/your message has been sent/i)).toBeInTheDocument();

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toBe(WEB3FORMS_ENDPOINT);
    expect(JSON.parse(init.body as string)).toEqual({
      access_key: 'test-key',
      name: 'Priya Sharma',
      email: 'priya@example.edu',
      subject: 'New message from Priya Sharma via portfolio',
      message: 'Hello! We have an opening.',
      from_name: 'Portfolio contact form',
    });

    await waitFor(() => expect(field('Name')).toHaveValue(''), { timeout: 3000 });
    // the button label crossfades between states, so wait for it
    expect(await within(form()).findByRole('button', { name: /send message/i })).toBeEnabled();
  });

  it('ignores a second submit while sending', async () => {
    let resolve: (value: Response) => void = () => {};
    const fetchMock = vi.fn(() => new Promise<Response>((r) => (resolve = r)));
    vi.stubGlobal('fetch', fetchMock);
    await renderRoute('/contact');

    fill(valid);
    submit();
    expect(await screen.findByRole('button', { name: /sending/i })).toBeDisabled();
    fireEvent.submit(form());
    expect(fetchMock).toHaveBeenCalledTimes(1);

    resolve({ ok: true, status: 200, json: async () => ({ success: true }) } as Response);
    expect(await screen.findByRole('button', { name: /message sent/i })).toBeInTheDocument();
  });

  it('explains a failure, offers email and lets the visitor retry', async () => {
    const fetchMock = vi.fn(fail);
    vi.stubGlobal('fetch', fetchMock);
    await renderRoute('/contact');

    fill(valid);
    submit();

    expect(await screen.findByText(/couldn't send right now/i)).toBeInTheDocument();
    const retry = await within(form()).findByRole('button', { name: /try again/i });
    expect(retry).toBeEnabled();

    fetchMock.mockImplementation(ok);
    fireEvent.click(retry);
    expect(await screen.findByRole('button', { name: /message sent/i })).toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it('silently "succeeds" without sending when the honeypot is ticked', async () => {
    const fetchMock = vi.fn(ok);
    vi.stubGlobal('fetch', fetchMock);
    await renderRoute('/contact');

    fill(valid);
    fireEvent.click(form().querySelector('input[name="botcheck"]') as HTMLInputElement);
    submit();

    expect(await screen.findByRole('button', { name: /message sent/i })).toBeInTheDocument();
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
