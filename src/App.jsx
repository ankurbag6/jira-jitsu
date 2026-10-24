import { useFetch } from './hooks/useFetch';
import { mockFetch } from './api/mock';

export default function App() {
  const { status, items, error } = useFetch(
    () => mockFetch([{ id: 1, name: 'Track A' }, { id: 2, name: 'Track B' }]),
    []
  );

  if (status === 'loading' || status === 'idle') return <p>Loading…</p>;
  if (status === 'error') return <p role="alert">{error}</p>;
  if (items.length === 0) return <p>No items</p>;

  return <ul>{items.map((i) => <li key={i.id}>{i.name}</li>)}</ul>;
}