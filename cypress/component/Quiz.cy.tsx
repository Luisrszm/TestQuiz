import React from 'react'
import Quiz from '../../client/src/components/Quiz'

describe('<Quiz />', () => {
  it('Should render the Quiz component', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Quiz />)
  })
})