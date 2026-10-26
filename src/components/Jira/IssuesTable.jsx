import { issues } from "../../data/issues";
import { useFetch } from "../../hooks/useFetch";
import { mockFetch } from "../../api/mock";
import { useState, useMemo } from "react";

function compareRows(a, b, key, dir) {
  const x = a[key];
  const y = b[key];
  if (x == null && y == null) return 0;
  if (x == null) return 1; // nulls last, in both directions
  if (y == null) return -1;
  const result =
    typeof x === "number" ? x - y : String(x).localeCompare(String(y));
  return dir === "asc" ? result : -result;
}

export default function IssuesTable() {
  const [sort, setSort] = useState({ key: null, dir: "asc" });
  const { status, items, error } = useFetch(() => mockFetch(issues, 1000), []);

  const columns = [
    { key: "id", label: "Key" },
    { key: "title", label: "Summary" },
    { key: "status", label: "Status" },
    { key: "priority", label: "Priority" },
    { key: "assignee", label: "Assignee" },
    { key: "updated", label: "Updated" },
  ];

  function handleSort(key) {
    setSort((s) =>
      s.key === key
        ? { key, dir: s.dir === "asc" ? "desc" : "asc" }
        : { key, dir: "asc" },
    );
  }
  const sortedItems = useMemo(() => {
    if (!sort.key) return items;
    return [...items].sort((a, b) => compareRows(a, b, sort.key, sort.dir));
  }, [items, sort]);

  if (status === "loading") return <p role="status">Loading...</p>;
  if (status === "error")
    return (
      <p role="alert" style={{ color: "red" }}>
        Error:{error}
      </p>
    );

  return (
    <>
      <table>
        <tbody>
          {sortedItems && sortedItems.length > 0}
          <tr>
            {columns.map(({ key, label }) => (
              <th key={key}>
                {label} <button onClick={() => handleSort(key)}>Sort</button>
              </th>
            ))}
          </tr>
          {sortedItems.map((issue) => (
            <tr key={issue.id}>
              <td>{issue.id}</td>
              <td>{issue.title}</td>
              <td>{issue.status}</td>
              <td>{issue.priority}</td>
              <td>{issue.assignee === null ? "" : issue.assignee}</td>
              <td>{issue.updated}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
