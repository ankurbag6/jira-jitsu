export default function TreeNode({ node, expanded, toggle }) {
    const isOpen = expanded.has(node.id);
    return (<ul>
        <li key={node.id} onClick={() => toggle(node.id)}>
            <button aria-controls="open">{node.name}</button>
        </li>
        {/* if expanded, then show*/}
        {isOpen && node.children && node.children.map((childNode) => <TreeNode node={childNode} expanded={expanded} toggle={toggle} /> )}
    </ul>);

}