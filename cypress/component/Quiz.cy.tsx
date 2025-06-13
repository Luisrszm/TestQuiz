import React from 'react'
import Quiz from '../../client/src/components/Quiz'

describe('<Quiz />', () => {
  const mockQuestions = [
    {
      question: 'What is the capital of France?',
      answers: [
        { text: 'Paris', isCorrect: true },
        { text: 'London', isCorrect: false },
        { text: 'Madrid', isCorrect: false },
        { text: 'Berlin', isCorrect: false },
      ],
    },
  ];

  beforeEach(() => {
    cy.intercept('GET', '/api/questions/random', {
      statusCode: 200,
      body: mockQuestions,
      delay: 200
    }).as('getQuestions');
  });

  it('should show questions after clicking start', () => {
    cy.mount(<Quiz />);
    cy.contains('Start Quiz').click();

    cy.contains(mockQuestions[0].question, { timeout: 10000 }).should('exist');

    mockQuestions[0].answers.forEach(answer => {
      cy.contains('.alert', answer.text).should('exist');
    });
  });

  it('should complete quiz with correct score', () => {
    cy.mount(<Quiz />);
    cy.contains('Start Quiz').click();

    cy.contains(mockQuestions[0].question, { timeout: 10000 }).should('exist');

    const correctAnswer = mockQuestions[0].answers.find(a => a.isCorrect);
    if (correctAnswer) {
      cy.contains('.alert', correctAnswer.text)
        .prev('button')
        .click();
    }

    cy.contains('Quiz Completed').should('exist');
    cy.contains(`Your score: 1/${mockQuestions.length}`).should('exist');
  });
})