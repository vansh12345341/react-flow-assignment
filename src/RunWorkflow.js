import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import api from './api';
import WorkflowModal from './WorkflowModal';

import { createGlobalStyle } from 'styled-components';


const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Roboto', sans-serif; 
  }
`;

const Container = styled.div`
  padding: 40px;
  background-color: #f0f2f5; 
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const FileUploadArea = styled.div`
  border: dashed 2px #007bff;
  padding: 30px;
  width: 80%; 
  text-align: center;
  margin-bottom: 30px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  &:hover {
    border-color: #0056b3;
    background-color: #e7f0fd; 
  }
`;

const StyledButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
  font-size: 16px;
  margin-right: 20px;
  &:hover {
    background-color: #0056b3;
  }
`;

const FileName = styled.span`
  font-size: 16px;
  color: #333;
`;

const WorkflowSelect = styled.select`
  padding: 10px;
  margin-bottom: 20px;
  width: 50%;
  cursor: pointer;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  &:focus {
    border-color: #80bdff;
    outline: none;
    box-shadow: 0 0 0 0.2rem rgba(0,123,255,.25);
  }
`;

const RunButton = styled(StyledButton)`
  background-color: #28a745;
  &:hover {
    background-color: #218838;
  }
`;



const RunWorkflow = () => {
  const [selectedWorkflow, setSelectedWorkflow] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [fileName, setFileName] = useState('');

  const [workflowOptions, setWorkflowOptions] = useState([]);
  const fileInputRef = useRef();
  useEffect(() => {
    const fetchWorkflowIds = async () => {
      try {
        const response = await api.get('/getworkflows');
        setWorkflowOptions(response.data);
      } catch (error) {
        console.error('Error fetching workflow IDs:', error);
      }
    };

    fetchWorkflowIds();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFile(file);
      setFileName(file.name); 
    }
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    setFileName('');
    fileInputRef.current.value = ''; 
  };

  const handleRunWorkflow = async () => {
    if (!uploadedFile || !selectedWorkflow) {
      alert('Please upload a file and select a workflow.');
      return;
    }
    const formData = new FormData();
    formData.append('fileData', uploadedFile);
    formData.append('workflowId', selectedWorkflow);
    
    try {
      setIsProcessing(true);
      const response = await api.post('/execute', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
      });
      setModalMessage('Workflow executed successfully');
      setShowModal(true);
      setIsProcessing(false);
    } catch (error) {
      setIsProcessing(false);
      setModalMessage(`Error running workflow: ${error.message}`);
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <GlobalStyle />
      <Container>
        <FileUploadArea onClick={() => fileInputRef.current.click()}>
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
          <StyledButton>Click to upload a file here</StyledButton>
          {fileName && (
            <>
              <FileName>{fileName}</FileName>
              <StyledButton onClick={handleRemoveFile}>&times;</StyledButton>
            </>
          )}
        </FileUploadArea>

        <WorkflowSelect
          value={selectedWorkflow}
          onChange={(e) => setSelectedWorkflow(e.target.value)}
        >
          {workflowOptions.map((option) => (
            <option key={option.id} value={option.id}>{option.id}</option>
          ))}
        </WorkflowSelect>
        <RunButton onClick={handleRunWorkflow}>
          {isProcessing ?  'Processing' : 'Run Workflow'}
        </RunButton>
      </Container>
      {showModal && <WorkflowModal message={modalMessage} onClose={closeModal} />}
    </>
  )
};

export default RunWorkflow;
