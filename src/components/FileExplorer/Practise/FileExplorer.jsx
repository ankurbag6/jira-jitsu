/**
 Problem :
 Expand/collapse works, 
 lazy load caches, 
 error and Retry work, 
 empty folder handled, <button> with aria-expanded

 Plan - 
 1 .FE component -> data in state, passes down to TreeNode component
 2. TreeNode is a recursive component
  - if folder then recurse
 3. Apply Aria labels

 STATE : isOpen, expand
 DERIVED : 
 EVENTS : click -> expand
 */
import { useState } from "react";
import { tree } from "../../../data/tree";
import TreeNode from "./TreeNode";
export default function FileExplorer() {
  const [expanded, setExpanded] = useState(()=> new Set(["root"]));
  const toggle = (id) => { 
    const newset = new Set([...expanded]);
    if(newset.has(id)) 
      newset.delete(id) 
    else newset.add(id)
    setExpanded(newset) 
  }
  return (<section aria-label="File Explorer">
    <TreeNode node={tree} expanded={expanded} toggle={toggle}/>
  </section>);
}
