import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor"
const API_USERS = Cypress.config('api_users');
const API_LOGIN = Cypress.config('api_login');


When("The user makes a request to list user #{int}", (user)=> {
    cy.request('GET', API_USERS + user.toString()).as('getResponse');
});

Then("the request is completed succesfully", ()=>{
    cy.get('@getResponse').should((response) => {
        expect(response.body.data.email).to.eql('janet.weaver@reqres.in');
    });
});


When("The user makes a request to register his data", (userData)=> {
   userData.hashes().forEach((element)=>{
        cy.request('POST', API_USERS, {name: element.name, job: element.job})
        .then((response)=> {
            cy.wrap(response).as('postResponse');
        });
   });
});

Then("the request is completed with status {int}", (code)=>{
    cy.get('@postResponse').should((response)=>{
        expect(response.status).to.eql(code);
    });
});

When("The user makes login to the platform using his access data", (userLoginData)=> {

   userLoginData.hashes().forEach((user)=>{
        cy.request('POST', API_LOGIN, {email: user.email, password: user.password})
        .then((response)=> {
            cy.wrap(response).as('postLoginResponse');
        });
    });
});

Then("the login is completed with status {int}", (code)=>{
    
    cy.get('@postLoginResponse').should((loginResponse)=>{
        expect(loginResponse.status).to.eql(code);
        expect(loginResponse.body.token).to.eql('QpwL5tke4Pnpja7X4')
    });
    
});
