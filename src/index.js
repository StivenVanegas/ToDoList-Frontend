import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './contexts/AuthContext';
import { TaskProvider } from './contexts/TaskContext';
import { ModalProvider } from './contexts/ModalContext';

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <TaskProvider>
        <ModalProvider>
          <App />
        </ModalProvider>
      </TaskProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
