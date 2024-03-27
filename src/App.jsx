// App.js
import React from 'react';
import Users from './Components/Users';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import UserInfo from './Components/UserInfo';
import AddUser from './Components/AddUser';


function App() {


  return (
    <>
    <div className='flex justify-center items-center'>
      <h2>CRUD Operation - React-Query</h2>
      </div>
    <Router>
      <Routes>
        <Route path='/' element={<Users /> } />
        <Route path='/users/user/:id' element={<UserInfo/> } />
        <Route path='/users/add' element={<AddUser/> } />
      </Routes>
    </Router>
    </>
  );
}

export default App;
