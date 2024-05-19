/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import { forwardRef } from "react";

// react flow nodes and edges
import {
  Background,
  ReactFlow,
  addEdge,
  useNodesState,
  useEdgesState,
  ReactFlowProvider,
  useReactFlow
} from "reactflow";

import { initialNodes } from "./nodes";
import { initialEdges, edgeTypes } from "./edges";

// hooks
import useFlow from "./hooks/useFlow";

// components
import ComponentPanel from "./components/ComponentPanel/ComponentPanel";
import MessageNode from "./components/CustomNode/Node";

// styles
import "reactflow/dist/style.css";
import useApp from "./hooks/useApp";

// we have extracted this Flow logic in new component
// read this for more
// https://reactflow.dev/api-reference/types/react-flow-instance

const nodeTypes = { node: MessageNode };

const Flow = forwardRef((props, ref)=>{

  // flow hooks
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const reactFlowInstance = useReactFlow()

  // global hooks
  const {
    onConnect, 
    handleOnDrop, 
    onDragOver, 
    setSelectedNode
  } = useFlow({...props, nodes, edges, setNodes, setEdges, addEdge, reactFlowInstance}, ref)

  return <ReactFlow
    nodes={nodes}
    nodeTypes={nodeTypes}
    onNodesChange={onNodesChange}
    edges={edges}
    edgeTypes={edgeTypes}
    onEdgesChange={onEdgesChange}
    onConnect={onConnect}
    fitView
    onDrop={handleOnDrop}
    onDragOver={onDragOver}
    onNodeDoubleClick={(e, node)=>{
      setSelectedNode(node)
    }}
  >
    <Background />
  </ReactFlow>
})

export default function App() {

  // hooks
  const {
    flowContainerRef, 
    editNodeTextRef, 
    saveButtonRef, 
    selectedNode, 
    setSelectedNode, 
    nodeName, 
    setNodeName, 
    handleSaveButton}  = useApp()

  return (
    <>
    <div className="flex bg-sky-100 justify-between">
      <span className="ml-10">App Name:- Message flow builder</span>
      <button onClick={()=>{
        handleSaveButton()
      }} className="mr-10">Save Button</button>
    </div>
    <div className="flex h-screen w-screen">
      {/* provider is needed to access all the hooks which in react flow */}
      <ReactFlowProvider>
        <div className="h-full w-full" ref={flowContainerRef}>
        <Flow ref={[flowContainerRef, saveButtonRef]} nodeName={nodeName} selectedNode={selectedNode} setSelectedNode={setSelectedNode}/>
        </div>
      </ReactFlowProvider>
      <ComponentPanel nodeName={nodeName} setNodeName={setNodeName} selectedNode={selectedNode} setSelectedNode={setSelectedNode} ref = {editNodeTextRef}/>
    </div>
    </>
  );
}
