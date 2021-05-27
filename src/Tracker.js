import { useEffect, useState } from 'react'
import axios from 'axios'
import { MapContainer, TileLayer } from 'react-leaflet'
import 'leaflet-rotatedmarker'
import uniqid from 'uniqid'

import settings from './settings/buses'
import { busTimeStopAPI, proxyURL } from './settings/busTimeAPI'
import drawRoutes from './indicators/routes'
import { drawBus, drawStop, drawUser } from './indicators/markers'
import {
  getBuses, getBusLine, getBusPosition, getTimestamp
} from './destructurers/busTimeAPI'
import {
  mapAttr, tilesURL, mapCenter, mapZoom
} from './settings/map'

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
              .then((response) => busStops.push({
                id: stop.id,
                name: stop.name,
                data: response
              }))
          )
        }
      })
    ))

    Promise.all(apiRequests).then(() => {
      busStops.forEach((stop) => {
        const timestamp = getTimestamp(stop.data)

        const buses = getBuses(stop.data).map((bus) => (
          { line: getBusLine(bus), position: getBusPosition(bus) }
        ))

        setStopData((prevStopData) => ({
          ...prevStopData,
          [stop.id]: {
            id: stop.id,
            name: stop.name,
            buses,
            timestamp
          }
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
        attribution={mapAttr}
        url={tilesURL}
      />

      { userPosition && drawUser(userPosition) }

      { drawRoutes() }

      { Object.values(settings).map((line) => (
        line.stops.map((stop) => drawStop(line.color, stop.position))
      ))}

      { Object.values(stopData).map((stop) => (
        stop.buses.map((bus) => (
          drawBus(settings[bus.line].name, bus.position)
        ))
      ))}

      <div className="timestamp leaflet-control">
        <p><em>stop: time data fetched</em></p>
        { Object.values(stopData).map((stop) => (
          <p key={uniqid()}>{`${stop.name}: ${stop.timestamp}`}</p>
        ))}
      </div>
    </MapContainer>
  )
}

export default Tracker
