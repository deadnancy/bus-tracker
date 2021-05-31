const center = [40.730, -73.951]
const zoom = 15

const mapboxAPI = 'https://api.mapbox.com/styles/v1/'
const mapboxTiles = 'mapbox/dark-v10'
const mapboxToken = process.env.REACT_APP_MAPBOX_TOKEN
const tilesURL = `${mapboxAPI}${mapboxTiles}/tiles/256/{z}/{x}/{y}@2x?access_token=${mapboxToken}`

const openStreetMapAttr = '<a href="http://osm.org/copyright">OpenStreetMap</a>'
const mapboxAttr = ' <a href="https://www.mapbox.com/about/maps/">Mapbox</a>'
const attribution = `${openStreetMapAttr} | ${mapboxAttr}`

export default {
  attribution, center, tilesURL, zoom
}
