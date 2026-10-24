import { useState } from 'react'
import './App.css'

function App() {
  const now = new Date().toLocaleTimeString();
  return (
    <>
      <main><h1>Current time: {now}</h1></main>;
    </>
  )
}

export default App
