import * as mutations from '../support/mutation';

export function new_getToken(): string | null {
    let sessionValue: string | null;
    sessionValue = sessionStorage.getItem("oidc.user:https://identity.yara.com:2zN0e8odq0XW96xP5a7Eb113QevkVWDb");
    const values = sessionValue ? JSON.parse(sessionValue) : "{id_token : 'Sesssion Value is returned null'}";
    const authToken = values.id_token;
    return authToken;
}

export function getToken(): string | null {
    const sessionKey = sessionStorage.key(0)
    let sessionValue: string | null;
    sessionValue = sessionKey ? sessionStorage.getItem(sessionKey) : " ";
    const values = sessionValue ? JSON.parse(sessionValue) : "{id_token : 'Sesssion Value is returned null'}";
    const authToken = values.id_token;
    return authToken;
}

export function getQueryResponse(gqlQuery: string, variableValue: string) {
    const token = getToken();
    return cy.request(
        {
            method: 'POST',
            url: Cypress.env('graphqlUrl'),
            body: {
                query: gqlQuery,
                variables: {
                    value: variableValue
                },
            },
            headers: {
                Authorization: `${token}`,
            },
        }).
        then((response) => {
            const responseData = response.body.data;
            const jsres = responseData as JSON;
            return jsres;
        });
}

export function deleteAutomationRecords(gqlQuery: string, automtionDataID: string) {
    const token = getToken();
    return cy.request(
        {
            method: 'POST',
            url: Cypress.env('graphqlUrl'),
            body: {
                query: gqlQuery,
                variables: {
                    id: automtionDataID
                }
            },
            headers: {
                Authorization: `${token}`,
            },
        }).
        then((delResponse) => {
            const responseData = delResponse.body.data;
            const jsonDelResponse = responseData as JSON;
            return jsonDelResponse;
        })
}

export function deleteCropGroup(nameOfData: string) {
    let groupId: string
    getQueryResponse(mutations.TEST_QUERY_GET_CROP_GROUP, nameOfData).then(function (response) {
        cy.wrap(response).its('cropGroups.entities').its('length').then((length) => {
            if (length > 0) {
                cy.wrap(response).its('cropGroups.entities.0.id').then((id) => {
                    groupId = id;
                }).then(() => {
                    deleteAutomationRecords(mutations.TEST_MUTATION_DELETE_CROP_GROUP, groupId).then(function (delres) {
                        cy.wrap(delres).its('deleteCropGroup').then((status) => {
                            cy.log(status)
                        })
                    })
                });
            }
        })
    })
}

export function deleteCropClass(nameOfData: string) {
    let classId: string
    getQueryResponse(mutations.TEST_QUERY_GET_CROP_CLASS, nameOfData).then(function (response) {
        cy.wrap(response).its('cropClasses.entities').its('length').then((length) => {
            if (length > 0) {
                cy.wrap(response).its('cropClasses.entities.0.id').then((id) => {
                    classId = id;
                }).then(() => {
                    deleteAutomationRecords(mutations.TEST_MUTATION_DELETE_CROP_CLASS, classId).then(function (delres) {
                        cy.wrap(delres).its('deleteCropClass').then((status) => {
                            cy.log(status)
                        })
                    })
                });
            }
        })
    })
}

export function deleteCropSubclass(nameOfData: string) {
    let subclassId: string
    getQueryResponse(mutations.TEST_QUERY_GET_CROP_SUBCLASS, nameOfData).then(function (response) {
        cy.wrap(response).its('cropSubClasses.entities').its('length').then((length) => {
            if (length > 0) {
                cy.wrap(response).its('cropSubClasses.entities.0.id').then((id) => {
                    subclassId = id;
                }).then(() => {
                    deleteAutomationRecords(mutations.TEST_MUTATION_DELETE_CROP_SUBCLASS, subclassId).then(function (delres) {
                        cy.wrap(delres).its('deleteCropSubClass').then((status) => {
                            cy.log(status)
                        })
                    })
                });
            }
        })
    })
}

export function deleteCountry(nameOfData: string) {
    let countryId: string
    getQueryResponse(mutations.TEST_QUERY_GET_COUNTRY, nameOfData).then(function (response) {
        cy.wrap(response).its('countries.entities').its('length').then((length) => {
            if (length > 0) {
                cy.wrap(response).its('countries.entities.0.id').then((id) => {
                    countryId = id;
                }).then(() => {
                    deleteAutomationRecords(mutations.TEST_MUTATION_DELETE_COUNTRY, countryId).then(function (deleteResponse) {
                        cy.wrap(deleteResponse).its('deleteCountry').then((status) => {
                            cy.log(status)
                        })
                    })
                });
            }
        })
    })
}

export function deleteRegion(nameOfData: string) {
    let regionId: string
    getQueryResponse(mutations.TEST_QUERY_GET_REGION, nameOfData).then(function (response) {
        cy.wrap(response).its('regions.entities').its('length').then((length) => {
            if (length > 0) {
                cy.wrap(response).its('regions.entities.0.id').then((id) => {
                    regionId = id;
                }).then(() => {
                    deleteAutomationRecords(mutations.TEST_MUTATION_DELETE_REGION, regionId).then(function (deleteResponse) {
                        cy.wrap(deleteResponse).its('deleteRegion').then((status) => {
                            cy.log(status)
                        })
                    })
                });
            }
        })
    })
}

export function deleteCropDescription(nameOfData: string) {
    let descriptionId: string
    getQueryResponse(mutations.TEST_QUERY_GET_CROP_DESCRIPTION, nameOfData).then(function (response) {
        cy.wrap(response).its('cropDescriptions.entities').its('length').then((length) => {
            if(length > 0) {
                cy.wrap(response).its('cropDescriptions.entities.0.id').then((id) => {
                    descriptionId = id
                }).then(() => {
                    deleteAutomationRecords(mutations.TEST_MUTATION_DELETE_CROP_DESCRIPTION, descriptionId).then(function (delres) {
                        cy.wrap(delres).its('deleteCropDescription').then((status) => {
                            cy.log(status)
                        }) 
                    })
                })
            }
        })
    })
}