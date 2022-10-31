import React, { FC } from 'react';
import Index from '@/layout/index'
import Login from '@/views/login/Index'
import '@/App.css';
import { Routes, Route, useSearchParams, Navigate } from 'react-router-dom'

import { useAppSelector } from './store/hooks';
const App: FC = () => {
  const loginState = useAppSelector(state => state.admins.loginState)


  const [params] = useSearchParams()
  const url = params.get('r') as string
  return (
    <Routes>
      <Route path="/login" element={loginState ? <Navigate to={url} /> : <Login />} />
      <Route path="/*" element={loginState ? <Index /> : <Navigate to="/login" />} />
    </Routes>
  )
};

export default App;