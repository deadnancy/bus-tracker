import { GeoJSON } from 'react-leaflet'
import uniqid from 'uniqid'
import routes from '../settings/routes'

const drawRoutes = () => (
  Object.values(routes).map((route) => (
    <GeoJSON
      data={route.path}
      key={uniqid()}
      style={{ color: `${route.color}33` }}
    />
  ))
)

export default drawRoutes
