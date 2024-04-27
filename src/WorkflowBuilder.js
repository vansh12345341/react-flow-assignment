import React, { useState, useCallback, useRef ,useMemo} from 'react';
import api from './api';
import ReactFlow, {
  addEdge,
  Controls,
  Background,
  Handle,
  useNodesState,
  useEdgesState,
  ReactFlowProvider
} from 'reactflow';
import 'reactflow/dist/style.css';
import styled from 'styled-components';

const Sidebar = styled.aside`
  width: 250px;
  height: calc(100vh - 45px); 
  position: absolute;
  top: 45px;
  left: 0;
  background-color: #ffffff;
  padding: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  z-index: 100;
`;

const SidebarNode = styled.div`
  padding: 10px;
  border: 1px solid #ccc;
  background-color: #f7f7f7;
  cursor: pointer;
  margin-top: 10px;
  margin-bottom: 10px;
  transition: background-color 0.3s, box-shadow 0.3s;

  &:hover {
    background-color: #e2e2e2;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  }
`;

const SaveButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 30px;

  &:hover {
    background-color: #0056b3;
  }
`;


const CustomNodeComponent = ({ id, data }) => {
  return (
    <div style={{ background: '#fff', padding: '10px', border: '1px solid #ddd', position: 'relative' }}>
      <Handle type="target" position="top" style={{ borderRadius: 0 }} />
      <div>{data.label}</div>
      <Handle type="source" position="bottom" style={{ borderRadius: 0 }} />
    </div>
  );
};

const nodeTypes = {
  customNode: CustomNodeComponent,
};

const WorkflowBuilder = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const onConnect = useCallback((connection) => setEdges((eds) => addEdge(connection, eds)), [setEdges]);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback((event) => {
    event.preventDefault();
    if (reactFlowWrapper.current && reactFlowInstance) {
      const type = event.dataTransfer.getData('application/reactflow');
      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowWrapper.current.getBoundingClientRect().left,
        y: event.clientY - reactFlowWrapper.current.getBoundingClientRect().top,
      });

      const newNode = {
        id: String(new Date().getTime()),
        type: 'customNode',
        position,
        data: { label: `${type} node` },
      };

      setNodes((nds) => nds.concat(newNode));

    }
  }, [reactFlowInstance, setNodes]);

  

  const nodeTypes = useMemo(() => ({
    customNode: (nodeData) => <CustomNodeComponent {...nodeData} />,
  }), []); 

  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  const onSaveWorkflow = useCallback(async () => {
    if (reactFlowInstance) {
      const flow = reactFlowInstance.toObject();

      try {
        const response = await api.post('/workflows', flow);
        alert(`Workflow saved! ID: ${response.data.id}`);
      } catch (error) {
        console.error('Error saving workflow:', error);
        alert('Failed to save workflow.');
      }
    }
  }, [reactFlowInstance]);

  return (
    <div className="dndflow" style={{ height: '100vh' }}>
      <ReactFlowProvider>
        <Sidebar>
          <h1>Workflow Nodes</h1>
          <SidebarNode onDragStart={(event) => onDragStart(event, 'Start')} draggable>Start</SidebarNode>
          <SidebarNode onDragStart={(event) => onDragStart(event, 'Filter Data')} draggable>Filter Data</SidebarNode>
          <SidebarNode onDragStart={(event) => onDragStart(event, 'Wait')} draggable>Wait</SidebarNode>
          <SidebarNode onDragStart={(event) => onDragStart(event, 'Convert Format')} draggable>Convert Format</SidebarNode>
          <SidebarNode onDragStart={(event) => onDragStart(event, 'Send POST Request')} draggable>Send POST Request</SidebarNode>
          <SidebarNode onDragStart={(event) => onDragStart(event, 'End')} draggable>END</SidebarNode>
        </Sidebar>
        <div className="reactflow-wrapper" ref={reactFlowWrapper} style={{ width: 'calc(100vw - 250px)', height: '100vh', position: 'absolute', right: 0 }}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDragOver={onDragOver}
            onDrop={onDrop}
            nodeTypes={nodeTypes}
          >
            <Background />
            <Controls />
          </ReactFlow>
        </div>
        <SaveButton onClick={onSaveWorkflow}>Save Workflow</SaveButton>
      </ReactFlowProvider>
    </div>
  );
};

export default WorkflowBuilder;
