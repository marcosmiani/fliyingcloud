/* global describe, test, expect */
import { render, screen } from '@testing-library/react'
import App from './App'

describe('REALLY BASIC TESTS', () => {
  test('renders basic search form', () => {
    render(<App />)
    const linkElement = screen.getByText(/origin/i)
    expect(linkElement).toBeInTheDocument()
  })
})
