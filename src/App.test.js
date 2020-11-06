/* global describe, test, expect */
import { render, screen } from '@testing-library/react'
import App from './App'

describe('REALLY BASIC TESTS', () => {
  test('renders learn react link', () => {
    render(<App />)
    const linkElement = screen.getByText(/Welcome to the fliying cloud/i)
    expect(linkElement).toBeInTheDocument()
  })
})
