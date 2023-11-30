import { BrowserRouter, Routes, Route } from 'react-router-dom';

import React,{Suspense} from 'react';

const Dashboard = React.lazy(()=> import('./pages/Dashboard'))
const SignIn = React.lazy(()=> import('./pages/SignIn'))
import Loader from './components/Loader'
import PrivateRoute from './components/PrivateRoute'
export default function App() {
  return (
    <BrowserRouter>
    <Suspense fallback={<Loader/>}>
      <Routes>
        <Route path='/' element={<SignIn />} />
   
        <Route element={<PrivateRoute />}>
        <Route path='/dashboard' element={<Dashboard />} />
         
        </Route>
      </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
