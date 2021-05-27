import L from 'leaflet'
import { CircleMarker, Marker, Popup } from 'react-leaflet'
import uniqid from 'uniqid'

import settings from '../settings/buses'
import user from '../assets/svg/user.svg'

const drawBus = (line, pos) => {
  const [position, bearing] = pos

  return (
    <Marker
      icon={L.icon({
        iconSize: [40, 40],
        iconUrl: settings[line].marker
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
    pathOptions={{ color: `#${color}`, opacity: 0, fillOpacity: 0.66 }}
    radius={5}
  >
    <Popup>
      I AM POPUP
    </Popup>
  </CircleMarker>
)

const drawUser = (position) => (
  <Marker
    icon={L.icon({
      iconSize: [40, 40],
      iconUrl: user
    })}
    position={position}
  />
)

export { drawBus, drawStop, drawUser }
