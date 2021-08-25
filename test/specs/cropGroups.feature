Feature: Global crop - crop groups
    Add, edit and delete crop group

    Background: Adding crop group
        Given Logged as user with role Global admin and role Global settings and PolarisMaintenance
        When I clicked to button "Global settings" and I clicked "Crop settings" submenus "Crops"
        #Adding crop group
        And I clicked tab "Groups"
        And I create a crop group "TestGroup"
        Then I see tooltip "Group added!" "The new group has been successfully added to the global list."
        And I search for the crop group "TestGroup"
        And Crop groups table row should be with data:
            | Crop Group | Translation key      | Expressive name | Last mod. | Actions |
            | TestGroup  | crop.group.testgroup | TESTGROUP       | ?         | ···     |

    @cropgroup
    Scenario: Crop Groups - Add, Decline Delete, Delete
        # Decline Delete
        Given I am in Groups page
        When I choose three dots in the end of row "TestGroup" in crop groups table, a context menu with options "Edit" and "Delete" shows
        And I clicked "Delete" of crop group, a content appeared "Please note!" "Are you sure you want to delete TestGroup? The action cannot be reverted."
        And I clicked button "Do not delete" of crop group
        Then Crop groups table row should not be deleted:
            | Crop Group | Translation key      | Expressive name | Last mod. | Actions |
            | TestGroup  | crop.group.testgroup | TESTGROUP       | ?         | ···     |
        # Delete Crop Group
        When I delete crop group "TestGroup"
        Then I see tooltip "Crop Group deleted" "The crop group has been removed. The crop group can anyway be added again."
        And Crop group "TestGroup" is removed from table "Crop Group"

    @cropgroup
    Scenario: Crop Groups - Add, Edit(without saving & with saving)
        Given I am in Groups page
        When I choose three dots in the end of row "TestGroup" in crop groups table, a context menu with options "Edit" and "Delete" shows
        And I clicked "Edit" group, edit mode for row is activated and two buttons <X> and <V> under the row became visible
        And I edited the crop group details without saving
        And I clicked red button <X> of crop group
        Then Edit mode for row is closed, no data were changed in crop group
            | Crop Group | Translation key      | Expressive name | Last mod. | Actions |
            | TestGroup  | crop.group.testgroup | TESTGROUP       | ?         | ···     |
        When I edited the crop group details with saving
        And I clicked green button <V> of crop group
        Then I see tooltip "Changes saved" "The changes done to the table row have been successfully saved."
        And Crop groups table row should be with data:
            | Crop Group | Translation key       | Expressive name | Last mod. | Actions |
            | TestGroup1 | crop.group.testgroup1 | TESTGROUP1      | ?         | ···     |