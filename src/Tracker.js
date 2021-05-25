import { useEffect, useState } from 'react'
import axios from 'axios'
import L from 'leaflet'
import {
  CircleMarker, GeoJSON, MapContainer, Marker, TileLayer
} from 'react-leaflet'
import 'leaflet-rotatedmarker'
import uniqid from 'uniqid'

import {
  getActivity, getBearing, getLineName, getPosition, getTimestamp
} from './helpers/busTimeApiHelpers'
import settings from './settings/busSettings'
import { busTimeAPI, proxyURL } from './settings/busTimeSettings'
import {
  mapAttribution, mapboxURL, mapCenter, mapZoom
} from './settings/mapSettings'
import user from './assets/svg/user.svg'

import 'leaflet/dist/leaflet.css'
import './Tracker.css'

function Tracker() {
  const [busData, setBusData] = useState({})
  const [userPosition, setUserPosition] = useState()

  const getBusData = () => {
    const apiRequests = []
    const busLines = []

    Object.values(settings).map((bus) => (
      apiRequests.push(
        axios.post(proxyURL + encodeURIComponent(`${busTimeAPI}${bus.line}&nocache=${uniqid()}`))
          .then((response) => busLines.push(response))
      )
    ))

    Promise.all(apiRequests).then(() => {
      busLines.forEach((line) => {
        const activity = getActivity(line)
        const lineName = getLineName(activity)
        const timestamp = getTimestamp(line)

        const buses = activity.map((bus) => {
          const position = getPosition(bus)
          const bearing = getBearing(bus)

          return [[position.Latitude, position.Longitude], bearing]
        })

        setBusData((prevBusData) => ({
          ...prevBusData,
          [lineName]: { name: lineName, buses, timestamp }
        }))
      })
    })
      .catch((error) => { throw new Error(error) })
  }

  const drawUser = (position) => (
    <Marker
      icon={L.icon({
        iconSize: [40, 40],
        iconUrl: user
      })}
      position={position}
    />
  )

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

  const drawRoute = (line) => (
    <GeoJSON
      data={line.route}
      key={uniqid()}
      style={{ color: `#${line.color}33` }}
    />
  )

  const drawStop = (color, position) => (
    <CircleMarker
      center={position}
      key={uniqid()}
      pathOptions={{ color: `#${color}`, opacity: 0, fillOpacity: 0.66 }}
      radius={5}
    />
  )

  const setUser = (position) => {
    const { latitude, longitude } = position.coords

    setUserPosition([latitude, longitude])
  }

  const getUserPosition = () => navigator.geolocation.getCurrentPosition(setUser)

  useEffect(() => {
    getBusData()
    getUserPosition()

    setInterval(() => {
      getBusData()
      getUserPosition()
    }, 15000)
  }, [])

  return (
    <MapContainer
      center={mapCenter}
      zoom={mapZoom}
      zoomControl={false}
    >
      <TileLayer
        attribution={mapAttribution}
        url={mapboxURL}
      />

      { userPosition && drawUser(userPosition) }

      { Object.values(settings).map((line) => drawRoute(line)) }

      { Object.values(settings).map((bus) => (
        bus.stops.map((position) => drawStop(bus.color, position))
      ))}

      { Object.values(busData).map((line) => (
        line.buses.map((position) => drawBus(line.name, position))
      ))}

      <div className="timestamp leaflet-control">
        { Object.values(busData).map((line) => (
          <p key={uniqid()}>{`${line.name}: ${line.timestamp}`}</p>
        ))}
      </div>
    </MapContainer>
  )
}

export default Tracker
