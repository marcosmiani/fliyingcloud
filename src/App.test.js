/* global describe, test, expect */
import { render, screen } from '@testing-library/react'
import App from './App'

describe('REALLY BASIC TESTS', () => {
  test('renders basic search form', () => {
    render(<App />)
    const originElement = screen.getByTestId(/origin/i)
    expect(originElement).toBeInTheDocument()
    const destinationsElement = screen.getByTestId(/destinations/i)
    expect(destinationsElement).toBeInTheDocument()
    const adultsElement = screen.getByTestId(/adults/i)
    expect(adultsElement).toBeInTheDocument()
    const searchButtonElement = screen.getByTestId(/submit-search/i)
    expect(searchButtonElement).toBeInTheDocument()

    const searchAdviceElement = screen.getByText(/search some destinations!/i)
    expect(searchAdviceElement).toBeInTheDocument()
  })
})
