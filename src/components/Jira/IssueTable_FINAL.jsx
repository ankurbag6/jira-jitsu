import { useEffect, useMemo, useState } from 'react';
import { mockFetch } from '../api/mock';
import { issues } from '../data/issues';

const columns = [
  { key: 'id', label: 'Key' },
  { key: 'title', label: 'Summary' },
  { key: 'status', label: 'Status' },
  { key: 'priority', label: 'Priority' },
  { key: 'assignee', label: 'Assignee', fallback: 'Unassigned' },
  { key: 'updated', label: 'Updated' },
];

function compareRows(a, b, key, dir) {
  const x = a[key];
  const y = b[key];
  if (x == null && y == null) return 0;
  if (x == null) return 1; // nulls last, both directions
  if (y == null) return -1;
  const result = typeof x === 'number' ? x - y : String(x).localeCompare(String(y));
  return dir === 'asc' ? result : -result;
}

export function IssueTable() {
  // --- fetch state ---
  const [status, setStatus] = useState('loading');
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [attempt, setAttempt] = useState(0); // bump to retry

  // --- sort state ---
  const [sort, setSort] = useState({ key: null, dir: 'asc' });

  useEffect(() => {
    let ignore = false;
    setStatus('loading');

    mockFetch(issues)
      .then((data) => {
        if (!ignore) {
          setItems(data);
          setStatus('success');
        }
      })
      .catch((err) => {
        if (!ignore) {
          setError(err.message);
          setStatus('error');
        }
      });

    return () => {
      ignore = true;
    };
  }, [attempt]);

  function handleSort(key) {
    setSort((s) =>
      s.key === key ? { key, dir: s.dir === 'asc' ? 'desc' : 'asc' } : { key, dir: 'asc' }
    );
  }

  // derived, not stored; hooks stay above the early returns
  const sortedItems = useMemo(() => {
    if (!sort.key) return items;
    return [...items].sort((a, b) => compareRows(a, b, sort.key, sort.dir));
  }, [items, sort]);

  // --- render states ---
  if (status === 'loading') return <p role="status">Loading issues…</p>;

  if (status === 'error') {
    return (
      <div role="alert">
        <p>Couldn't load issues: {error}</p>
        <button type="button" onClick={() => setAttempt((n) => n + 1)}>
          Retry
        </button>
      </div>
    );
  }

  if (items.length === 0) return <p>No issues yet.</p>;

  return (
    <table>
      <caption>Issues</caption>
      <thead>
        <tr>
          {columns.map((c) => {
            const active = sort.key === c.key;
            return (
              <th
                key={c.key}
                scope="col"
                aria-sort={active ? (sort.dir === 'asc' ? 'ascending' : 'descending') : 'none'}
              >
                <button type="button" onClick={() => handleSort(c.key)}>
                  {c.label}{' '}
                  <span aria-hidden="true">{active ? (sort.dir === 'asc' ? '▲' : '▼') : ''}</span>
                </button>
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {sortedItems.map((row) => (
          <tr key={row.id}>
            {columns.map((c) => (
              <td key={c.key}>{row[c.key] ?? c.fallback ?? ''}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}