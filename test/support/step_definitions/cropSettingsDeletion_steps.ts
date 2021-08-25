import {​​​​​​​​ Given, Then, When, And, Before, After }​​​​​​​​ from"cypress-cucumber-preprocessor/steps";
import {​​​​​​​​ MainMenu_cy, SubMenu_cy, ExpandedMenu_cy }​​​​​​​​ from'../../fixtures/polaris_menu';
import * as utilityHelper from '../helper';
import * as cleanup from '../cleanAutomationData';
import { CropGroupsKey, CropGroupsValue, CropSubclassesValue, CropClassesValue, CropClassesKey, CropDescriptionsValue, CropSubclassesKey } from "../data/cropSettings_data";

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

//Add crop description data-cy-locators
const btn_addCropDescription            = 'addCropDescriptionButton'
const txt_cropDescriptionName           = 'cropDescriptionInputName'
const drp_cropSubclassName              = 'cropDescriptionSelectSubClass'
const txt_grainProtein                  = 'cropDescriptionInputProteinPercent'
const txt_atFarmCrop                    = 'cropDescriptionInputAtFarmCrop'
const btn_saveCropDescription           = 'cropDescriptionButtonSubmit'

//Tables data-cy-locators
const tbl_cropGroup             = 'cropGroupTable'
const tbl_cropClass             = 'cropClassTable'
const tbl_cropSubclass             = 'cropSubClassTable'

//Delete crop groups/class dialog data-cy-locatiors
const btn_cropGroupDeleteAction = 'cropGroupTableDeleteButton'
const btn_cropClassDeleteAction = 'cropClassTableDeleteButton'
const btn_cropSubclassDeleteAction = 'cropSubClassTableDeleteButton'


Before({tags:'@cropsettingsdeletion'}, function () {
    cy.logoutFromApplication();
    cy.loginToApplication().then(()=>{
        cleanup.deleteCropDescription(CropDescriptionsValue.cropDescriptionToDelete)
        cleanup.deleteCropSubclass(CropSubclassesValue.subclassToDelete)
        cleanup.deleteCropClass(CropClassesValue.classToDelete)
        cleanup.deleteCropGroup(CropGroupsValue.groupToDelete)
    })
});
  
Given('Logged as user with role Global admin and role Global settings and PolarisMaintenance', () => {​​​​​​​​
    cy.loginToApplication()
}​​​​​​​​)
 
When('I clicked to button "Global settings" and I clicked "Crop settings" submenus "Crops"', () => {​​​​​​​​
    utilityHelper.clickMenu(MainMenu_cy.globalSettings, SubMenu_cy.cropSettings, ExpandedMenu_cy.crops)
}​​​​​​​​)

//Add crop group
And('I create a crop group', () => {
    cy.get("div[aria-label=tabs]", {​​​​​​​​ timeout:10000 }​​​​​​​​).contains("Groups").click()
    cy.get('[data-cy="'+ btn_addCropGroup +'"]', {​​​​​​​​ timeout:10000 }​​​​​​​​).click()
    cy.get('[data-cy="'+ txt_cropGroupName +'"]').clear().type(CropGroupsValue.groupToDelete)
    cy.get('[data-cy="'+ btn_saveCropGroup +'"]').click()
})

And('I clicked tab {string}', (tabName) => {​​​​​​​​
    cy.get("div[aria-label=tabs]", {​​​​​​​​ timeout:10000 }​​​​​​​​).contains(tabName).click()
}​​​​​​​​)

//Add crop class
And('I create a crop class for crop group', () => {
    cy.get('[data-cy="'+ btn_addCropClass +'"]', { timeout: 10000 }).click()
    cy.get('[role=dialog]').should('be.visible')
    cy.get('[data-cy="'+ txt_cropClassName +'"]').clear().type(CropClassesValue.classToDelete)
    utilityHelper.setSingleDropdownValue(drp_cropGroupName, CropGroupsValue.groupToDelete)
    utilityHelper.setSingleDropdownValue(drp_growthScale, CropClassesValue.defaultGrowthScale)
    cy.get('[data-cy="'+ btn_saveCropClass +'"]').click()
})

Given('I am logged in and in crops page', () => {​​​​​​​​
    cy.url().should('include', 'crops') 
}​​​​​​​​)

And('I choose three dots in the end of row for crop group', () => {​​​​​​​​
    utilityHelper.searchTableBasedOnColumn(tbl_cropGroup, CropGroupsKey.groupsHeader, CropGroupsValue.groupToDelete);
    utilityHelper.clickOnAction(tbl_cropGroup, CropGroupsValue.groupToDelete)
}​​​​​​​​)

And('I clicked "Delete" and verify content appeared for deleting crop group', () => {​​​​​​​​
    cy.get('[data-cy="'+ btn_cropGroupDeleteAction +'"]').click()
    cy.wait(3000)
    utilityHelper.verifyDeletePopupMessage(CropGroupsValue.grpCannotDeleteHeader, CropGroupsValue.grpCannotDeleteBody)
}​​​​​​​​)

And('I clicked button <Ok> in crop group delete popup', () => {​​​​​​​​
    cy.get('[data-cy=cropGroupDeleteDialogCancelButton]').click()
}​​​​​​​​)

Then('Crop group is not deleted from table', () => {​​​​​​​​
    utilityHelper.searchTableBasedOnColumn(tbl_cropGroup, CropGroupsKey.groupsHeader, CropGroupsValue.groupToDelete);
    utilityHelper.verifyRowIsDeleted(tbl_cropGroup, CropGroupsValue.groupToDelete, false); 
}​​​​​​​​)

//Add crop subclass
And('I create a crop subclass for crop class', () => {
    cy.get('[data-cy="'+ btn_addCropSubclass +'"]', { timeout:10000}).click()
    cy.get('[role=dialog]').should('be.visible')
    cy.get('[data-cy="'+ txt_cropSubclassName +'"]').clear().type(CropSubclassesValue.subclassToDelete)
    utilityHelper.setSingleDropdownValue(drp_cropClassName, CropClassesValue.classToDelete)
    cy.get('[data-cy="'+ btn_saveCropSubclass +'"]').click()
    cy.wait(5000)
})

And('I choose three dots in the end of row for crop class', () => {​​​​​​​​
    utilityHelper.searchTableBasedOnColumn(tbl_cropClass, CropClassesKey.classesHeader, CropClassesValue.classToDelete);
    utilityHelper.clickOnAction(tbl_cropClass, CropClassesValue.classToDelete)
}​​​​​​​​)

And('I clicked "Delete" and verify content appeared for deleting crop class', () => {​​​​​​​​
    cy.get('[data-cy="'+ btn_cropClassDeleteAction +'"]').click()
    cy.wait(3000)
    utilityHelper.verifyDeletePopupMessage(CropClassesValue.classCannotDeleteHeader, CropClassesValue.classCannotDeleteBody)
}​​​​​​​​)

And('I clicked button <Ok> in crop class delete popup', () => {​​​​​​​​
    cy.get('[data-cy=cropClassDeleteDialogCancelButton]').click()
}​​​​​​​​)

Then('Crop class is not deleted from table', () => {​​​​​​​​
    utilityHelper.searchTableBasedOnColumn(tbl_cropClass, CropClassesKey.classesHeader, CropClassesValue.classToDelete);
    utilityHelper.verifyRowIsDeleted(tbl_cropClass, CropClassesValue.classToDelete, false); 
}​​​​​​​​)

//Add crop description
And('I create a crop description for crop subclass', () => {
    cy.get('[data-cy="'+ btn_addCropDescription +'"', {timeout:10000}).click()
    cy.get('[data-cy="'+ txt_cropDescriptionName +'"').clear().type(CropDescriptionsValue.cropDescriptionToDelete)
    utilityHelper.setSingleDropdownValue(drp_cropSubclassName, CropSubclassesValue.subclassToDelete)
    cy.get('[data-cy="'+ txt_grainProtein +'"').clear().type(CropDescriptionsValue.grainProtein)
    cy.get('[data-cy="'+ txt_atFarmCrop +'"').clear().type(CropDescriptionsValue.atfarmCrop)
    cy.get('[data-cy="'+ btn_saveCropDescription +'"').click()
    cy.wait(3000)
})

And('I choose three dots in the end of row for crop subclass', () => {​​​​​​​​
    utilityHelper.searchTableBasedOnColumn(tbl_cropSubclass, CropSubclassesKey.subclassesHeader, CropSubclassesValue.subclassToDelete);
    utilityHelper.clickOnAction(tbl_cropSubclass, CropSubclassesValue.subclassToDelete)
}​​​​​​​​)

And('I clicked "Delete" and verify content appeared for deleting crop subclass', () => {​​​​​​​​
    cy.get('[data-cy="'+ btn_cropSubclassDeleteAction +'"]').click()
    cy.wait(3000)
    utilityHelper.verifyDeletePopupMessage(CropSubclassesValue.subclassCannotDeleteHeader, CropSubclassesValue.subclassCannotDeleteBody)
}​​​​​​​​)

And('I clicked button <Ok> in crop subclass delete popup', () => {​​​​​​​​
    cy.get('[data-cy=cropSubClassDeleteDialogCancelButton]').click()
}​​​​​​​​)

Then('Crop subclass is not deleted from table', () => {​​​​​​​​
    utilityHelper.searchTableBasedOnColumn(tbl_cropSubclass, CropSubclassesKey.subclassesHeader, CropSubclassesValue.subclassToDelete);
    utilityHelper.verifyRowIsDeleted(tbl_cropSubclass, CropSubclassesValue.subclassToDelete, false); 
}​​​​​​​​)


