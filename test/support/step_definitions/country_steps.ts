/// <reference types="cypress" />

import {
  Given,
  When,
  Then,
  And,
  Before,
  After,
} from "cypress-cucumber-preprocessor/steps";
import {
  MainMenu_cy,
  SubMenu_cy,
  ExpandedMenu_cy,
} from "../../fixtures/polaris_menu";
import * as utilityHelper from "../helper";
import * as cleanup from "../cleanAutomationData";

//Add/Edit Country data-cy-locators
const btn_addCountry = "addCountryButton";
const txt_countryName = "countryFormInputName";
const txt_countryCode = "countryFormInputCountryCode";
const drp_dwnCurrency = "countryFormSelectCurrency";
const drp_dwnUnitSystem = "countryFormSelectIsDefaultMetric";
const drp_dwnWindSpeed = "countryFormSelectWindSpeedUnit";
const drp_dwnPrecipitationAmount = "countryFormSelectPrecipitationAmountUnit";
const drp_dwnEvapotranspiration = "countryFormSelectEvapotranspirationRefUnit";
const drp_dwnQpfSnowAmt = "countryFormSelectQpfSnowAmountUnit";
const drp_dwnTemperature = "countryFormSelectTemperatureUnit";
const drp_dwnDewPoint = "countryFormSelectDewPointUnit";
const txt_productSetCode = "countryFormInputProductSetCode";
const drp_dwnSolutions = "countryFormSelectApplicationTags";
const frm_addEditCountry = "locationCountryForm";
const frm_addCountryClose = "countryAddFormButtonClose";
const frm_editCountryClose = "countryEditFormButtonClose";
const btn_saveCountry = "countryFormButtonSubmit";

// data-cy-locators for Country Table and its Actions.
const tbl_countryTable = "countryTable";
const btn_countryEditAction = "countryTableEditButton";
const btn_countryDeleteAction = "countryTableDeleteButton";

// data-cy locators for delete dialog:
const btn_delete = "countryDeleteDialogConfirmButton";
const btn_dontDelete = "countryDeleteDialogCancelButton";

Before({ tags: "@country" }, function () {
  cy.logoutFromApplication();
  cy.loginToApplication().then(() => {
    cleanup.deleteCountry("TestCountry");
    cleanup.deleteCountry("TestCountry1");
  });
});

// After({tags:'@country'}, function(){
//     cy.visit('/');
//     cy.wait(6000);
//     cy.xpath("//label[text()='Profile']/parent::div").find('svg').click({force:true});
//     cy.contains('span','Log out').click({force:true});
//     cy.wait(2000);
// });

Given(
  "Logged as user with role Global admin and role Global settings and PolarisMaintenance",
  async () => {
    cy.loginToApplication();
  }
);

And(
  'I clicked button "Global settings" and I clicked button "Locations"',
  () => {
    utilityHelper.clickMenu(
      MainMenu_cy.globalSettings,
      SubMenu_cy.locations,
      ""
    );
  }
);

Given('I am in "Countries" page', () => {
  cy.url().should("eq", Cypress.config().baseUrl + "/admin/countries");
});

// Add a country
When("I create new country with following details:", (dataTable) => {
  cy.get('[data-cy="' + btn_addCountry + '"]', { timeout: 20000 }).click();
  dataTable.hashes().forEach((ele: any) => {
    for (let propName in ele) {
      switch (propName) {
        case "Country Name":
          utilityHelper.setInputValue(txt_countryName, ele[propName]);
          break;

        case "Country Code":
          utilityHelper.setInputValue(txt_countryCode, ele[propName]);
          break;

        case "Currency":
          utilityHelper.setSingleDropdownValue(drp_dwnCurrency, ele[propName]);
          break;

        case "Which Unit System Is Using":
          utilityHelper.setSingleDropdownValue(
            drp_dwnUnitSystem,
            ele[propName]
          );
          break;

        case "Wind Speed Unit":
          utilityHelper.setSingleDropdownValue(drp_dwnWindSpeed, ele[propName]);
          break;

        case "Precipitation Amount Unit":
          utilityHelper.setSingleDropdownValue(
            drp_dwnPrecipitationAmount,
            ele[propName]
          );
          break;

        case "Evapotranspiration Unit":
          utilityHelper.setSingleDropdownValue(
            drp_dwnEvapotranspiration,
            ele[propName]
          );
          break;

        case "Qpf Snow Amount Unit":
          utilityHelper.setSingleDropdownValue(
            drp_dwnQpfSnowAmt,
            ele[propName]
          );
          break;

        case "Temperature Unit":
          utilityHelper.setSingleDropdownValue(
            drp_dwnTemperature,
            ele[propName]
          );
          break;

        case "Dew Point Unit":
          utilityHelper.setSingleDropdownValue(drp_dwnDewPoint, ele[propName]);
          break;

        case "ProductSetCode (Optional)":
          utilityHelper.setInputValue(txt_productSetCode, ele[propName]);
          break;

        case "Solutions (Optional)":
          utilityHelper.setMultiDropdownValue(
            drp_dwnSolutions,
            ele[propName],
            false
          );
          break;

        default:
          break;
      }
    }
  });
});

And(
  'I click "Save" and I should see tooltip text {string} and {string}',
  (headerMessage, bodyMessage) => {
    cy.get('[data-cy="' + btn_saveCountry + '"]').click();
    utilityHelper.verifyAlertToolTips(headerMessage, bodyMessage);

    //   cy.wait('@addCountry', { timeout: 10000, requestTimeout: 10000 }).then(
    //     () => {
    //       cy.log("0101");
    //     },
    //   );
  }
);

Then(
  'in Country Table a row should be added for country "TestCountry" with following data:',
  (dataTable) => {
    dataTable.hashes().forEach((ele: any) => {
      utilityHelper.searchTableBasedOnColumn(
        tbl_countryTable,
        "Name",
        ele.Name
      );
      utilityHelper.verifyTableData(dataTable, tbl_countryTable);
    });
  }
);

//Add a country and Edit Country without saving the data
When(
  'I click three dots in the end of row or in column Actions for country {string} present in column {string} a context menu with options "Edit" and "Delete" shows',
  (countryName, columnName) => {
    utilityHelper.searchTableBasedOnColumn(
      tbl_countryTable,
      columnName,
      countryName
    );
    utilityHelper.isActionSubmenuVisibleBasedOnCellValue(
      tbl_countryTable,
      countryName,
      btn_countryEditAction
    );
    utilityHelper.isActionSubmenuVisibleBasedOnCellValue(
      tbl_countryTable,
      countryName,
      btn_countryDeleteAction
    );
  }
);

And(
  'I choose "Edit" for country {string} a modal appeared with following data:',
  (countryName, dataTable) => {
    utilityHelper.clickTableActionBasedOnCellValue(
      tbl_countryTable,
      countryName,
      btn_countryEditAction
    );

    dataTable.hashes().forEach((ele: any) => {
      for (let propName in ele) {
        switch (propName) {
          case "Country Name":
            utilityHelper.verifyInputValue(txt_countryName, ele[propName]);
            break;

          case "Country Code":
            utilityHelper.verifyInputValue(txt_countryCode, ele[propName]);
            break;

          case "Currency":
            utilityHelper.verifySingleDropdownValue(
              drp_dwnCurrency,
              ele[propName]
            );
            break;

          case "Which Unit System Is Using":
            utilityHelper.verifySingleDropdownValue(
              drp_dwnUnitSystem,
              ele[propName]
            );
            break;

          case "Wind Speed Unit":
            utilityHelper.verifySingleDropdownValue(
              drp_dwnWindSpeed,
              ele[propName]
            );
            break;

          case "Precipitation Amount Unit":
            utilityHelper.verifySingleDropdownValue(
              drp_dwnPrecipitationAmount,
              ele[propName]
            );
            break;

          case "Evapotranspiration Unit":
            utilityHelper.verifySingleDropdownValue(
              drp_dwnEvapotranspiration,
              ele[propName]
            );
            break;

          case "Qpf Snow Amount Unit":
            utilityHelper.verifySingleDropdownValue(
              drp_dwnQpfSnowAmt,
              ele[propName]
            );
            break;

          case "Temperature Unit":
            utilityHelper.verifySingleDropdownValue(
              drp_dwnTemperature,
              ele[propName]
            );
            break;

          case "Dew Point Unit":
            utilityHelper.verifySingleDropdownValue(
              drp_dwnDewPoint,
              ele[propName]
            );
            break;

          case "Product Set Code (Optional)":
            utilityHelper.verifyInputValue(txt_productSetCode, ele[propName]);
            break;

          case "Solutions (Optional)":
            utilityHelper.verifyMultiDropdownValue(
              drp_dwnSolutions,
              ele[propName]
            );
            break;

          default:
            break;
        }
      }
    });
  }
);

And(
  "I change data in all fields for country {string} with following data:",
  (countryName, dataTable) => {
    dataTable.hashes().forEach((ele: any) => {
      for (let propName in ele) {
        switch (propName) {
          case "Country Name":
            utilityHelper.setInputValue(txt_countryName, ele[propName]);
            break;

          case "Country Code":
            utilityHelper.setInputValue(txt_countryCode, ele[propName]);
            break;

          case "Currency":
            utilityHelper.setSingleDropdownValue(
              drp_dwnCurrency,
              ele[propName]
            );
            break;

          case "Which Unit System Is Using":
            utilityHelper.setSingleDropdownValue(
              drp_dwnUnitSystem,
              ele[propName]
            );
            break;

          case "Wind Speed Unit":
            utilityHelper.setSingleDropdownValue(
              drp_dwnWindSpeed,
              ele[propName]
            );
            break;

          case "Precipitation Amount Unit":
            utilityHelper.setSingleDropdownValue(
              drp_dwnPrecipitationAmount,
              ele[propName]
            );
            break;

          case "Evapotranspiration Unit":
            utilityHelper.setSingleDropdownValue(
              drp_dwnEvapotranspiration,
              ele[propName]
            );
            break;

          case "Qpf Snow Amount Unit":
            utilityHelper.setSingleDropdownValue(
              drp_dwnQpfSnowAmt,
              ele[propName]
            );
            break;

          case "Temperature Unit":
            utilityHelper.setSingleDropdownValue(
              drp_dwnTemperature,
              ele[propName]
            );
            break;

          case "Dew Point Unit":
            utilityHelper.setSingleDropdownValue(
              drp_dwnDewPoint,
              ele[propName]
            );
            break;

          case "ProductSetCode (Optional)":
            utilityHelper.setInputValue(txt_productSetCode, ele[propName]);
            break;

          case "Solutions (Optional)":
            utilityHelper.setMultiDropdownValue(
              drp_dwnSolutions,
              ele[propName],
              true
            );
            break;

          default:
            break;
        }
      }
    });
  }
);

And('I click button <X> in right up corner of modal "Edit Country"', () => {
  cy.get('[data-cy="' + frm_editCountryClose + '"]').click();
});

Then(
  "modal disappeared, should not change any data for country {string}:",
  (countryName, dataTable) => {
    dataTable.hashes().forEach((ele: any) => {
      utilityHelper.verifyTableData(dataTable, tbl_countryTable);
    });
  }
);

//Edit Country and save changes
When(
  'I search country {string} present in column {string} and choose "Edit"',
  (countryName, columnName) => {
    utilityHelper.searchTableBasedOnColumn(
      tbl_countryTable,
      columnName,
      countryName
    );
    utilityHelper.clickTableActionBasedOnCellValue(
      tbl_countryTable,
      countryName,
      btn_countryEditAction
    );
  }
);

Then(
  "data for country {string} should be updated in row",
  (countryName, dataTable) => {
    dataTable.hashes().forEach((ele: any) => {
      utilityHelper.verifyTableData(dataTable, tbl_countryTable);
    });
  }
);

// Add a country and Delete country without saving changes and saving changes
And(
  'I choose "Delete" for country {string} a content appeared {string} and {string}',
  (countryName, headerMessage, bodyMessage) => {
    utilityHelper.clickTableActionBasedOnCellValue(
      tbl_countryTable,
      countryName,
      btn_countryDeleteAction
    );

    //Verify the messages:
    cy.get('div[class*="MuiPaper-rounded"]').within((popup) => {
      cy.get("label").eq(0).invoke("text").should("equal", headerMessage);
      cy.get("label").eq(1).invoke("text").should("equal", bodyMessage);
    });
  }
);

And('I click button "Do not Delete"', () => {
  cy.get('[data-cy="' + btn_dontDelete + '"]', { timeout: 8000 }).click();
});

//Delete country without added regions
When(
  "I delete a country {string} present in column {string}",
  (countryName, columnName) => {
    utilityHelper.searchTableBasedOnColumn(
      tbl_countryTable,
      columnName,
      countryName
    );
    utilityHelper.clickTableActionBasedOnCellValue(
      tbl_countryTable,
      countryName,
      btn_countryDeleteAction
    );
    cy.get('[data-cy="' + btn_delete + '"]', { timeout: 8000 }).click();
  }
);

Then("I see tooltip text {string} and {string}", (headerText, bodyText) => {
  utilityHelper.verifyAlertToolTips(headerText, bodyText);
});

And(
  "the row for country {string} present in the column {string} is removed from country table",
  (countryName, columnName) => {
    utilityHelper.searchTableBasedOnColumn(
      tbl_countryTable,
      columnName,
      countryName
    );
    utilityHelper.verifyRowIsDeleted(tbl_countryTable, countryName, true);
  }
);
