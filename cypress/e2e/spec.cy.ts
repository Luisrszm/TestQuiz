describe('Homepage', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:3001/');
    cy.intercept('GET', '/api/questions/random', {
      statusCode: 200,
      body: [
        {
          question: 'What is the capital of France?',
          answers: [
            { text: 'Paris', isCorrect: true },
            { text: 'London', isCorrect: false },
            { text: 'Madrid', isCorrect: false },
            { text: 'Berlin', isCorrect: false },
          ],
        },
      ],
      delay: 200
    }).as('getQuestions');
  });

  it('permite iniciar el quiz, responder y ver el resultado', () => {
    cy.contains('Start Quiz').click();

    cy.contains('What is the capital of France?').should('exist');

    cy.contains('.alert', 'Paris').prev('button').click();

    cy.contains('Quiz Completed').should('exist');
    cy.contains('Your score: 1/1').should('exist');

    cy.contains('Take New Quiz').click();
    cy.contains('What is the capital of France?').should('exist');

    cy.contains('.alert', 'Paris').prev('button').click();

    cy.contains('Quiz Completed').should('exist');
    cy.contains('Your score: 1/1').should('exist');
  });
})
