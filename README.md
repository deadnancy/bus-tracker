# bus-tracker

![image](https://user-images.githubusercontent.com/6414141/119500653-05e96e80-bd36-11eb-9dee-5451008a9aaf.png)

This is a personal NYC MTA bus tracker. Its scope is the three buses I rely on to get to my studio and back: the B62, B43 and B48.

## demo

See the [current build](https://fletcher.nyc/etc/bus-tracker/).

## local use

- Clone this repo.
- Create the file `.env` in the project root.
- Request a Bus Time API key from [the MTA](https://register.developer.obanyc.com/).
- Add `REACT_APP_BUS_TIME_API_KEY = '<your API key>'` to `.env`.
- Create an account at [Mapbox](https://www.mapbox.com) and request an access token.
- Add `REACT_APP_MAPBOX_TOKEN = '<your access token>'` to `.env`.
- Add local [security certificates](https://flaviocopes.com/react-how-to-configure-https-localhost/) to the project root:
  - `openssl req -x509 -newkey rsa:2048 -keyout keytmp.pem -out cert.pem -days 365`
  - `openssl rsa -in keytmp.pem -out key.pem`
- Run the commands `yarn` then `yarn start`.
