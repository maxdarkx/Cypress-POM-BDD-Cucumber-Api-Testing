import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor"

When("The user makes a request to list user #{string}", (user)=> {

    Cypress.config('api_users').as('users')
    cy.request('GET', 'users' + user).as('getResponse');
   });

});

Then("the request is completed succesfully", ()=>{
    cy.get('@getResponse').should((response) => {
        expect(response.body.data.email).to.eql('janet.weaver@reqres.in');
    });
});

When("The user makes a request to register his data", (userData)=> {

   userData.hashes().forEach((element)=>{
       cy.readFile('environment.json').then((data)=>{
            cy.request('POST', data.reqres.url + data.reqres.api_users, '{"name": "' + element.name + '" , "job": "' + element.job + '"}')
            .then((response)=> {
                cy.wrap(response).as('postResponse');
            });
       });
   });
});

Then("the request is completed with status {string}", (code)=>{
    cy.get('@postResponse').should((response)=>{
        expect(response.status).to.eql(parseInt(code));
    });
});

When("The user makes login to the platform using his access data", (userLoginData)=> {

   userLoginData.hashes().forEach((user)=>{
       cy.readFile('environment.json').then((data)=>{
            cy.request('POST', data.reqres.url + data.reqres.api_login, '{\n"email": "' + user.email + '",\n"password": "' + user.password + '"\n}')
            .then((response)=> {
                cy.wrap(response).as('postLoginResponse');
            });
       });
    });
});

Then("the login is completed with status {string}", (code)=>{
    cy.get('@postLoginResponse').should((loginResponse)=>{
        expect(loginResponse.status).to.eql(parseInt(code));
        expect(loginResponse.token).to.eql('QpwL5tke4Pnpja7X4')
    });
});