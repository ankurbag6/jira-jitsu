/**
 Plan :
 1. iterte over issuesdata, print in a table
 
 STATE
 DERIVED
 EVENTS
 A11y: aria-label, aria-sort
 */
import { issues } from "../../../data/issues";
import { useMemo, useState } from "react";
function compareRows(a, b, key, dir) {
    const x = a[key];
  const y = b[key];
  if (x == null && y == null) return 0;
  if (x == null) return 1; // nulls last, both directions
  if (y == null) return -1;
  const result = typeof x === 'number' ? x - y : String(x).localeCompare(String(y));
  return dir === 'asc' ? result : -result;
}
export default function IssuesTable() {
const [sortKey , setSortKey] = useState({ key: null, dir: "asc" });
const sortedIssues = useMemo(() => {
    if(sortKey.key === null) return issues;

    return [...issues].sort((a, b) => compareRows(a, b, sortKey.key, sortKey.dir))

}, [issues, sortKey]);
  const columns = [
    { key: "id", label: "Key" },
    { key: "title", label: "Summary" },
    { key: "status", label: "Status" },
    { key: "priority", label: "Priority" },
    { key: "assignee", label: "Assignee" },
    { key: "updated", label: "Updated" },
  ];

  const handleSort = (key) => {
    // set Sort key and dir
    const newSortKey = {...sortKey}
    newSortKey.key = key;
    newSortKey.dir = newSortKey.dir === "asc" ? "desc" : "asc";
    setSortKey(newSortKey);
  }
  return (
    <table aria-label="Issues">
      <tbody>
        {columns.map(({ key, label }) => {
        const active = sortKey.key === key;
        return( 
          <th key={key} aria-label={"Column " + label}>
            {label} <button onClick={() => handleSort(key)}>{active ? (sortKey.dir=="asc" ? "⬆️" : "⬇️") : '' } </button>
          </th>
        )
        })}
        {sortedIssues.map((issue) => (
          <tr key={issue.id}>
            <td>{issue.id}</td>
            <td>{issue.title}</td>
            <td>{issue.status}</td>
            <td>{issue.priority}</td>
            <td>{issue.assignee}</td>
            <td>{issue.updated}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
