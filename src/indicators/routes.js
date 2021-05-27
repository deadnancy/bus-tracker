import { GeoJSON } from 'react-leaflet'
import uniqid from 'uniqid'

import B43route from '../geojson/b43.json'
import B48route from '../geojson/b48.json'
import B62route from '../geojson/b62.json'

const lines = {
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

const drawRoutes = () => (
  Object.values(lines).map((line) => (
    <GeoJSON
      data={line.route}
      key={uniqid()}
      style={{ color: `#${line.color}33` }}
    />
  ))
)

export default drawRoutes
