/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { DragEvent, forwardRef, useCallback } from "react"


const ComponentPanel = forwardRef<HTMLInputElement, any>((props, ref)=>{
  const { selectedNode, setSelectedNode, nodeName, setNodeName } = props

  // refernce article https://medium.com/the-andela-way/react-drag-and-drop-7411d14894b9
  // if anyone want to understand what happening here 
  const handleDragEvent = useCallback((event:DragEvent, type: string, message: string)=>{
    event.dataTransfer.setData("type", type);
    event.dataTransfer.setData("message", message);
    event.dataTransfer.effectAllowed = "copyMove";
  },[])


  return(
    <div className="w-80">
      {selectedNode ? <input 
          onBlur={()=>{setSelectedNode()}} 
          placeholder="Please type message" 
          value={nodeName}
          onChange={(e) => setNodeName(e.target.value)}
          ref={ref}/> :  
        <div
          className="h-16 m-2 bg-orange-100		border-slate-200"
          onDragStart={(event) => handleDragEvent(event, "node", "type message")}
          draggable
        >
        Message Component
      </div>}
    </div>
  )
})

export default ComponentPanel