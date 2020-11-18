/// <reference types="cypress"/>

let Chance = require('chance');
let chance = new Chance();

context('Cadastro', () => {
    it('Cadastro de usuário no site', () => {

        cy.server();
        cy.route('POST', '**/api/1/databases/userdetails/collections/newtable?**')
            .as('postNewtable');

        cy.route('POST', '**/api/1/databases/userdetails/collections/usertable?**')
            .as('postUsertable');

        cy.route('GET', '**/api/1/databases/userdetails/collections/newtable?**')
            .as('getNewtable');


        cy.visit('Register.html');
        cy.get('input[placeholder="First Name"]').type(chance.first());
        cy.get('input[ng-model^=Last]').type(chance.last());
        cy.get('input[ng-model^=Email]').type(chance.email());
        cy.get('input[ng-model^=Phone]').type(chance.phone({ formatted: false }));
        // Radio and checkbox
        cy.get('input[value=FeMale]').check();
        cy.get('input[type=checkbox]').check('Cricket');
        cy.get('input[type=checkbox]').check('Hockey');

        // Select and Double selects
        cy.get('select#Skills').select('Javascript');
        cy.get('select#countries').select('Argentina');
        cy.get('select#country').select('Australia', { force: true });
        cy.get('select#yearbox').select('1995');
        cy.get('select[ng-model^=month]').select('February');
        cy.get('select#daybox').select('22');

        cy.get('input#firstpassword').type('Agilizei@2020');
        cy.get('input#secondpassword').type('Agilizei@2020');

        cy.get('input#imagesrc').attachFile('upload-image.png');

        cy.get('button#submitbtn').click();

        cy.wait('@postNewtable').then((resNewtable) => {
            expect(resNewtable.status).to.eq(200);
        })
        cy.wait('@postUsertable').then((resNewtable) => {
            expect(resNewtable.status).to.eq(200);
        })
        cy.wait('@getNewtable').then((resNewtable) => {
            expect(resNewtable.status).to.eq(200);
        })
        cy.url().should('contain', 'WebTable');
    });
});

