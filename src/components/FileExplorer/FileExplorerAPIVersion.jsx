import { useState } from "react";
import { tree } from "../../data/tree";
import TreeNode from "./TreeNode";
import TreeNodeAPIVersion from "./TreeNodeAPIVersion";
import { useFetch } from "../../hooks/useFetch";
import { getChildren } from "../../api/server";

/**
Plan:
1. 
useFetch -> get the partial data for folders
 - on init load the data for  mockFetch("root")
2. Implement click handler to make a call to api to get data for the 
subscequent node
 */
export function FileExplorerAPIVersion() {
  const [expanded, setExpanded] = useState(() => new Set(["root"]));
  const [childrenById, setChildrenById] = useState({}); // { "1": [...], "3": [...] }
  const [statusById, setStatusById] = useState({}); // id -> 'loading' | 'error' | 'success'

  const { status, items, error } = useFetch(() => getChildren("root"), []);

  // Make a new Set so React sees a state change and re-renders.
  const toggle = async (id) => {
    const opening = !expanded.has(id);

    setExpanded((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

    if (!opening || childrenById[id] || statusById[id] === "loading") return; // already loaded, don't fetch again
    setStatusById((prev) => ({ ...prev, [id]: "loading" }));
    try {
      const kids = await getChildren(id); // plain function call, not a hook
      setChildrenById((prev) => ({ ...prev, [id]: kids }));
      setStatusById((prev) => ({ ...prev, [id]: "success" }));
    } catch (err) {
      console.error("failed to load", id, err);
      setStatusById((prev) => ({ ...prev, [id]: "error" }));
    }
  };

  if (status === "idle" || status === "loading")
    return <p role="status">Loading…</p>;
  if (status === "error") return <p role="alert">{error}</p>;
  return (
    <nav aria-label="Files">
      <ul>
        <TreeNodeAPIVersion
          nodes={items}
          expanded={expanded}
          childrenById={childrenById}
          toggle={toggle}
          statusById={statusById}
        />
      </ul>
    </nav>
  );
}
