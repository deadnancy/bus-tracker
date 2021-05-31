import L from 'leaflet'
import { CircleMarker, Marker } from 'react-leaflet'
import uniqid from 'uniqid'

import stopSettings from '../settings/stops'
import busMarker from './bus'
import userMarker from './user'

const svg = 'data:image/svg+xml;base64,'

const drawBuses = (stopData) => (
  stopData.map((stop) => (
    stop.buses.map((bus) => {
      const [position, bearing] = bus.position

      return (
        <Marker
          icon={L.icon({
            iconSize: [40, 40],
            iconUrl: `${svg}${btoa(busMarker(stop.color))}`
          })}
          key={uniqid()}
          position={position}
          rotationAngle={-bearing}
          rotationOrigin="center center"
        />
      )
    })
  ))
)

const drawStops = () => (
  stopSettings.map((setting) => (
    <CircleMarker
      center={setting.position}
      key={uniqid()}
      pathOptions={{ color: setting.color, opacity: 1, fillOpacity: 0.5 }}
      radius={4.5}
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

export { drawBuses, drawStops, drawUser }
