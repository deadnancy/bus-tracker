import { GeoJSON } from 'react-leaflet'
import uniqid from 'uniqid'
import routeSettings from '../settings/routes'

const drawRoutes = () => (
  Object.values(routeSettings).map((setting) => (
    <GeoJSON
      data={setting.path}
      key={uniqid()}
      style={{ color: `${setting.color}33` }}
    />
  ))
)

export default drawRoutes
