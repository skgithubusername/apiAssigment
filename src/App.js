import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import the Routes component
import ShowList from './components/ShowList';
import ShowSummary from './components/ShowSummary';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Use the Routes component */}
        <Routes>
          <Route path="/" element={<ShowList />} /> {/* Use 'element' prop */}
          <Route path="/summary/:id" element={<ShowSummary />} /> {/* Use 'element' prop */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
