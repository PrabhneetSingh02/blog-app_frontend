import { useState } from 'react';

import DataProvider from './context/DataProvider';

import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';

//components
import Login from './components/account/Login';
import Home from './components/home/Home';
import Header from './components/header/Header';

//if person not successfully loged in then go to login page 
const PrivateRoute = ({isAuthenticated, ...props }) => {
  return isAuthenticated?
    <>
      <Outlet />
    </>
  : <Navigate replace to = '/login'/>
}

function App() {

  const [isAuthenticated, isUserAuthenticated] = useState(false);

  return (
    <DataProvider>
      <BrowserRouter>
        <Header />     
        <div style={{marginTop: 64}}>
          <Routes>
            <Route path='/login' element={<Login isUserAuthenticated={isUserAuthenticated}/>} />

            <Route path='/' element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
              <Route path='/' element={<Home />} />

            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </DataProvider>
  );
}
// we put header component above div bcoz we want it at top of page 
export default App;
 