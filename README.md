# Workflow Builder and Runner
The Workflow Builder and Runner is a React-based web application that allows users to visually create and execute workflows. This tool offers an intuitive drag-and-drop interface for building workflows and a simple execution environment where users can upload files to run through their configured workflows.
Sample screen:
![image](https://github.com/vansh12345341/react-flow-assignment/assets/57994031/0cea302c-b387-4f09-8712-078d027a88be)
![image](https://github.com/vansh12345341/react-flow-assignment/assets/57994031/1e9ca34f-23e6-4a67-a793-b8f60aa16019)
![image](https://github.com/vansh12345341/react-flow-assignment/assets/57994031/8bda0b1c-fc90-4e20-8a14-ee2eb579af88)




# Features
Workflow Builder: Create workflows by dragging and dropping nodes that represent different operations or tasks.
Workflow Runner: Upload files and select a workflow to execute with real-time status updates and modal notifications on completion or errors.
Dynamic Workflow Management: Fetch and display workflows created and stored in a backend server.
Responsive UI: Modern React UI using Styled Components for a flexible, styled component approach.
# Technology Stack
React: Frontend library for building the user interface.
Styled Components: For styling the application using CSS in JS.
React Router: For navigation between the workflow creation and execution components.
Axios: For making HTTP requests to the backend server.
React Flow: For implementing the drag-and-drop workflow builder.
Setup and Installation
# Clone the repository:
git clone <repository-url>
Install dependencies:
npm install
Run the application:
npm start
This will start the React development server and open the application in your default web browser at http://localhost:3000.
Usage
# Building a Workflow
Navigate to the "Create Workflow" page via the navigation bar.
Use the sidebar to drag nodes into the canvas to construct your workflow.
Connect nodes by dragging a line from one node to another to define the flow.
Save your workflow, which will then be available in the Workflow Runner.
# Running a Workflow
Navigate to the "Run Workflow" page via the navigation bar.
Select a workflow from the dropdown menu.
Upload a csv file that will be processed by the workflow.
Click "Run Workflow" to start the execution.
