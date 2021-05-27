import L from 'leaflet'
import { CircleMarker, Marker } from 'react-leaflet'
import uniqid from 'uniqid'

import settings from '../settings/buses'
import bus from './bus'
import user from './user'

// const svg = 'data:image/svg+xml;base64,'

const drawBus = (line, pos) => {
  const [position, bearing] = pos
  const iconUrl = `data:image/svg+xml;base64,${btoa(bus(settings[line].color))}`

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

const drawStop = (color, position) => (
  <CircleMarker
    center={position}
    key={uniqid()}
    pathOptions={{ color: `${color}`, opacity: 0, fillOpacity: 0.66 }}
    radius={5}
  />
)

const drawUser = (position) => {
  const iconUrl = `data:image/svg+xml;base64,${btoa(user('#bb0'))}`

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

export { drawBus, drawStop, drawUser }
