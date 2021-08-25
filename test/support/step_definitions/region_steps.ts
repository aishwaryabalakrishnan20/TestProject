import { Given, When, Then, And,Before, After} from 'cypress-cucumber-preprocessor/steps';
import { MainMenu_cy, SubMenu_cy, ExpandedMenu_cy } from '../../fixtures/polaris_menu';
import * as utilityHelper from '../helper';
import * as cleanup from '../cleanAutomationData';

//Add/Edit Country data-cy-locators
const btn_addCountry              ='addCountryButton';
const txt_countryName             ='countryFormInputName';
const txt_countryCode             ='countryFormInputCountryCode';
const drp_dwnCurrency             ='countryFormSelectCurrency';
const drp_dwnUnitSystem           ='countryFormSelectIsDefaultMetric';
const drp_dwnWindSpeed            ='countryFormSelectWindSpeedUnit';
const drp_dwnPrecipitationAmount  ='countryFormSelectPrecipitationAmountUnit';
const drp_dwnEvapotranspiration   ='countryFormSelectEvapotranspirationRefUnit';
const drp_dwnQpfSnowAmt           ='countryFormSelectQpfSnowAmountUnit';
const drp_dwnTemperature          ='countryFormSelectTemperatureUnit';
const drp_dwnDewPoint             ='countryFormSelectDewPointUnit';
const txt_productSetCode          ='countryFormInputProductSetCode';
const drp_dwnSolutions            ='countryFormSelectApplicationTags';
const btn_saveCountry             ='countryFormButtonSubmit';

// data-cy-locators for Countries Table , regions table and its Actions ellipses
const tbl_countryTable          ='countryTable';   
const btn_countryEditAction     ='countryTableEditButton';
const btn_countryDeleteAction   ='countryTableDeleteButton';
const tbl_regionTable           ='regionTable';
const btn_regionEditAction      ='regionTableEditButton';
const btn_regionDeleteAction    ='regionTableDeleteButton';

// Add/Edit Region data-cy-locators
const  btn_addRegion         ='addRegionButton';    
const  txt_regionName        ='regionFormInputName';
const  btn_saveRegion        ='regionFormButtonSubmit';
const  frm_addEditRegion     ='regionForm';
const  frm_addRegionClose    ='regionAddFormButtonClose';
const  frm_editRegionClose   ='regionEditFormButtonClose';

// Country Delete dialog data-cy locators
const  btn_okCountryDelDialog  ='countryDeleteDialogCancelButton';

// Region Delete dialog data-cy locators
const  btn_deleteRegion      ='regionDeleteDialogConfirmButton';
const  btn_dontDeleteRegion  ='regionDeleteDialogCancelButton';

Before({tags:'@region'}, function(){
        cy.logoutFromApplication();
        cy.loginToApplication().then(()=>{
                cleanup.deleteRegion("All Automation");
                cleanup.deleteCountry("TestRegionCountry");
        });
});

Given('Logged as user with role Global admin and role Global settings and PolarisMaintenance',()=>{
        cy.loginToApplication();        
})

And('I clicked button "Global settings" and I clicked button "Locations"',()=>{
        utilityHelper.clickMenu(MainMenu_cy.globalSettings,SubMenu_cy.locations,'');
})

Given('I am in "Countries" page',()=>{
        cy.url().should('eq', Cypress.config().baseUrl + '/admin/countries');
})

And('I move back to "Countries" page',()=>{
        utilityHelper.clickMenu(MainMenu_cy.globalSettings,SubMenu_cy.locations,'');
})
// Add a country
When('I create new country with following details:',(dataTable)=>{
        cy.get('[data-cy="'+ btn_addCountry +'"]', {timeout:20000}).click();
        dataTable.hashes().forEach((ele: any) =>{

                for (let propName in ele) {
                        switch (propName) {
                                case 'Country Name':
                                utilityHelper.setInputValue(txt_countryName,ele[propName]);
                                break;
                        
                                case 'Country Code':
                                utilityHelper.setInputValue(txt_countryCode,ele[propName]);
                                break;
                                
                                case 'Currency':
                                utilityHelper.setSingleDropdownValue(drp_dwnCurrency,ele[propName]);
                                break;

                                case 'Which Unit System Is Using':
                                utilityHelper.setSingleDropdownValue(drp_dwnUnitSystem,ele[propName]);
                                break;

                                case 'Wind Speed Unit':
                                utilityHelper.setSingleDropdownValue(drp_dwnWindSpeed,ele[propName]);
                                break;

                                case 'Precipitation Amount Unit':
                                utilityHelper.setSingleDropdownValue(drp_dwnPrecipitationAmount,ele[propName]);
                                break;

                                case 'Evapotranspiration Unit':
                                utilityHelper.setSingleDropdownValue(drp_dwnEvapotranspiration,ele[propName]);
                                break;

                                case 'Qpf Snow Amount Unit':
                                utilityHelper.setSingleDropdownValue(drp_dwnQpfSnowAmt,ele[propName]);
                                break;

                                case 'Temperature Unit':
                                utilityHelper.setSingleDropdownValue(drp_dwnTemperature,ele[propName]);
                                break;

                                case 'Dew Point Unit':
                                utilityHelper.setSingleDropdownValue(drp_dwnDewPoint,ele[propName]);
                                break;

                                case 'ProductSetCode (Optional)':
                                utilityHelper.setInputValue(txt_productSetCode,ele[propName]);
                                break;

                                case 'Solutions (Optional)':
                                utilityHelper.setMultiDropdownValue(drp_dwnSolutions,ele[propName],false);
                                break;
                                
                                default:
                                break;
                        }
                }
        }); 
})

And('I click "Save" and I should see tooltip text {string} and {string}',(headerMessage, bodyMessage)=>{
        cy.get('[data-cy="'+ btn_saveCountry +'"]').click();
        utilityHelper.verifyAlertToolTips(headerMessage,bodyMessage);
})

And('I click "Save" and I should see tooltip text {string} and {string} for region',(headerMessage, bodyMessage)=>{
        cy.get('[data-cy="'+ btn_saveRegion +'"]').click();
        utilityHelper.verifyAlertToolTips(headerMessage,bodyMessage);
})

Then('in Country Table a row should be added for country "TestRegionCountry" with following data:',(dataTable)=>{
        dataTable.hashes().forEach((ele:any) => {
                utilityHelper.searchTableBasedOnColumn(tbl_countryTable, "Name", ele.Name);
                utilityHelper.verifyTableData(dataTable, tbl_countryTable) ;   
        });
})

//Add a region  
When('I add region {string} for country {string} present in column {string}',(regionName, countryName, columnName)=>{
        //Search and Click on a country to which region has to be added.
        utilityHelper.searchTableBasedOnColumn(tbl_countryTable, columnName, countryName); 
        cy.get('[data-cy="'+ tbl_countryTable +'"]', { timeout: 20000 }).within(()=>{
                cy.get('thead th').each(($header, headerIndex) => {
                        if($header.text() == columnName){
                                cy.get('tbody td').eq(headerIndex).contains(countryName).click();
                        }
                });
        });

        cy.get('[data-cy="'+ btn_addRegion +'"]').click();
        utilityHelper.setInputValue(txt_regionName, regionName);
})

And('I click "Save" and I should see tooltip text {string} and {string}',(headerMessage, bodyMessage)=>{
        cy.get('[data-cy="'+ btn_saveRegion +'"]').click();
        utilityHelper.verifyAlertToolTips(headerMessage, bodyMessage);
})

Then('in Region Table a row should be added for region "All Automation" with following data:',(dataTable)=>{
        dataTable.hashes().forEach((ele:any) => {
                utilityHelper.verifyTableData(dataTable, tbl_regionTable);   
        }); 
})

//Scenario: Adding duplicated region
When('I click on {string} ,name of the country present in column {string} in countries list, a list with regions are loaded',(countryName, columnName)=>{
        utilityHelper.searchTableBasedOnColumn(tbl_countryTable, columnName, countryName);    
    
        cy.get('[data-cy="'+ tbl_countryTable +'"]', { timeout: 20000 }).within(()=>{
                cy.get('thead th').each(($header, headerIndex) => {
                        if($header.text() == columnName){
                                cy.get('tbody td').eq(headerIndex).contains(countryName).click();
                        }
                });
        });

        cy.get('[data-cy="'+ tbl_regionTable +'"]').find('tbody tr[role="row"]').should('exist');
})

And('I add region {string} for country "TestRegionCountry"',(regionName)=>{
        cy.get('[data-cy="'+ btn_addRegion +'"]').click();
        utilityHelper.setInputValue(txt_regionName, regionName);
})

And('I click "Save" and an error message {string} displays under field "Region Name"',(errorMessage)=>{
        cy.get('[data-cy="'+ btn_saveRegion +'"]').click();        
        cy.get('[data-cy="'+ txt_regionName +'"]').closest('form').find('label').not('[title]').invoke('text').then((actualErrorText)=>{        
                expect(errorMessage).to.be.equal(actualErrorText,"Verify Cannot create duplicate region.");        
        });
})

And('a modal is open, should not save the region with name {string}',(regionName)=>{
        let allRegionNameCount :number =0;

        //verify modal/form is still open.
        //Close the modal and check duplicated records are not added:    
        cy.get('[data-cy="'+ frm_addEditRegion +'"]').within(()=>{
                cy.root().should('be.visible');
                cy.root().parent().find('svg').click();
        });
        
        cy.get('[data-cy="'+ tbl_regionTable +'"]').find(' tbody td').eq(0).each((nameCell)=>{
                if(nameCell.text() == regionName){
                        allRegionNameCount++;
                }
        }).then(()=>{
                expect(allRegionNameCount).to.be.equal(1,"Verify there should be no duplicated records for a region with name 'All'");
        }); 
})

//Edit region in country Test without saving data
And('I click three dots in the end of row or in column Action for region {string} present in column {string} a context menu with options "Edit" and "Delete" shows',(regionName, columnName)=>{
        utilityHelper.searchTableBasedOnColumn(tbl_regionTable, columnName, regionName);
        utilityHelper.isActionSubmenuVisibleBasedOnCellValue(tbl_regionTable, regionName, btn_regionEditAction);
        utilityHelper.isActionSubmenuVisibleBasedOnCellValue(tbl_regionTable, regionName, btn_regionDeleteAction);
})

And('I choose "Edit" a modal appeared with following data for region {string}:',(regionName)=>{
        utilityHelper.clickTableActionBasedOnCellValue(tbl_regionTable, regionName, btn_regionEditAction);
})

And('I typed {string} in field "Region Name"',(editedRegionName)=>{
        utilityHelper.setInputValue(txt_regionName, editedRegionName);
})

And('I clicked button <X> in right up corner of modal "Edit Region"',()=>{
        cy.get('[data-cy="'+ frm_editRegionClose +'"]').click();
})

Then('modal disappeared, should not change any data for region "All Automation":',(dataTable)=>{
        dataTable.hashes().forEach((ele:any) => {
                utilityHelper.verifyTableData(dataTable, tbl_regionTable);    
        });
})

//Edit region in country Test and saving data
When('I edit region {string} as {string} in {string} name of the country present in column {string}',(regionName, editRegionName, countryName, columnName)=>{
        //Search and Click on a country where region has to be edited.
        utilityHelper.searchTableBasedOnColumn(tbl_countryTable, columnName, countryName); 
        cy.get('[data-cy="'+ tbl_countryTable +'"]', { timeout: 20000 }).within(()=>{
                cy.get('thead th').each(($header, headerIndex) => {
                        if($header.text() == columnName){
                                cy.get('tbody td').eq(headerIndex).contains(countryName).click();
                        }
                });
        });

        utilityHelper.clickTableActionBasedOnCellValue(tbl_regionTable, regionName, btn_regionEditAction);
        utilityHelper.setInputValue(txt_regionName, editRegionName);
})


Then('in Region Table a row should be added with following data:',(dataTable)=>{
        dataTable.hashes().forEach((ele:any) => {
                utilityHelper.verifyTableData(dataTable, tbl_regionTable);   
        });  
})

//Delete country with added regions
When('I click three dots in the end of row or in column Action for country {string} present in column {string} a context menu with options "Edit" and "Delete" shows',(countryName, columnName)=>{
        utilityHelper.searchTableBasedOnColumn(tbl_countryTable, columnName, countryName);
        utilityHelper.isActionSubmenuVisibleBasedOnCellValue(tbl_countryTable, countryName, btn_countryEditAction);
        utilityHelper.isActionSubmenuVisibleBasedOnCellValue(tbl_countryTable, countryName, btn_countryDeleteAction);
})

And('I choose "Delete" for country {string} a content appeared {string} and {string}',(countryName, headerMessage, bodyMessage)=>{
        utilityHelper.clickTableActionBasedOnCellValue(tbl_countryTable, countryName, btn_countryDeleteAction);

        //Verify the messages:
        cy.get('div[class*="MuiPaper-rounded"]').within((popup)=>{
                cy.wait(5000);
                cy.get('label').eq(0).invoke('text').should('equal',headerMessage);
                cy.get('label').eq(1).invoke('text').should('equal',bodyMessage);
        });
})

And('I clicked button "Ok"',()=>{
        cy.get('[data-cy="'+ btn_okCountryDelDialog +'"]').click();
})

Then('content disappeared, should not delete country {string} or change any data for row in table:',(countryName, dataTable)=>{
        // row should not be deleted and intact
        utilityHelper.verifyRowIsDeleted(tbl_countryTable, countryName, false);
        utilityHelper.verifyTableData(dataTable, tbl_countryTable); 
})

//Delete region without saving the data and saving the data
And('I choose "Delete" for region {string} a content appeared {string} and {string}',(regionName, headerMessage, bodyMessage)=>{
        utilityHelper.clickTableActionBasedOnCellValue(tbl_regionTable, regionName, btn_regionDeleteAction);

        //Verify the messages:
        cy.get('div[class*="MuiPaper-rounded"]').within((popup)=>{
                cy.wait(4000);
                cy.get('label').eq(0).invoke('text').should('equal',headerMessage);
                cy.get('label').eq(1).invoke('text').should('equal',bodyMessage);
        });
})

And('I clicked button "Do not delete" in regions delete dialog',()=>{
        cy.get('[data-cy="'+ btn_dontDeleteRegion +'"]',{timeout : 8000}).click();
})

Then('content disappeared, should not delete region {string} or change any data for row in table:',(regionName, dataTable)=>{
        // row should not be deleted and intact
        utilityHelper.verifyRowIsDeleted(tbl_regionTable, regionName, false);
        utilityHelper.verifyTableData(dataTable, tbl_regionTable);    
})

//delete region in country TestRegion
When('I delete region {string} in {string} -name of the country present in column {string}',(regionName, countryName, columnName)=>{

        //Search and Click on a country where region has to be deleted.
        utilityHelper.searchTableBasedOnColumn(tbl_countryTable, columnName, countryName); 
        cy.get('[data-cy="'+ tbl_countryTable +'"]', { timeout: 20000 }).within(()=>{
                cy.get('thead th').each(($header, headerIndex) => {
                        if($header.text() == columnName){
                                cy.get('tbody td').eq(headerIndex).contains(countryName).click();
                        }
                });
        });

        utilityHelper.clickTableActionBasedOnCellValue(tbl_regionTable, regionName, btn_regionDeleteAction);
        cy.get('[data-cy="'+ btn_deleteRegion +'"]',{timeout : 8000}).click();
})

Then('the row is removed from regions table for region {string} present in column {string}',(regionName, columnName)=>{
        utilityHelper.searchTableBasedOnColumn(tbl_regionTable, columnName, regionName);
        utilityHelper.verifyRowIsDeleted(tbl_regionTable, regionName, true);   
})