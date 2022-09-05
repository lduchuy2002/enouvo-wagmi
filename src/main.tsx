import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import client from './client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from './pages'
import { WagmiConfig } from 'wagmi'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <WagmiConfig client={client}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </WagmiConfig>
  </React.StrictMode>
)
