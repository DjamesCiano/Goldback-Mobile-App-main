# API Definitions

In order for this application to work, it needs data and the ability to store data remotely.  For this reason we have created a set of API's to serve and administer the application.

Below is a breakdown of the API:

## News Feed

This ties into the News Feed screen.

- Get News Feeds (Method GET)

## Transactions

These endpoints are for CRUD.  They allow the user to take a snapshot of the values they entered into the calculator and save them to our database.  They can also retreive, change them, and delete them

- Transaction-Save
- Transaction-Get
- Transaction-Update
- Transaction-Delete

## Rates

This endpoint gets the current value of GoldBack in US as well as in various different currency values.  These are used for the calculator.

- Get Rates

## Rate Changes

These points are for saving and getting the changes made when the user wants to modify the rate of the calculator.

- Rate Changes (Method GET)
- Rate Changes Save (Method POST)

## Map Data

This is an end point that returns a list of the entire database of Merchants and Distributors from all over the world.

- Get Map Data (Method GET)

## CSharpLibs

This is the data we use to populate the Map screen.  This returns Merchants and Dealers that GoldBack has all over the world.  90% of them reside in the USA.  Given a GPS Coordinates and a 30 Kilometer radius it returns those merchants near your location.  Also you can pass a list of Zip Codes and will return all the hits in those Zip codes.

- Find Locations (Method POST)  Shows you how to call with a GPS Coord and Radius
- Find Locations w/ZipCodes (Method POST)  Shows you how to call with ZipCodes.

## Summary

While they may be more end points, these are the only one for now that the application will use.