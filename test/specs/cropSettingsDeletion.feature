Feature: Global Crop Groups/Class/Subclass - Deletion

    Background: Add crop group and class
        Given Logged as user with role Global admin and role Global settings and PolarisMaintenance
        When I clicked to button "Global settings" and I clicked "Crop settings" submenus "Crops"
        And I clicked tab "Groups"
        And I create a crop group
        When I clicked tab "Classes"
        And I create a crop class for crop group

@cropsettingsdeletion
    Scenario: Delete crop Groups which is used
        Given I am logged in and in crops page
        When I clicked tab "Groups"
        And I choose three dots in the end of row for crop group
        And I clicked "Delete" and verify content appeared for deleting crop group
        And I clicked button <Ok> in crop group delete popup
        Then Crop group is not deleted from table

@cropsettingsdeletion
    Scenario: Delete crop Classes which is used
        Given I am logged in and in crops page
        When I clicked tab "Subclasses"
        And I create a crop subclass for crop class
        And I clicked tab "Classes"
        And I choose three dots in the end of row for crop class
        And I clicked "Delete" and verify content appeared for deleting crop class
        And I clicked button <Ok> in crop class delete popup
        Then Crop class is not deleted from table

@cropsettingsdeletion
    Scenario: Delete crop Subclasses which is used
        Given I am logged in and in crops page
        When I clicked tab "Subclasses"
        And I create a crop subclass for crop class
        When I clicked tab "Crop Descriptions"
        And I create a crop description for crop subclass
        And I clicked tab "Subclasses"
        And I choose three dots in the end of row for crop subclass
        And I clicked "Delete" and verify content appeared for deleting crop subclass
        And I clicked button <Ok> in crop subclass delete popup
        Then Crop subclass is not deleted from table


