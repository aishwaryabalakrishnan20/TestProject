Feature: Global crop - crop subclasses
    Add, edit and delete crop subclasses

    Background: Adding crop group, crop class, the crop subclasses
        Given Logged as user with role Global admin and role Global settings and PolarisMaintenance in subclasses
        When I clicked to button "Global settings" and I clicked "Crop settings" submenus "Crops" in subclasses
        #Add crop group
        And I create crop group "TestSubclassGroup" for subclasses
        #Add crop class
        And I create crop class "TestSubclassClass" for subclasses
        #Add crop subclass
        When I clicked tab "Subclasses"
        And I create crop subclasses "TestSubclass" and choose "TestSubclassClass" in "Crop Class"
        Then I see tooltip "Subclass added!" "The new subclass has been successfully added to the global list."
        And I search for the crop subclass "TestSubclass"
        And Crop subclasses table row should be with data:
            | Crop Subclass|Crop Class        |Crop Group        |             Translation key                  |     Expressive name            | Last mod. | Actions  |
            | TestSubclass |TestSubclassClass |TestSubclassGroup |crop.subclass.testsubclassclass_testsubclass  |TESTSUBCLASSCLASS_TESTSUBCLASS  |   ?       |  ···     |

    @cropsubclasses
    Scenario: Crop Subclasses - Decline Delete, Delete
        #Decline Delete
        Given I am in Subclasses page
        When I choose three dots in the end of row "TestSubclass" in crop subclasses table, a context menu with options "Edit" and "Delete" shows
        And I clicked "Delete" of crop subclass, a content appeared "Please note!" "Are you sure you want to delete TestSubclass? The action cannot be reverted."
        And I clicked button "Do not delete" of crop subclass
        Then Crop subclasses table row should not be deleted:
            | Crop Subclass|Crop Class        |Crop Group        |             Translation key          |     Expressive name            | Last mod. | Actions  |
            | TestSubclass |TestSubclassClass |TestSubclassGroup |crop.subclass.testsubclassclass_testsubclass  |TESTSUBCLASSCLASS_TESTSUBCLASS  |   ?       |  ···     |
        #Delete Crop Subclasses
        When I delete crop subclasses "TestSubclass"
        Then I see tooltip "Crop Subclass deleted" "The crop subclass has been removed. The crop subclass can anyway be added again."
        And Crop subclass "TestSubclass" is removed from table "Crop Subclass"

    @cropsubclasses
    Scenario: Crop Subclasses - Edit (without saving & with saving)
        #Edit without saving
        Given I am in Subclasses page
        When I choose three dots in the end of row "TestSubclass" in crop subclasses table, a context menu with options "Edit" and "Delete" shows
        And I clicked "Edit" subclass, edit mode for row is activated and two buttons <X> and <V> under the row became visible
        And I edited the crop subclasses details without saving
        And I clicked red button <X> of crop subclass
        Then Edit mode for row is closed, no data were changed in crop subclass
            | Crop Subclass|Crop Class        |Crop Group        |             Translation key                  |     Expressive name            | Last mod. | Actions  |
            | TestSubclass |TestSubclassClass |TestSubclassGroup |crop.subclass.testsubclassclass_testsubclass  |TESTSUBCLASSCLASS_TESTSUBCLASS  |   ?       |  ···     |

        #Edit with saving
        When I edited the crop subclasses details with saving
        And I clicked green button <V> of crop subclass
        Then I see tooltip "Changes saved" "The changes done to the table row have been successfully saved."
        And Crop subclasses table row should be with data:
            | Crop Subclass |Crop Class        |Crop Group        |             Translation key                   |     Expressive name             | Last mod. | Actions  |
            | TestSubclass1 |TestSubclassClass |TestSubclassGroup |crop.subclass.testsubclassclass_testsubclass1  |TESTSUBCLASSCLASS_TESTSUBCLASS1  |   ?       |  ···     |