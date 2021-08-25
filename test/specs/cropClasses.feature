Feature: Global crop - crop classes
    Add, edit and delete crop classes

    Background: Adding crop group, crop class
        Given Logged as user with role Global admin and role Global settings and PolarisMaintenance
        When I clicked to button "Global settings" and I clicked "Crop settings" submenus "Crops"
        #Add crop group
        And I create crop group for crop classes
        #Add crop class
        When I clicked tab "Classes"
        And I create a crop class "TestClass" and choose "TestClassGroup" in "Crop Group" and "BBCH - Banana" in "Default growth scale"
        Then I see tooltip "Class added!" "The new crop class has been successfully added to the global list."
        And I search for the crop class "TestClass"
        And Crop classes table row should be with data:
            | Crop Class | Crop Group      | Default growth scale | Translation key                     | Expressive name          | Last mod. | Actions |
            | TestClass  | TestClassGroup  | BBCH - Banana        | crop.class.testclassgroup_testclass | TESTCLASSGROUP_TESTCLASS | ?         | ···     |

    @cropclass
    Scenario: Crop Classes - Decline Delete, Delete
        #Decline Delete
        Given I am in Classes page
        When I choose three dots in the end of row "TestClass" in crop classes table, a context menu with options "Edit" and "Delete" shows
        And I clicked "Delete" of crop class, a content appeared "Please note!" "Are you sure you want to delete TestClass? The action cannot be reverted."
        And I clicked button "Do not delete" of crop class
        Then Crop classes table row should not be deleted:
            | Crop Class | Crop Group      | Default growth scale | Translation key                     | Expressive name          | Last mod. | Actions |
            | TestClass  | TestClassGroup  | BBCH - Banana        | crop.class.testclassgroup_testclass | TESTCLASSGROUP_TESTCLASS | ?         | ···     |
        #Delete Crop Classes
        When I delete crop class "TestClass"
        Then I see tooltip "Crop Class deleted" "The crop class has been removed. The crop class can anyway be added again."
        And Crop class "TestClass" is removed from table "Crop Class"

    @cropclass
    Scenario: Crop Classes - Edit (without saving & with saving)
        #Edit without saving
        Given I am in Classes page
        When I choose three dots in the end of row "TestClass" in crop classes table, a context menu with options "Edit" and "Delete" shows
        And I clicked "Edit" class, edit mode for row is activated and two buttons <X> and <V> under the row became visible
        And I edited the crop class details without saving
        And I clicked red button <X> of crop class
        Then Edit mode for row is closed, no data were changed in crop class
            | Crop Class | Crop Group      | Default growth scale | Translation key                     | Expressive name          | Last mod. | Actions |
            | TestClass  | TestClassGroup  | BBCH - Banana        | crop.class.testclassgroup_testclass | TESTCLASSGROUP_TESTCLASS | ?         | ···     |
        #Edit with saving
        When I edited the crop class details with saving
        And I clicked green button <V> of crop class
        Then I see tooltip "Changes saved" "The changes done to the table row have been successfully saved."
        And Crop classes table row should be with data:
            | Crop Class  |Crop Group       |Default growth scale | Translation key                          |Expressive name             |Last mod.|Actions|
            | TestClass1  |TestClassGroup   |BBCH - Banana        | crop.class.testclassgroup_testclass1     |TESTCLASSGROUP_TESTCLASS1   |    ?    |   ··· |