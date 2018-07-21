Feature: Change volume

  Scenario: Increase volume
    Given the volume is 50%
    And the radio is playing
    When the volume is increased
    Then the volume should be 55%
