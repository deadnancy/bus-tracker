import { useEffect, useState } from 'react'
import axios from 'axios'
import { MapContainer, TileLayer } from 'react-leaflet'
import 'leaflet-rotatedmarker'
import uniqid from 'uniqid'

import {
  getActivity, getBearing, getLineName, getPosition, getTimestamp
} from './destructurers/busTimeAPI'
import settings from './settings/buses'
import { busTimeVehicleAPI, proxyURL } from './settings/busTimeAPI'
import {
  mapAttribution, mapboxURL, mapCenter, mapZoom
} from './settings/map'
import {
  drawBus, drawRoute, drawStop, drawUser
} from './indicators/markers'

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
        axios.post(proxyURL + encodeURIComponent(`${busTimeVehicleAPI}${bus.line}&nocache=${uniqid()}`))
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
        bus.stops.map((stop) => drawStop(bus.color, stop.position))
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
