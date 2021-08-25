import {​​​​​​​​ Given, Then, When, And, Before, After }​​​​​​​​ from"cypress-cucumber-preprocessor/steps";
import {​​​​​​​​ MainMenu_cy, SubMenu_cy, ExpandedMenu_cy }​​​​​​​​ from'../../fixtures/polaris_menu';
import * as utilityHelper from '../helper';
import * as cleanup from '../cleanAutomationData';
import { CropClassesKey, CropClassesValue } from "../data/cropSettings_data";

//Add crop groups data-cy-locators
const btn_addCropGroup          = 'addCropGroupButton'
const txt_cropGroupName         = 'cropGroupFormInputName'
const btn_saveCropGroup         = 'cropGroupFormButtonSubmit'

//Add crop class data-cy-locators
const btn_addCropClass          = 'addCropClassButton'
const txt_cropClassName         = 'cropClassFormInputName'
const drp_cropGroupName         = 'cropClassFormSelectGroup'
const drp_growthScale           = 'cropClassFormSelectGrowthScale'
const btn_saveCropClass         = 'cropClassFormButtonSubmit'

//Edit crop class data-cy-locators
const btn_editCropClassCancel   = 'cropClassTableEditCancelButton'
const btn_editCropClassSave     = 'cropClassTableEditSaveButton'

//Crop classes table and its actions data-cy-locators
const tbl_cropClass             = 'cropClassTable'
const btn_cropClassEditMenu     = 'cropClassTableEditMenu'
const btn_cropClassEditAction   = 'cropClassTableEditButton'
const btn_cropClassDeleteAction = 'cropClassTableDeleteButton'

//Delete crop class dialog data-cy-locators
const btn_dontDelete            = 'cropClassDeleteDialogCancelButton'
const btn_delete                = 'cropClassDeleteDialogConfirmButton'


Before({tags:'@cropclass'}, function () {
    cy.logoutFromApplication();
    cy.loginToApplication().then(()=>{
        cleanup.deleteCropClass(CropClassesValue.newClassName)
        cleanup.deleteCropClass(CropClassesValue.className)
        cleanup.deleteCropGroup(CropClassesValue.groupName)
    })
});

// After({tags:'@cropclass'}, function(){
//     cy.visit('/');
//     cy.wait(6000);
//     cy.xpath("//label[text()='Profile']/parent::div").find('svg').click({force:true});
//     cy.contains('span','Log out').click({force:true});
//     cy.wait(2000);
// });
  
Given('Logged as user with role Global admin and role Global settings and PolarisMaintenance', () => {​​​​​​​​
    cy.loginToApplication()
}​​​​​​​​)
 
When('I clicked to button "Global settings" and I clicked "Crop settings" submenus "Crops"', () => {​​​​​​​​
    utilityHelper.clickMenu(MainMenu_cy.globalSettings, SubMenu_cy.cropSettings, ExpandedMenu_cy.crops)
}​​​​​​​​)

//Add crop group
And('I create crop group for crop classes', () => {
    cy.get("div[aria-label=tabs]", {​​​​​​​​ timeout:10000 }​​​​​​​​).contains("Groups").click()
    cy.get('[data-cy="'+ btn_addCropGroup +'"]', {​​​​​​​​ timeout:10000 }​​​​​​​​).click()
    cy.get('[data-cy="'+ txt_cropGroupName +'"]').clear().type(CropClassesValue.groupName)
    cy.get('[data-cy="'+ btn_saveCropGroup +'"]').click()
})

//Add crop class
And('I clicked tab {string}', (tabName) => {​​​​​​​​
    cy.get("div[aria-label=tabs]", {​​​​​​​​ timeout:10000 }​​​​​​​​).contains(tabName).click()
}​​​​​​​​)

And('I create a crop class {string} and choose {string} in "Crop Group" and {string} in "Default growth scale"', (className, groupName, defaultGrowthScale) => {
    cy.get('[data-cy="'+ btn_addCropClass +'"]', { timeout: 10000 }).click()
    cy.get('[role=dialog]').should('be.visible')
    cy.get('[data-cy="'+ txt_cropClassName +'"]').clear().type(className)
    utilityHelper.setSingleDropdownValue(drp_cropGroupName, groupName)
    utilityHelper.setSingleDropdownValue(drp_growthScale, defaultGrowthScale)
    cy.get('[data-cy="'+ btn_saveCropClass +'"]').click()
    cy.wait(5000)
})

Then('I see tooltip {string} {string}', (headerMsg: string, bodyMsg: string) => {​​​​​​​​
    utilityHelper.verifyAlertToolTips(headerMsg, bodyMsg)
}​​​​​​​​)

And('I search for the crop class {string}', (className: any) => {
    utilityHelper.searchTableBasedOnColumn(tbl_cropClass, CropClassesKey.classesHeader, className)
})

And('Crop classes table row should be with data:', async(datatable) => {
    utilityHelper.verifyTableData(datatable, tbl_cropClass)
})

Given('I am in Classes page', () => {
    cy.url().should('include', 'classes')
})

//Decline delete crop class
When('I choose three dots in the end of row {string} in crop classes table, a context menu with options "Edit" and "Delete" shows', (className) => {
    utilityHelper.isActionSubmenuVisibleBasedOnCellValue(tbl_cropClass, className, btn_cropClassEditAction)
    utilityHelper.isActionSubmenuVisibleBasedOnCellValue(tbl_cropClass, className, btn_cropClassDeleteAction)
    utilityHelper.clickOnAction(tbl_cropClass, className)
})

And('I clicked "Delete" of crop class, a content appeared {string} {string}', (hdrMsg, bodyMsg) => {
    cy.get('[data-cy="'+ btn_cropClassDeleteAction +'"]').click()
    utilityHelper.verifyDeletePopupMessage(hdrMsg, bodyMsg)
})

And('I clicked button "Do not delete" of crop class', () => {
    cy.get('[data-cy="'+ btn_dontDelete +'"]'​​​​​​​).click()
})

Then('Crop classes table row should not be deleted:', (datatable) => {
    utilityHelper.verifyTableData(datatable, tbl_cropClass)
})

//Delete crop class
When('I delete crop class {string}', (className) => {
    utilityHelper.clickOnAction(tbl_cropClass, className)
    cy.get('[data-cy="'+ btn_cropClassDeleteAction +'"]').click()
    cy.get('[data-cy="'+ btn_delete +'"]').click()
})

And('Crop class {string} is removed from table {string}', (className, headerName) => {
    utilityHelper.searchTableBasedOnColumn(tbl_cropClass, headerName, className)
    cy.get('[data-cy="'+ tbl_cropClass +'"] tbody tr[role="row"]').should('not.exist')
})

//Edit without saving changes
And('I clicked "Edit" class, edit mode for row is activated and two buttons <X> and <V> under the row became visible', () => {
    cy.get('[data-cy="'+ btn_cropClassEditAction +'"]').click()
})

And('I edited the crop class details without saving', () => {
    utilityHelper.editTableData(tbl_cropClass, CropClassesKey.classesHeader, CropClassesValue.newClassName)
    utilityHelper.editTableData(tbl_cropClass, CropClassesKey.expressiveHeader, CropClassesValue.expressiveName)
})

And('I clicked red button <X> of crop class', () => {
    cy.get('[data-cy="'+ btn_editCropClassCancel +'"]').click({force:true})
})

Then('Edit mode for row is closed, no data were changed in crop class', (datatable) => {
    utilityHelper.verifyTableData(datatable, tbl_cropClass)
})

//Edit with saving changes
When('I edited the crop class details with saving', () => {
    utilityHelper.clickOnAction(tbl_cropClass, CropClassesValue.className)
    cy.get('[data-cy="'+ btn_cropClassEditAction +'"]').click()
    utilityHelper.editTableData(tbl_cropClass, CropClassesKey.classesHeader, CropClassesValue.newClassName)
    utilityHelper.editTableData(tbl_cropClass, CropClassesKey.expressiveHeader, CropClassesValue.expressiveName)
})

And('I clicked green button <V> of crop class', () => {
    cy.get('[data-cy="'+ btn_editCropClassSave +'"]').click({force:true})
})
