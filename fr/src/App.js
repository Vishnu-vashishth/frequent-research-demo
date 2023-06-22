import React from 'react';
import SaveData from './components/UserForm';  
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';
import UserForm from './components/UserForm'
import FormDataDisplay from './components/FormDataDisplay';
function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<UserForm />} />
          <Route path="/form-data" element={<FormDataDisplay />} />
        </Routes>
      </Router>
     
    
  );
}

export default App;
