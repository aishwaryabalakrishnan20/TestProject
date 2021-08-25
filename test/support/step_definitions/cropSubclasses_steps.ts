import {​​​​​​​​ Given, Then, When, And, Before, After }​​​​​​​​ from"cypress-cucumber-preprocessor/steps";
import {​​​​​​​​ MainMenu_cy, SubMenu_cy, ExpandedMenu_cy }​​​​​​​​ from'../../fixtures/polaris_menu';
import * as utilityHelper from '../helper';
import * as cleanup from '../cleanAutomationData';
import { CropSubclassesKey, CropSubclassesValue } from "../data/cropSettings_data";

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

//Add crop subclass data-cy-locators
const btn_addCropSubclass       = 'addCropSubClassButton'
const txt_cropSubclassName      = 'cropSubClassInputName'
const drp_cropClassName         = 'cropSubClassSelectCropClass'
const btn_saveCropSubclass      = 'cropSubClassButtonSubmit'

//Edit crop subclass data-cy-locators
const btn_editCropSubclassCancel   = 'cropSubClassTableEditCancelButton'
const btn_editCropSubclassSave     = 'cropSubClassTableEditSaveButton'

//Crop subclass table and its actions data-cy-locators
const tbl_cropSubclass             = 'cropSubClassTable'
const btn_cropSubclassEditMenu     = 'cropSubClassTableEditMenu'
const btn_cropSubclassEditAction   = 'cropSubClassTableEditButton'
const btn_cropSubclassDeleteAction = 'cropSubClassTableDeleteButton'

//Delete crop subclass dialog data-cy-locators
const btn_dontDelete            = 'cropSubClassDeleteDialogCancelButton'
const btn_delete                = 'cropSubClassDeleteDialogConfirmButton'

Before({tags:'@cropsubclasses'}, function () {
    cy.logoutFromApplication();
    cy.loginToApplication().then(()=>{
        cleanup.deleteCropSubclass(CropSubclassesValue.newSubclassName)
        cleanup.deleteCropSubclass(CropSubclassesValue.subclassName)
        cleanup.deleteCropClass(CropSubclassesValue.className)
        cleanup.deleteCropGroup(CropSubclassesValue.groupName)
    })
})

Given('Logged as user with role Global admin and role Global settings and PolarisMaintenance in subclasses', () => {​​​​​​​​
    cy.loginToApplication()
}​​​​​​​​)
 
When('I clicked to button "Global settings" and I clicked "Crop settings" submenus "Crops" in subclasses', () => {​​​​​​​​
    utilityHelper.clickMenu(MainMenu_cy.globalSettings, SubMenu_cy.cropSettings, ExpandedMenu_cy.crops)
}​​​​​​​​)

//Add crop group
And('I create crop group {string} for subclasses', (groupName) => {
    cy.get("div[aria-label=tabs]", {​​​​​​​​ timeout:10000 }​​​​​​​​).contains("Groups").click()
    cy.get('[data-cy="'+ btn_addCropGroup +'"]', {​​​​​​​​ timeout:10000 }​​​​​​​​).click()
    cy.get('[data-cy="'+ txt_cropGroupName +'"]').clear().type(groupName)
    cy.get('[data-cy="'+ btn_saveCropGroup +'"]').click()
})

//Add crop class
And('I create crop class {string} for subclasses', (className) => {
    cy.get("div[aria-label=tabs]", {​​​​​​​​ timeout:10000 }​​​​​​​​).contains("Classes").click()
    cy.get('[data-cy="'+ btn_addCropClass +'"]', {​​​​​​​​ timeout:10000 }​​​​​​​​).click()
    cy.get('[data-cy="'+ txt_cropClassName +'"]').clear().type(className)
    utilityHelper.setSingleDropdownValue(drp_cropGroupName, CropSubclassesValue.groupName)
    utilityHelper.setSingleDropdownValue(drp_growthScale, CropSubclassesValue.growthscale)
    cy.get('[data-cy="'+ btn_saveCropClass +'"]').click()
})

//Add crop subclass
And('I clicked tab {string}', (tabName) => {​​​​​​​​
    cy.get("div[aria-label=tabs]", {​​​​​​​​ timeout:10000 }​​​​​​​​).contains(tabName).click()
}​​​​​​​​)

And('I create crop subclasses {string} and choose {string} in "Crop Class"', (subClassName, className) => {
    cy.get('[data-cy="'+ btn_addCropSubclass +'"]', { timeout:10000}).click()
    cy.get('[role=dialog]').should('be.visible')
    cy.get('[data-cy="'+ txt_cropSubclassName +'"]').clear().type(subClassName)
    utilityHelper.setSingleDropdownValue(drp_cropClassName, className)
    cy.get('[data-cy="'+ btn_saveCropSubclass +'"]').click()
    cy.wait(5000)
})

Then('I see tooltip {string} {string}', (headerMsg: string, bodyMsg: string) => {​​​​​​​​
    utilityHelper.verifyAlertToolTips(headerMsg, bodyMsg)
}​​​​​​​​)

And('I search for the crop subclass {string}', (subClassName) => {
    utilityHelper.searchTableBasedOnColumn(tbl_cropSubclass, CropSubclassesKey.subclassesHeader, subClassName)
})

And('Crop subclasses table row should be with data:', (datatable) => {
    utilityHelper.verifyTableData(datatable, tbl_cropSubclass)
})

Given('I am in Subclasses page', () => {
    cy.url().should('include', 'sub-classes')
})

//Decline delete crop subclass
When('I choose three dots in the end of row {string} in crop subclasses table, a context menu with options "Edit" and "Delete" shows', (subClassName) => {
    utilityHelper.isActionSubmenuVisibleBasedOnCellValue(tbl_cropSubclass, subClassName, btn_cropSubclassEditAction)
    utilityHelper.isActionSubmenuVisibleBasedOnCellValue(tbl_cropSubclass, subClassName, btn_cropSubclassDeleteAction)
    utilityHelper.clickOnAction(tbl_cropSubclass, subClassName)
})

And('I clicked "Delete" of crop subclass, a content appeared {string} {string}', (hdrMsg, bodyMsg) => {
    cy.get('[data-cy="'+ btn_cropSubclassDeleteAction +'"]').click()
    utilityHelper.verifyDeletePopupMessage(hdrMsg, bodyMsg)
})

And('I clicked button "Do not delete" of crop subclass', (btnName) => {
    cy.get('[data-cy="'+ btn_dontDelete +'"]'​​​​​​​).click()
})

Then('Crop subclasses table row should not be deleted:', (datatable) => {
    utilityHelper.verifyTableData(datatable, tbl_cropSubclass)
})

//Delete crop subclass
When('I delete crop subclasses {string}', (subClassName) => {
    utilityHelper.clickOnAction(tbl_cropSubclass, subClassName)
    cy.get('[data-cy="'+ btn_cropSubclassDeleteAction +'"]').click()
    cy.get('[data-cy="'+ btn_delete +'"]').click()
})

And('Crop subclass {string} is removed from table {string}', (subClassName, headerName) => {
    utilityHelper.searchTableBasedOnColumn(tbl_cropSubclass, headerName, subClassName)
    cy.get('[data-cy="'+ tbl_cropSubclass +'"] tbody tr[role="row"]').should('not.exist')
})

//Edit without saving changes
And('I clicked "Edit" subclass, edit mode for row is activated and two buttons <X> and <V> under the row became visible', () => {
    cy.get('[data-cy="'+ btn_cropSubclassEditAction +'"]').click()
})

And('I edited the crop subclasses details without saving', () => {
    utilityHelper.editTableData(tbl_cropSubclass, CropSubclassesKey.subclassesHeader, CropSubclassesValue.newSubclassName)
    utilityHelper.editTableData(tbl_cropSubclass, CropSubclassesKey.expressiveHeader, CropSubclassesValue.newExpressiveName)
})

And('I clicked red button <X> of crop subclass', () => {
    cy.get('[data-cy="'+ btn_editCropSubclassCancel +'"]').click({force:true})
})

Then('Edit mode for row is closed, no data were changed in crop subclass', (datatable) => {
    utilityHelper.verifyTableData(datatable, tbl_cropSubclass)
})

When('I edited the crop subclasses details with saving', () => {
    utilityHelper.clickOnAction(tbl_cropSubclass, CropSubclassesValue.subclassName)
    cy.get('[data-cy="'+ btn_cropSubclassEditAction +'"]').click()
    utilityHelper.editTableData(tbl_cropSubclass, CropSubclassesKey.subclassesHeader, CropSubclassesValue.newSubclassName)
    utilityHelper.editTableData(tbl_cropSubclass, CropSubclassesKey.expressiveHeader, CropSubclassesValue.newExpressiveName)
})

And('I clicked green button <V> of crop subclass', () => {
    cy.get('[data-cy="'+ btn_editCropSubclassSave +'"]').click({force:true})
})