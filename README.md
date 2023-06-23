# Find A Friend API

An API to find pets for adoption.

## Functional Requirements

- [x] It should be able to register a pet
- [ ] It should be able to fetch a list of pets filtered by city
- [ ] It should be able to fetch a list of pets based on its characteristics
- [ ] It should be able to get details from a pet
- [x] It should be able to register an NPO
- [ ] It should be able to log in as an NPO

## Business Rules

- [ ] The user must inform a city in order to fetch a list of pets
- [ ] An NPO must have an address and a WhatsApp phone number
- [ ] A pet must be linked to an NPO
- [ ] The user that wants to adopt a pet will get in touch with the NPM via WhatsApp
- [ ] All filters are optional, however the city is required
- [ ] In order for the NPO to access the app as administrator, it should be logged

## Non-functional Requirements

- [ ] The optional filters to find a pet are:
  - Age: newborn, junior, teen, full grown
  - Size: small, medium, large
  - Energy level: 1 to 5
  - Independency level: low, medium, high
