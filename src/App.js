import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import WorkflowBuilder from './WorkflowBuilder';
import RunWorkflow from './RunWorkflow';
import styled from 'styled-components';

const NavigationBar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #007bff;  // A nice blue background
  color: white;
  padding: 10px 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

const NavigationLink = styled(Link)`
  color: white;
  padding: 8px 16px;
  margin: 0 10px;
  text-decoration: none;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;  // Darker blue on hover for better user feedback
    border-radius: 4px;
  }
`;

const App = () => {
  return (
    <Router>
      <NavigationBar>
        <NavigationLink to="/">Create Workflow</NavigationLink>
        <NavigationLink to="/run">Run Workflow</NavigationLink>
      </NavigationBar>
      <Routes>
        <Route exact path="/" element={<WorkflowBuilder />} />
        <Route path="/run" element={<RunWorkflow />} />
      </Routes>
    </Router>
  );
};

export default App;
