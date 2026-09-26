// src/App.test.jsx
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { test, expect } from 'vitest'
import App from './App'
import ShopContextProvider from './context/ShopContext'

test('renders login link in navbar', () => {
  render(
    <BrowserRouter>
      <ShopContextProvider>
        <App />
      </ShopContextProvider>
    </BrowserRouter>
  )
  expect(screen.getByText(/login/i)).toBeInTheDocument()
})
