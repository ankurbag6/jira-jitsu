// Strip the default button look so the folder reads like plain text.
const plainButton = {
  background: "none",
  border: "none",
  padding: 0,
  font: "inherit",
  color: "inherit",
  cursor: "pointer",
};

export default function TreeNode({ node, expanded, toggle }) {
  if (node.type === "file") {
    return (
      <li>
        <span>&#128196;</span> {node.name}
      </li>
    );
  }

  const isOpen = expanded.has(node.id);

  return (
    <li>
      <button
        type="button"
        aria-expanded={isOpen}
        onClick={() => toggle(node.id)}
        style={plainButton}
      >
        <span>{isOpen ? "\u{1F4C2}" : "\u{1F4C1}"}</span> {node.name}
      </button>
      {isOpen && node.children?.length > 0 && (
        <ul>
          {node.children.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              expanded={expanded}
              toggle={toggle}
            />
          ))}
        </ul>
      )}
    </li>
  );
}
