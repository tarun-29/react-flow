import { Handle, Position } from "reactflow";

const MessageNode = (props) => {
  const { data, selected } = props

  return (
    <div className="text-updater-node">
      <div className={`flex flex-col bg-[#fff] ease-in-out shadow-md text-xs rounded-xl ${selected ? "shadow-2xl" : "" }`}>
        <div className="relative py-2 px-16 grow-[1] bg-teal-200 rounded-t-xl">{data.heading}</div>
        <div className="py-2 px-0">{data.label}</div>
      </div>
      <Handle type="source" position={Position.Right} id="b" />
      <Handle type="target" position={Position.Left} id="a" />
    </div>
  );
};

export default MessageNode
