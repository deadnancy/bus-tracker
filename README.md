# bus-tracker

This is a personal NYC MTA bus tracker. Its scope is the three buses I rely on to get to my studio and back: the B62, B43 and B48.

## demo

See the [current build](http://fletcher.nyc/etc/bus-tracker/).

## local use

- Clone this repo.
- Create the file `.env` in the project root.
- Request a Bus Time API key from [the MTA](https://register.developer.obanyc.com/).
- Add `REACT_APP_BUS_TIME_API_KEY = '<your API key>'` to `.env`.
- Create an account at [Mapbox](https://www.mapbox.com) and request an access token.
- Add `REACT_APP_MAPBOX_TOKEN = '<your access token>'` to `.env`.
- Run the commands `yarn` then `yarn start`.
