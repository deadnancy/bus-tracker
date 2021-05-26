import { useEffect, useState } from 'react'
import axios from 'axios'
import { MapContainer, TileLayer } from 'react-leaflet'
import 'leaflet-rotatedmarker'
import uniqid from 'uniqid'

import {
  getBusBearing, getBuses, getBusLine, getBusPosition, getTimestamp
} from './destructurers/busTimeAPI'
import settings from './settings/buses'
import { busTimeStopAPI, proxyURL } from './settings/busTimeAPI'
import {
  mapAttribution, mapboxURL, mapCenter, mapZoom
} from './settings/map'
import {
  drawBus, drawRoute, drawStop, drawUser
} from './indicators/markers'

import 'leaflet/dist/leaflet.css'
import './Tracker.css'

function Tracker() {
  const [stopData, setStopData] = useState({})
  const [userPosition, setUserPosition] = useState()

  const getStopData = () => {
    const apiRequests = []
    const busStops = []

    Object.values(settings).map((bus) => (
      bus.stops.forEach((stop) => {
        if (stop.id) {
          apiRequests.push(
            axios.post(proxyURL + encodeURIComponent(`${busTimeStopAPI}${stop.id}&nocache=${uniqid()}`))
              .then((response) => busStops.push({ id: stop.id, data: response }))
          )
        }
      })
    ))

    Promise.all(apiRequests).then(() => {
      busStops.forEach((stop) => {
        const timestamp = getTimestamp(stop.data)

        const buses = getBuses(stop.data).map((bus) => {
          const line = getBusLine(bus)
          const position = getBusPosition(bus)
          const bearing = getBusBearing(bus)

          return {
            line, position: [position.Latitude, position.Longitude], bearing
          }
        })

        setStopData((prevStopData) => ({
          ...prevStopData,
          [stop.id]: { id: stop.id, buses, timestamp }
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
    getStopData()
    getUserPosition()

    setInterval(() => {
      getStopData()
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

      { Object.values(settings).map((line) => (
        line.stops.map((stop) => drawStop(line.color, stop.position))
      ))}

      { Object.values(stopData).map((stop) => (
        stop.buses.map((bus) => (
          drawBus(settings[bus.line].line, [bus.position, bus.bearing])
        ))
      ))}

      <div className="timestamp leaflet-control">
        { Object.values(stopData).map((stop) => (
          <p key={uniqid()}>{`${stop.id}: ${stop.timestamp}`}</p>
        ))}
      </div>
    </MapContainer>
  )
}

export default Tracker
