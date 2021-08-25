Feature: Global crop - crop subclasses
    Add, edit and delete crop Description

    Background: Adding crop group, crop class, crop subclass, crop description
        Given Logged as user with role Global admin and role Global settings and PolarisMaintenance
        When I clicked to button "Global settings" and I clicked "Crop settings" submenus "Crops"
        #Add crop group
        And I create crop group "TestDescriptionGroup" for crop description
        #Add crop class
        And I create crop class "TestDescriptionClass" for crop description
        #Add crop subclass
        And I create crop subclass "TestDescriptionSubclass" for crop description

        #Add crop description
        When I clicked tab "Crop Descriptions"
        And I create crop description "TestCrop" and choose "TestDescriptionSubclass" in "Crop Subclass" and  typed "11" in "Grain protein" & "Test AtFarm" in "AtFarm Crop"
        Then I see tooltip "Crop added!" "The new crop has been successfully added to the global list."
        And I search for the crop description "TestCrop"
        And Crop description table row should be with data:
            |Description|Crop Subclass              |Crop Class             |              Translation key                      |     Expressive name              |Chloride sensitive|Grain protein|AtFarm Crop|Last mod.|Actions|
            |TestCrop   |TestDescriptionSubclass    |TestDescriptionClass   |crop.description.testdescriptionsubclass_testcrop  |TESTDESCRIPTIONSUBCLASS_TESTCROP  |      No          |      11     |Test AtFarm|     ?   |  ···  |

    @cropdescriptions
    Scenario: Crop Description - Decline Delete, Delete
        #Decline Delete
        Given I am in Description page
        When I choose three dots in the end of row "TestCrop" in crop descriptions table, a context menu with options "Edit" and "Delete" shows
        And I clicked "Delete" of crop description, a content appeared "Please note!" "Are you sure you want to delete TestCrop? The action cannot be reverted."
        And I clicked button "Do not delete" of crop description
        Then Crop descriptions table row should not be deleted:
            |Description|Crop Subclass              |Crop Class             |              Translation key                       |     Expressive name              |Chloride sensitive|Grain protein|AtFarm Crop|Last mod.|Actions|
            |TestCrop   |TestDescriptionSubclass    |TestDescriptionClass   |crop.description.testdescriptionsubclass_testcrop   |TESTDESCRIPTIONSUBCLASS_TESTCROP  |      No          |      11     |Test AtFarm|     ?   |  ···  |
        #Delete crop description
        When I delete crop description "TestCrop"
        # Then I see tooltip "Crop deleted" "The crop has been removed.The crop can anyway be added again"
        And Crop description "TestCrop" is removed from table "Description"
    
    @cropdescriptions
    Scenario: Crop Description - Edit (without saving & with saving)
        #Edit without saving
        Given I am in Description page
        When I choose three dots in the end of row "TestCrop" in crop descriptions table, a context menu with options "Edit" and "Delete" shows
        And I clicked "Edit" description, edit mode for row is activated and two buttons <X> and <V> under the row became visible
        And I edited the crop description details without saving
        And I clicked red button <X> of crop description
        Then Edit mode for row is closed, no data were changed in crop description
            |Description|Crop Subclass              |Crop Class             |              Translation key                       |     Expressive name              |Chloride sensitive|Grain protein|AtFarm Crop|Last mod.|Actions|
            |TestCrop   |TestDescriptionSubclass    |TestDescriptionClass   |crop.description.testdescriptionsubclass_testcrop   |TESTDESCRIPTIONSUBCLASS_TESTCROP  |      No          |      11     |Test AtFarm|     ?   |  ···  |
        #Edit with saving
        When I edited the crop description details with saving
        And I clicked green button <V> of crop description
        Then I see tooltip "Changes saved" "The changes done to the table row have been successfully saved."
        And Crop description table row should be with data:
            |Description |Crop Subclass              |Crop Class             |              Translation key                        |     Expressive name               |Chloride sensitive|Grain protein|AtFarm Crop    |Last mod.|Actions|
            |TestCrop1   |TestDescriptionSubclass    |TestDescriptionClass   |crop.description.testdescriptionsubclass_testcrop1   |TESTDESCRIPTIONSUBCLASS_TESTCROP1  |      Yes          |      25     |Test AtFarm 1  |     ?   |  ···  |