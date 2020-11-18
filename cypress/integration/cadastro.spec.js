/// <reference types="cypress" />

let Chance = require('chance');
let chance = new Chance();

context('Cadastro', () => {
    it('Cadastro de usuário no site', () => {
    cy.visit('Register.html');
    cy.get('input[placeholder="First Name"]').type('Gisele');
    cy.get('input[ng-model^=LastName]').type('Agilizei');
    cy.get('input[ng-model^=Email]').type('gisele.agilizei@gmail.com');
    cy.get('input[ng-model^=Phone]').type('9997629378');

    cy.get('input[value=FeMale]').check();
    cy.get('input[type=checkbox]').check('Cricket');    
    cy.get('input[type=checkbox]').check('Hockey');    

    cy.get('select#Skills').select('Javascript');
    cy.get('select#countries').select('Argentina');  
    cy.get('select#country').select('Australia', { force: true}); // atenção 
    cy.get('select#yearbox').select('1996');
    cy.get('select[ng-model^=month]').select('February');
    cy.get('select#daybox').select('24');  
    cy.get('input#firstpassword').type('Agilizei@2020');
    cy.get('input#secondpassword').type('Agilizei@2020');
    });
});
