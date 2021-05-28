import L from 'leaflet'
import { CircleMarker, Marker } from 'react-leaflet'
import uniqid from 'uniqid'

import stops from '../settings/stops'
import busMarker from './bus'
import userMarker from './user'

const svg = 'data:image/svg+xml;base64,'

const drawBus = (color, pos) => {
  const [position, bearing] = pos
  console.log(color, position, bearing)

  return (
    <Marker
      icon={L.icon({
        iconSize: [40, 40],
        iconUrl: `${svg}${btoa(busMarker(color))}`
      })}
      key={uniqid()}
      position={position}
      rotationAngle={-bearing}
      rotationOrigin="center center"
    />
  )
}

const drawStops = () => (
  stops.map((stop) => (
    <CircleMarker
      center={stop.position}
      key={uniqid()}
      pathOptions={{ color: stop.color, opacity: 0, fillOpacity: 0.66 }}
      radius={5}
    />
  ))
)

const drawUser = (position) => (
  <Marker
    icon={L.icon({
      iconSize: [40, 40],
      iconUrl: `${svg}${btoa(userMarker('#bb0'))}`
    })}
    position={position}
  />
)

export { drawBus, drawStops, drawUser }
