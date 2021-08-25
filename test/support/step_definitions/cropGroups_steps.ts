import {​​​​​​​​ Given, Then, When, And, Before, After }​​​​​​​​ from"cypress-cucumber-preprocessor/steps";
import {​​​​​​​​ MainMenu_cy, SubMenu_cy, ExpandedMenu_cy }​​​​​​​​ from'../../fixtures/polaris_menu';
import * as utilityHelper from '../helper';
import * as cleanup from '../cleanAutomationData';
import { CropGroupsKey, CropGroupsValue } from "../data/cropSettings_data";
 
//Add crop groups data-cy-locators
const btn_addCropGroup          = 'addCropGroupButton'
const txt_cropGroupName         = 'cropGroupFormInputName'
const btn_saveCropGroup         = 'cropGroupFormButtonSubmit'

//Edit crop groups data-cy-locators
const btn_editCropGroupCancel   = 'cropGroupTableEditCancelButton'
const btn_editCropGroupSave     = 'cropGroupTableEditSaveButton'

//Crop groups table and its actions data-cy-locators
const tbl_cropGroup             = 'cropGroupTable'
const btn_cropGroupEditMenu     = 'cropGroupTableEditMenu'
const btn_cropGroupEditAction   = 'cropGroupTableEditButton'
const btn_cropGroupDeleteAction = 'cropGroupTableDeleteButton'

//Delete crop groups dialog data-cy-locatiors
const btn_dontDelete            = 'cropGroupDeleteDialogCancelButton'
const btn_delete                = 'cropGroupDeleteDialogConfirmButton'

Before({tags:'@cropgroup'}, function() {
    cy.logoutFromApplication();
    cy.loginToApplication().then(()=>{
        cleanup.deleteCropGroup(CropGroupsValue.groupName)
        cleanup.deleteCropGroup(CropGroupsValue.newGroupName)
    })
});

Given('Logged as user with role Global admin and role Global settings and PolarisMaintenance', () => {​​​​​​​​
    cy.loginToApplication()
}​​​​​​​​)
 
When('I clicked to button "Global settings" and I clicked "Crop settings" submenus "Crops"', () => {​​​​​​​​
    utilityHelper.clickMenu(MainMenu_cy.globalSettings, SubMenu_cy.cropSettings, ExpandedMenu_cy.crops);
}​​​​​​​​)

And('I clicked tab {string}', (tabName) => {​​​​​​​​
    cy.get("div[aria-label=tabs]", {​​​​​​​​ timeout:10000 }​​​​​​​​).contains(tabName).click()
}​​​​​​​​)
 
//Adding crop group
And('I create a crop group {string}', (groupName) => {​​​​​​​​
    cy.get('[data-cy="'+ btn_addCropGroup +'"]', {​​​​​​​​ timeout:10000 }​​​​​​​​).click();
    cy.get('[data-cy="'+ txt_cropGroupName +'"]').clear().type(groupName)
    cy.get('[data-cy="'+ btn_saveCropGroup +'"]'​​​​​​​​).click()
}​​​​​​​​)
 
Then('I see tooltip {string} {string}', (headerMsg: string, bodyMsg: string) => {​​​​​​​​
    utilityHelper.verifyAlertToolTips(headerMsg, bodyMsg)
}​​​​​​​​)

And('I search for the crop group {string}', (groupName: any) => {​​​​​​​​
    utilityHelper.searchTableBasedOnColumn(tbl_cropGroup, CropGroupsKey.groupsHeader, groupName);
}​​​​​​​​)

And('Crop groups table row should be with data:', async (datatable) => {​​​​​​​​
    utilityHelper.verifyTableData(datatable, tbl_cropGroup)
}​​​​​​​​)

//Decline delete crop group
Given('I am in Groups page', () => {​​​​​​​​
    cy.url().should('include', 'groups')
}​​​​​​​​)

When('I choose three dots in the end of row {string} in crop groups table, a context menu with options "Edit" and "Delete" shows', (groupName: any) => {​​​​​​​​
    utilityHelper.isActionSubmenuVisibleBasedOnCellValue(tbl_cropGroup, groupName, btn_cropGroupEditAction)
    utilityHelper.isActionSubmenuVisibleBasedOnCellValue(tbl_cropGroup, groupName, btn_cropGroupDeleteAction)
    utilityHelper.clickOnAction(tbl_cropGroup, groupName)
}​​​​​​​​)
 
And('I clicked "Delete" of crop group, a content appeared {string} {string}', (hdrMsg, bodyMsg) => {​​​​​​​​
    cy.get('[data-cy="'+ btn_cropGroupDeleteAction +'"]').click()
    utilityHelper.verifyDeletePopupMessage(hdrMsg, bodyMsg)
}​​​​​​​​)
 
And('I clicked button "Do not delete" of crop group'​​​, () => {​​​​​​​​
    cy.get('[data-cy="'+ btn_dontDelete +'"]'​​​​​​​).click();
}​​​​​​​​)
 
Then('Crop groups table row should not be deleted:', async (datatable) => {​​​​​​​​
    utilityHelper.verifyTableData(datatable, tbl_cropGroup)
}​​​​​​​​)
 
//Delete crop group
When('I delete crop group {string}', (groupName) => {​​​​​​​​
    utilityHelper.clickOnAction(tbl_cropGroup, groupName)
    cy.get('[data-cy="'+ btn_cropGroupDeleteAction +'"]').click();
    cy.get('[data-cy="'+ btn_delete +'"]').click()
}​​​​​​​​)
 
And('Crop group {string} is removed from table {string}', (groupName, headerName) => {​​​​​​​​
    utilityHelper.searchTableBasedOnColumn(tbl_cropGroup, headerName, groupName);
    cy.get('[data-cy="'+ tbl_cropGroup +'"] tbody tr[role="row"]').should('not.exist'); 
}​​​​​​​​)

//Edit without saving changes
And('I clicked "Edit" group, edit mode for row is activated and two buttons <X> and <V> under the row became visible', () => {
    cy.get('[data-cy="'+ btn_cropGroupEditAction +'"]').click()
})

And('I edited the crop group details without saving', ()=>{​​​​​​​​
    utilityHelper.editTableData(tbl_cropGroup, CropGroupsKey.groupsHeader, CropGroupsValue.newGroupName)
    utilityHelper.editTableData(tbl_cropGroup, CropGroupsKey.expressiveHeader, CropGroupsValue.expressiveName)
}​​​​​​​​)

And('I clicked red button <X> of crop group', () => {
    cy.get('[data-cy="'+ btn_editCropGroupCancel +'"]').click({force:true})
})

And('Edit mode for row is closed, no data were changed in crop group', async (datatable) => {​​​​​​​​
    utilityHelper.verifyTableData(datatable, tbl_cropGroup)
}​​​​​​​​)

//Edit with saving changes
And('I edited the crop group details with saving', ()=>{​​​​​​​​
    utilityHelper.clickOnAction(tbl_cropGroup, CropGroupsValue.groupName)
    cy.get('[data-cy="'+ btn_cropGroupEditAction +'"]').click()
    utilityHelper.editTableData(tbl_cropGroup, CropGroupsKey.groupsHeader, CropGroupsValue.newGroupName)
    utilityHelper.editTableData(tbl_cropGroup, CropGroupsKey.expressiveHeader, CropGroupsValue.expressiveName)
}​​​​​​​​)

And('I clicked green button <V> of crop group', () => {
    cy.get('[data-cy="'+ btn_editCropGroupSave +'"]').click({force:true})
})
