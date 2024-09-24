import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Test from './test';

describe('display hello world',() =>{
    it('display hello world', () =>{
        render(<Test />)

        expect("hello world").toBeInTheDocument()
    })
});



// describe('Page', () => {
//     it('renders a heading', () => {
//       render(<Page />)
   
//       const heading = screen.getByRole('heading', { level: 1 })
   
//       expect(heading).toBeInTheDocument()
//     })
//   })