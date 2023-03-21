Feature: reqres.in

  Scenario: Get Request
    When The user makes a request to list user #2
    Then the request is completed succesfully

  Scenario: Post Register request
    When The user makes a request to register his data
      | name     | job    |
      | morpheus | leader |
    Then the request is completed with status 201

  Scenario: Post login successfull
    When The user makes login to the platform using his access data
      | email              | password   |
      | eve.holt@reqres.in | cityslicka |
    Then the login is completed with status 200

