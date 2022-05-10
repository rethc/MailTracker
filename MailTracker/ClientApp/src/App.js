import  Dashboard  from './components/Dashboard'
import React from 'react'
import { ToastProvider } from "react-toast-notifications"

export default function App() {
  return (
    <ToastProvider autoDismiss={true} placement={'bottom-right'}> 
    <Dashboard />
    </ToastProvider>
  )
}
