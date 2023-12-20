import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ListCustomePage from "./pages/ListCustomePage";
import CreateUser from "./pages/CreateUser";
import EditUser from "./pages/EditUser";

function App() {
  return (
    <div>
      <div className='my-2'>
        <div className='container bg-slate-100 m-auto Poppinsbold rounded-md'>
          <h1 className='text-center py-5 text-4xl'>TechB Natural Gas Limited</h1>
        </div>

        <BrowserRouter>
          <Routes>
            <Route path='/' element={<ListCustomePage />} />
            <Route path='/addnewuser' element={<CreateUser />} />
            <Route path='/cust/:id/edit' element={<EditUser />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App
