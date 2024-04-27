import React from 'react';
import styled from 'styled-components';

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 300px;
  text-align: center;
`;

const CloseButton = styled.button`
  background: #ccc;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  margin-top: 20px;
  cursor: pointer;
  &:hover {
    background: #bbb;
  }
`;

const WorkflowModal = ({ message, onClose }) => {
  return (
    <ModalBackground>
      <ModalContent>
        <p>{message}</p>
        <CloseButton onClick={onClose}>Close</CloseButton>
      </ModalContent>
    </ModalBackground>
  );
};

export default WorkflowModal;
