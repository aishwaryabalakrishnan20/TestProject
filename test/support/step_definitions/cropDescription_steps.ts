import {​​​​​​​​ Given, Then, When, And, Before, After }​​​​​​​​ from"cypress-cucumber-preprocessor/steps";
import {​​​​​​​​ MainMenu_cy, SubMenu_cy, ExpandedMenu_cy }​​​​​​​​ from'../../fixtures/polaris_menu';
import * as utilityHelper from '../helper';
import * as cleanup from '../cleanAutomationData';
import { CropSubclassesKey, CropSubclassesValue } from "../data/cropSettings_data";
import { CropDescriptionsKey, CropDescriptionsValue } from "../data/cropSettings_data";

//Add crop groups data-cy-locators
const btn_addCropGroup                  = 'addCropGroupButton'
const txt_cropGroupName                 = 'cropGroupFormInputName'
const btn_saveCropGroup                 = 'cropGroupFormButtonSubmit'

//Add crop class data-cy-locators
const btn_addCropClass                  = 'addCropClassButton'
const txt_cropClassName                 = 'cropClassFormInputName'
const drp_cropGroupName                 = 'cropClassFormSelectGroup'
const drp_growthScale                   = 'cropClassFormSelectGrowthScale'
const btn_saveCropClass                 = 'cropClassFormButtonSubmit'

//Add crop subclass data-cy-locators
const btn_addCropSubclass               = 'addCropSubClassButton'
const txt_cropSubclassName              = 'cropSubClassInputName'
const drp_cropClassName                 = 'cropSubClassSelectCropClass'
const btn_saveCropSubclass              = 'cropSubClassButtonSubmit'

//Add crop description data-cy-locators
const btn_addCropDescription            = 'addCropDescriptionButton'
const txt_cropDescriptionName           = 'cropDescriptionInputName'
const drp_cropSubclassName              = 'cropDescriptionSelectSubClass'
const txt_grainProtein                  = 'cropDescriptionInputProteinPercent'
const txt_atFarmCrop                    = 'cropDescriptionInputAtFarmCrop'
const btn_saveCropDescription           = 'cropDescriptionButtonSubmit'

//Edit crop description data-cy-locators
const btn_editCropDescriptionCancel     = 'cropDescriptionTableEditCancelButton'
const btn_editCropDescriptionSave       = 'cropDescriptionTableEditSaveButton'

//Crop description table and its actions data-cy-locators
const tbl_cropDescription               = 'cropDescriptionTable'
const btn_cropDescriptionEditMenu       = 'cropDescriptionTableEditMenu'
const btn_cropDescriptionEditAction     = 'cropDescriptionTableEditButton'
const btn_cropDescriptionDeleteAction   = 'cropDescriptionTableDeleteButton'

//Delete crop description data-cy-locators
const btn_dontDelete                    = 'cropDescriptionDeleteDialogCancelButton'
const btn_delete                        = 'cropDescriptionDeleteDialogConfirmButton'

Before({tags:'@cropdescriptions'}, function () {
    cy.logoutFromApplication();
    cy.loginToApplication().then(()=>{
        cleanup.deleteCropDescription(CropDescriptionsValue.newDescriptionName)
        cleanup.deleteCropDescription(CropDescriptionsValue.descriptionName)
        cleanup.deleteCropSubclass(CropDescriptionsValue.subclassName)
        cleanup.deleteCropClass(CropDescriptionsValue.className)
        cleanup.deleteCropGroup(CropDescriptionsValue.groupName)
    })
})

Given('Logged as user with role Global admin and role Global settings and PolarisMaintenance in subclasses', () => {​​​​​​​​
    cy.loginToApplication()
}​​​​​​​​)
 
When('I clicked to button "Global settings" and I clicked "Crop settings" submenus "Crops" in subclasses', () => {​​​​​​​​
    utilityHelper.clickMenu(MainMenu_cy.globalSettings, SubMenu_cy.cropSettings, ExpandedMenu_cy.crops)
}​​​​​​​​)

//Add crop group
And('I create crop group {string} for crop description', (groupName) => {
    cy.get("div[aria-label=tabs]", {​​​​​​​​ timeout:10000 }​​​​​​​​).contains("Groups").click()
    cy.get('[data-cy="'+ btn_addCropGroup +'"]', {​​​​​​​​ timeout:10000 }​​​​​​​​).click()
    cy.get('[data-cy="'+ txt_cropGroupName +'"]').clear().type(groupName)
    cy.get('[data-cy="'+ btn_saveCropGroup +'"]').click()
})

//Add crop class
And('I create crop class {string} for crop description', (className) => {
    cy.get("div[aria-label=tabs]", {​​​​​​​​ timeout:10000 }​​​​​​​​).contains("Classes").click()
    cy.get('[data-cy="'+ btn_addCropClass +'"]', {​​​​​​​​ timeout:10000 }​​​​​​​​).click()
    cy.get('[data-cy="'+ txt_cropClassName +'"]').clear().type(className)
    utilityHelper.setSingleDropdownValue(drp_cropGroupName, CropDescriptionsValue.groupName)
    utilityHelper.setSingleDropdownValue(drp_growthScale, CropDescriptionsValue.growthscale)
    cy.get('[data-cy="'+ btn_saveCropClass +'"]').click()
})

//Add crop subclass
And('I create crop subclass {string} for crop description', (subClassName) => {
    cy.get("div[aria-label=tabs]", {​​​​​​​​ timeout:10000 }​​​​​​​​).contains("Subclasses").click()
    cy.get('[data-cy="'+ btn_addCropSubclass +'"]', { timeout:10000}).click()
    cy.get('[data-cy="'+ txt_cropSubclassName +'"]').clear().type(subClassName)
    utilityHelper.setSingleDropdownValue(drp_cropClassName, CropDescriptionsValue.className)
    cy.get('[data-cy="'+ btn_saveCropSubclass +'"]').click()
})

//Add crop description
When('I clicked tab {string}', (tabName) => {​​​​​​​​
    cy.get("div[aria-label=tabs]", {​​​​​​​​ timeout:10000 }​​​​​​​​).contains(tabName).click()
}​​​​​​​​)

And('I create crop description {string} and choose {string} in "Crop Subclass" and  typed {string} in "Grain protein" & {string} in "AtFarm Crop"', (descriptionName, subclassName, grainProtein, atFarmCrop) => {
    cy.get('[data-cy="'+ btn_addCropDescription +'"', {timeout:10000}).click()
    cy.get('[data-cy="'+ txt_cropDescriptionName +'"').clear().type(descriptionName)
    utilityHelper.setSingleDropdownValue(drp_cropSubclassName, subclassName)
    cy.get('[data-cy="'+ txt_grainProtein +'"').clear().type(grainProtein)
    cy.get('[data-cy="'+ txt_atFarmCrop +'"').clear().type(atFarmCrop)
    cy.get('[data-cy="'+ btn_saveCropDescription +'"').click()
    cy.wait(3000)
})

Then('I see tooltip {string} {string}', (headerMsg: string, bodyMsg: string) => {​​​​​​​​
    utilityHelper.verifyAlertToolTips(headerMsg, bodyMsg)
}​​​​​​​​)

And('I search for the crop description {string}', (descriptionName) => {
    utilityHelper.searchTableBasedOnColumn(tbl_cropDescription, CropDescriptionsKey.descriptionHeader, descriptionName)
})

And('Crop description table row should be with data:', (datatable) => {
    utilityHelper.verifyTableData(datatable, tbl_cropDescription)
})

Given('I am in Description page', () => {
    cy.url().should('include', 'descriptions')
})

//Decline delete crop description
When('I choose three dots in the end of row {string} in crop descriptions table, a context menu with options "Edit" and "Delete" shows', (descriptionName) => {
    utilityHelper.isActionSubmenuVisibleBasedOnCellValue(tbl_cropDescription, descriptionName, btn_cropDescriptionEditAction)
    utilityHelper.isActionSubmenuVisibleBasedOnCellValue(tbl_cropDescription, descriptionName, btn_cropDescriptionDeleteAction)
    utilityHelper.clickOnAction(tbl_cropDescription, descriptionName)
})

And('I clicked "Delete" of crop description, a content appeared {string} {string}', (hdrMsg, bodyMsg) => {
    cy.get('[data-cy="'+ btn_cropDescriptionDeleteAction +'"]').click()
    utilityHelper.verifyDeletePopupMessage(hdrMsg, bodyMsg)
})

And('I clicked button "Do not delete" of crop description', () => {
    cy.get('[data-cy="'+ btn_dontDelete +'"]'​​​​​​​).click()
})

Then('Crop descriptions table row should not be deleted:', (datatable) => {
    utilityHelper.verifyTableData(datatable, tbl_cropDescription)
})

//Delete crop description
When('I delete crop description {string}', (descriptionName) => {
    utilityHelper.clickOnAction(tbl_cropDescription, descriptionName)
    cy.get('[data-cy="'+ btn_cropDescriptionDeleteAction +'"]').click()
    cy.get('[data-cy="'+ btn_delete +'"]'​​​​​​​).click()
    cy.wait(5000) //temporary - have to remove this once tooltip issue is resolved
})

And('Crop description {string} is removed from table {string}', (descriptionName, headerName) => {
    utilityHelper.searchTableBasedOnColumn(tbl_cropDescription, headerName, descriptionName)
    cy.get('[data-cy="'+ tbl_cropDescription +'"] tbody tr[role="row"]').should('not.exist')
})

And('I clicked "Edit" description, edit mode for row is activated and two buttons <X> and <V> under the row became visible', () => {
    cy.get('[data-cy="'+ btn_cropDescriptionEditAction +'"]').click()
})

And('I edited the crop description details without saving', () => {
    utilityHelper.editTableData(tbl_cropDescription, CropDescriptionsKey.descriptionHeader, CropDescriptionsValue.newDescriptionName)
    utilityHelper.editTableData(tbl_cropDescription, CropDescriptionsKey.expressiveHeader, CropDescriptionsValue.newExpressiveName)
    utilityHelper.editTableDropdownData(tbl_cropDescription, CropDescriptionsKey.chlorideSensitive, CropDescriptionsValue.isChlorideSensitive)
    utilityHelper.editTableData(tbl_cropDescription, CropDescriptionsKey.grainProtein, CropDescriptionsValue.newGrainProtein)
    utilityHelper.editTableData(tbl_cropDescription, CropDescriptionsKey.atFarm, CropDescriptionsValue.newAtFarm)
})

And('I clicked red button <X> of crop description', () => {
    cy.get('[data-cy="'+ btn_editCropDescriptionCancel +'"]').click({force:true})
})

Then("Edit mode for row is closed, no data were changed in crop description", (datatable) => {
    utilityHelper.verifyTableData(datatable, tbl_cropDescription)
})

//Edit with saving
When('I edited the crop description details with saving', () => {
    utilityHelper.clickOnAction(tbl_cropDescription, CropDescriptionsValue.descriptionName)
    cy.get('[data-cy="'+ btn_cropDescriptionEditAction +'"]').click()
    utilityHelper.editTableData(tbl_cropDescription, CropDescriptionsKey.descriptionHeader, CropDescriptionsValue.newDescriptionName)
    utilityHelper.editTableData(tbl_cropDescription, CropDescriptionsKey.expressiveHeader, CropDescriptionsValue.newExpressiveName)
    utilityHelper.editTableDropdownData(tbl_cropDescription, CropDescriptionsKey.chlorideSensitive, CropDescriptionsValue.isChlorideSensitive)
    utilityHelper.editTableData(tbl_cropDescription, CropDescriptionsKey.grainProtein, CropDescriptionsValue.newGrainProtein)
    utilityHelper.editTableData(tbl_cropDescription, CropDescriptionsKey.atFarm, CropDescriptionsValue.newAtFarm)
})

And('I clicked green button <V> of crop description', () => {
    cy.get('[data-cy="'+ btn_editCropDescriptionSave +'"]').click({force:true})
})