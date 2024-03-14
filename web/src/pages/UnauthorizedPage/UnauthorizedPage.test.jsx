import { render } from '@redwoodjs/testing/web'

import UnauthorizedPage from './UnauthorizedPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('UnauthorizedPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<UnauthorizedPage />)
    }).not.toThrow()
  })
})
