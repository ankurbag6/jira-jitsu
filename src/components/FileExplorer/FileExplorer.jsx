import { useState } from "react";
import { tree } from "../../data/tree";
import TreeNode from "./TreeNode";

export function FileExplorer() {
  const [expanded, setExpanded] = useState(() => new Set(["root"]));

  // Make a new Set so React sees a state change and re-renders.
  const toggle = (id) =>
    setExpanded((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  return (
    <nav aria-label="Files">
      <ul>
        <TreeNode node={tree} expanded={expanded} toggle={toggle} />
      </ul>
    </nav>
  );
}
