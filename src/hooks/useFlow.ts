// react hooks
import { useEffect, useImperativeHandle, useCallback} from "react";

// flow Props
import type { OnConnect } from "reactflow";

// libs
import { v4 as uuidv4 } from 'uuid';

const useFlow = (props, ref)=>{

  const {setSelectedNode, selectedNode, nodeName, nodes, edges, setNodes, setEdges, addEdge, reactFlowInstance} = props

  const flowArea = ref[0]?.current?.getBoundingClientRect();

  // Helper function to check if all the nodes have source
  function isNodesConnected(nodes, edges) {
    const allNodesIds = nodes.map((node) => node.id);
    const allSourceEdges = edges.map((edge) => edge.source);
    let count = 0;
    for (let i = 0; i < allNodesIds.length; i++) {
      if (!allSourceEdges.includes(allNodesIds[i])) count++;
    }
    console.log(allNodesIds, allSourceEdges);
    if (count >= 2) {
      return false;
    }
    return true;
  }

  // we have used imperative handle hook because we don't have access to node edges in app component
  useImperativeHandle(ref[1], () => ({
    childFunction() {
      if (isNodesConnected(nodes, edges)) alert("Your flow is saved");
      else alert("Error:- Please connect source nodes");
    }
  }));

  useEffect(() => {
    setNodes((nodes) =>
      nodes.map((node) => {
        if (node.id === selectedNode?.id) {
          node.data = {
            ...node.data,
            label: nodeName || node.data.label,
          };
        }
        return node;
      })
    );
  }, [nodeName, setNodes, selectedNode?.id]);

  // helper events
  const onConnect: OnConnect = useCallback(
    (connection) => {
      return setEdges((edges) => {
        let sourceDuplicate
        // Only one source is allowed
        edges.forEach((edge)=>{
          if(edge.target === connection.target){
            sourceDuplicate = true
          }
        })
        if(sourceDuplicate){
          return edges
        }else{
          return addEdge(connection, edges)
        }
      })
    },
    [setEdges, addEdge]
  );

  const onDragOver = (event: DragEvent) => {
    // Necessary to allow to run  handleOnDrop
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const handleOnDrop = (e: DragEvent)=>{
    const type = e.dataTransfer.getData("type");
    const label = e.dataTransfer.getData("message");
    const position = reactFlowInstance.project({
      x: e.clientX - flowArea.left,
      y: e.clientY - flowArea.top,
    });
    const newNode = {
      id: uuidv4(),
      type,
      position,
      data: { heading: "Send Message", label: label },
    };
    setNodes((es) => es.concat(newNode));
    setSelectedNode(newNode);
  }


  return {onConnect, handleOnDrop, onDragOver, setSelectedNode}
}

export default useFlow