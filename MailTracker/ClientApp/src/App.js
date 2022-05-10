import  Dashboard  from './components/Dashboard'
import SearchMail from './components/SearchMail'
import React from 'react'
import { ToastProvider } from "react-toast-notifications"
import {  Route, Link } from "react-router-dom";
 

export default function App() {
  return (
    <ToastProvider autoDismiss={true} placement={'bottom-right'}> 
      <Route path="/" component={Dashboard} /> 
      <Route path="/search" component={SearchMail} /> 
    </ToastProvider>
  )
}
