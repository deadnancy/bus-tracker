import { useEffect, useState } from 'react'
import axios from 'axios'
import { MapContainer, TileLayer } from 'react-leaflet'
import 'leaflet-rotatedmarker'
import uniqid from 'uniqid'

import stops from './settings/stops'
import { busTimeStopAPI, proxyURL } from './settings/busTimeAPI'
import drawRoutes from './indicators/routes'
import { drawBus, drawStops, drawUser } from './indicators/markers'
import { getBuses, getTimestamp } from './destructurers/busTimeAPI'
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

    Object.values(stops).map((stop) => (
      apiRequests.push(
        axios.post(proxyURL + encodeURIComponent(`${busTimeStopAPI}${stop.id}&nocache=${uniqid()}`))
          .then((response) => busStops.push({
            data: response,
            id: stop.id,
            name: stop.name,
            color: stop.color
          }))
      )
    ))

    Promise.all(apiRequests).then(() => {
      busStops.forEach((stop) => {
        setStopData((prevStopData) => ({
          ...prevStopData,
          [stop.id]: {
            id: stop.id,
            name: stop.name,
            color: stop.color,
            buses: getBuses(stop.data),
            timestamp: getTimestamp(stop.data)
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
      { drawStops() }

      { Object.values(stopData).map((stop) => (
        stop.buses.map((bus) => (
          drawBus(stop.color, bus.position)
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
