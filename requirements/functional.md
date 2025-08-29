# Functional Requirements

All things regarding functional requirements.

## Change Rates

There are rules related to changing rates.

### Requirement 1: Save All Changes User Makes

When the user changes the rate this must be saved.  Below are the models, API, and rules to follow

#### Model

Here is the model it is a TypeScript model file `RateChanges.ts`:

```TypeScript
export interface IRateChange {
    _id?: string;
    deviceId: string;
    timestamp: string;
    previousRate: number;
    currentRate: number;
}
```

#### API

There are 2 API's end points that will be used for the mobile app:

1. POST:

```curl
curl --location 'https://gbcalculatorapimanagementservice.azure-api.net/GBCalculatorSettingsAPI//GBCalculatorRateChange' \
--header 'Ocp-Apim-Subscription-Key: 3da14da7b5084b0593322f0ed9a9570d' \
--header 'Content-Type: application/json' \
--header 'X-API-Key;' \
--data '{
    "deviceId": "device123",
    "timestamp": "2023-10-01T12:00:00Z",
    "previousRate": 10.5,
    "currentRate": 12.0
}'
```

2. GET: Will not be used in the mobile app right now.  It is mostly for reporting purposes

## Save Transactions

Below are the rules

### Requirement 1: CRUD Transactions

First I will show you the model in TypeScript:

