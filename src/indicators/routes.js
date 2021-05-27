import { GeoJSON } from 'react-leaflet'
import uniqid from 'uniqid'

import B43route from '../assets/geojson/b43.json'
import B48route from '../assets/geojson/b48.json'
import B62route from '../assets/geojson/b62.json'

// TO DO: Combine drawRoute + routes.

const routes = {
  B43: {
    route: B43route,
    color: 'ff0000'
  },
  B48: {
    route: B48route,
    color: '00cc00'
  },
  B62: {
    route: B62route,
    color: '1177ff'
  }
}

const drawRoute = (line) => (
  <GeoJSON
    data={line.route}
    key={uniqid()}
    style={{ color: `#${line.color}33` }}
  />
)

export { drawRoute, routes }
