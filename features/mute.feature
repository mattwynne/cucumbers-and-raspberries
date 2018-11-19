Feature: Mute

  Scenario: Mute on
    Given the volume is 50%
    And the radio is playing
    When the volume is muted
    Then the volume should be 0%

  Scenario: Mute off
    Given the volume is 70%
    And the radio is playing
    When the volume is muted
    When the volume is un-muted
    Then the volume should be 70%
