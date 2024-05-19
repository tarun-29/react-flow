import { useRef, useState, useEffect } from "react"

const useApp = ()=>{

  // refs
  const flowContainerRef = useRef(null)
  const editNodeTextRef = useRef(null)
  const saveButtonRef = useRef(null)

  // states
  const [selectedNode, setSelectedNode] = useState(null);
  const [nodeName, setNodeName] = useState("Added Node")

  // effects
  useEffect(() => {
    if(selectedNode){
      setNodeName(selectedNode?.data?.label || selectedNode);
    }
  }, [selectedNode, setNodeName]);

  useEffect(()=>{
    if(selectedNode && editNodeTextRef){
      setTimeout(()=>{
        editNodeTextRef.current?.focus()
      },200)
    }
  },[selectedNode, editNodeTextRef])

  const handleSaveButton = ()=>{
    saveButtonRef.current.childFunction();
  }


  return {
    flowContainerRef, 
    editNodeTextRef, 
    saveButtonRef, 
    selectedNode, 
    setSelectedNode, 
    nodeName, 
    setNodeName, 
    handleSaveButton
  }
}

export default useApp