export default function TreeNodeAPIVersion({
  nodes = [],
  expanded,
  childrenById,
  toggle,
  statusById = {},
}) {
  return (
    <>
      {nodes.map((node) => {
        const status = statusById[node.id];
        const isFolder = node.type === "folder";

        return (
          <li key={node.id} style={{ listStyleType: "none", padding: 0 }}>
            {isFolder ? (
              <button
                type="button"
                aria-expanded={expanded.has(node.id)}
                onClick={() => toggle(node.id)}
                style={{
                  background: "none",
                  border: "none",
                  padding: 0,
                  margin: 0,
                  font: "inherit",
                  color: "inherit",
                  textAlign: "left",
                  cursor: "pointer",
                }}
              >
                <span aria-hidden="true">📁</span> {node.name}
                {status === "loading" && <small> Loading…</small>}
                {status === "error" && <small> Error, click to retry</small>}
              </button>
            ) : (
              <span>
                <span aria-hidden="true">📄</span> {node.name}
              </span>
            )}

            {expanded.has(node.id) && childrenById[node.id] && (
              <ul>
                <TreeNodeAPIVersion
                  nodes={childrenById[node.id]}
                  expanded={expanded}
                  childrenById={childrenById}
                  toggle={toggle}
                  statusById={statusById}
                />
              </ul>
            )}
          </li>
        );
      })}
    </>
  );
}
