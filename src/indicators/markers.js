import L from 'leaflet'
import { CircleMarker, Marker } from 'react-leaflet'
import uniqid from 'uniqid'

import stops from '../settings/stops'
import bus from './bus'
import user from './user'

const svg = 'data:image/svg+xml;base64,'

const drawBus = (color, pos) => {
  const [position, bearing] = pos
  const iconUrl = `${svg}${btoa(bus(color))}`

  return (
    <Marker
      icon={L.icon({
        iconSize: [40, 40],
        iconUrl
      })}
      key={uniqid()}
      position={position}
      rotationAngle={-bearing}
      rotationOrigin="center center"
    />
  )
}

const drawStops = () => (
  Object.values(stops).map((stop) => (
    <CircleMarker
      center={stop.position}
      key={uniqid()}
      pathOptions={{ color: stop.color, opacity: 0, fillOpacity: 0.66 }}
      radius={5}
    />
  ))
)

const drawUser = (position) => {
  const iconUrl = `${svg}${btoa(user('#bb0'))}`

  return (
    <Marker
      icon={L.icon({
        iconSize: [40, 40],
        iconUrl
      })}
      position={position}
    />
  )
}

export { drawBus, drawStops, drawUser }
