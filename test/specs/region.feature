Feature: Regions
Add, edit and delete regions

Background: I am in countries page and adding a country and a region
    Given Logged as user with role Global admin and role Global settings and PolarisMaintenance
    And I clicked button "Global settings" and I clicked button "Locations"
        #Add a country
    When I create new country with following details:
        |Country Name|Country Code|Currency|Which Unit System Is Using|Wind Speed Unit|Precipitation Amount Unit|Evapotranspiration Unit|Qpf Snow Amount Unit|Temperature Unit|Dew Point Unit|ProductSetCode (Optional)|Solutions (Optional)|
        |TestRegionCountry       |TS         |AFN     |Metric    | km/h       |     mm      |          mm           |         cm           |      °C       |      °C    |      33      |  CNP     | 
    And I click "Save" and I should see tooltip text "Country added!" and "The new country has been successfully added to the global list."
    Then in Country Table a row should be added for country "TestRegionCountry" with following data:
        |Name        |CountryCode|CurrencyCode|ProductSetCode|Solutions|Translationkey        |LastMod.|Actions|
        |TestRegionCountry        |     TS     |   AFN     |       33     |   CNP   | country.testregioncountry         |    ?   |  ···  |
    And I move back to "Countries" page
        #Add a region    
    When I add region "All Automation" for country "TestRegionCountry" present in column "Name"
    And I click "Save" and I should see tooltip text "Region added!" and "The new region has been successfully added to the global list." for region
    Then in Region Table a row should be added for region "All Automation" with following data:
        |Name|      Translationkey          |Lastmod.|Actions|
        |All Automation |region.testregioncountry_all_automation         |  ?     | ···   |
    And I move back to "Countries" page

@region        
Scenario: Adding duplicated region
    Given I am in "Countries" page
    When I click on "TestRegionCountry" ,name of the country present in column "Name" in countries list, a list with regions are loaded
    And I add region "All Automation" for country "TestRegionCountry"
    And I click "Save" and an error message "Name All Automation is used for another Region" displays under field "Region Name"
    And a modal is open, should not save the region with name "All Automation"

@region
Scenario: Edit region without saving data and saving data
    Given I am in "Countries" page
        #Edit region in country Test without saving data        
    When I click on "TestRegionCountry" ,name of the country present in column "Name" in countries list, a list with regions are loaded
    And I click three dots in the end of row or in column Action for region "All Automation" present in column "Name" a context menu with options "Edit" and "Delete" shows 
    And I choose "Edit" a modal appeared with following data for region "All Automation":
        |RegionName|
        |All Automation       |
    And I typed "Ala Bala" in field "Region Name"
    And I clicked button <X> in right up corner of modal "Edit Region"
    Then modal disappeared, should not change any data for region "All Automation":
        |RegionName|Translationkey          |LastMod.|Actions|
        |All Automation       | region.testregioncountry_all_automation  |    ?   |  ···  |              
        #Edit region in country Test and saving data
    And I move back to "Countries" page
    When I edit region "All Automation" as "All Automation Test" in "TestRegionCountry" name of the country present in column "Name"
    And I click "Save" and I should see tooltip text "Changes saved" and "The changes done to the table row have been successfully saved." for region
    Then in Region Table a row should be added with following data:
        |Name     |Translation key           |Last mod.|Actions |
        |All Automation Test |region.testregioncountry_all_automation_test|  ?      | ···    |

@region
Scenario: Delete country with added regions
    Given I am in "Countries" page
    When I click three dots in the end of row or in column Action for country "TestRegionCountry" present in column "Name" a context menu with options "Edit" and "Delete" shows
    And I choose "Delete" for country "TestRegionCountry" a content appeared "Please note!" and "The country cannot be deleted as it has regions."
    And I clicked button "Ok"
    Then content disappeared, should not delete country "TestRegionCountry" or change any data for row in table:
        |Name       |CountryCode|CurrencyCode|ProductSetCode|Solutions|Translationkey    |Lastmod.|Actions|
        |TestRegionCountry |     TS    |   AFN      |       33     |CNP      |country.testregioncountry|    ?   |  ···  |

@region
Scenario: Delete region without saving the data and saving the data
    Given I am in "Countries" page
    When I click on "TestRegionCountry" ,name of the country present in column "Name" in countries list, a list with regions are loaded
    And I click three dots in the end of row or in column Action for region "All Automation" present in column "Name" a context menu with options "Edit" and "Delete" shows 
    And I choose "Delete" for region "All Automation" a content appeared "Please note!" and "Are you sure you want to delete All Automation? The action cannot be reverted."
    And I clicked button "Do not delete" in regions delete dialog
    Then content disappeared, should not delete region "All Automation" or change any data for row in table:
        |Name     |Translation key            |Last mod.|Actions |
        |All Automation |region.testregioncountry_all_automation|  ?      | ···    |
        #delete region in country TestRegion
    And I move back to "Countries" page
    When I delete region "All Automation" in "TestRegionCountry" -name of the country present in column "Name"
    # Then I see tooltip text "Region deleted" and "The region has been removed. The region can anyway be added again."
    Then the row is removed from regions table for region "All Automation" present in column "Name"
