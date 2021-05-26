const mapCenter = [40.730, -73.951]
const mapZoom = 15

const mapboxAPI = 'https://api.mapbox.com/styles/v1/'
const mapboxTiles = 'mapbox/dark-v10'
const mapboxToken = process.env.REACT_APP_MAPBOX_TOKEN
const mapboxURL = `${mapboxAPI}${mapboxTiles}/tiles/256/{z}/{x}/{y}@2x?access_token=${mapboxToken}`

const openStreetMapAttr = '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
const mapboxAttr = '&copy; <a href="https://www.mapbox.com/about/maps/">Mapbox</a>'
const mapAttribution = `${openStreetMapAttr} | ${mapboxAttr}`

export {
  mapAttribution, mapboxURL, mapCenter, mapZoom
}
