import { useEffect, useState } from 'react'
import axios from 'axios'
import { MapContainer, TileLayer } from 'react-leaflet'
import 'leaflet-rotatedmarker'
import uniqid from 'uniqid'

import stopSettings from './settings/stops'
import { busTimeStopAPI, proxyURL } from './settings/busTimeAPI'
import drawRoutes from './indicators/routes'
import { drawBuses, drawStops, drawUser } from './indicators/markers'
import showInfo from './indicators/info'
import { getBuses, getTimestamp } from './destructurers/busTimeAPI'
import mapSettings from './settings/map'

import 'leaflet/dist/leaflet.css'
import './Tracker.css'

function Tracker() {
  const [stopData, setStopData] = useState([])
  const [userPosition, setUserPosition] = useState()

  const getStopData = () => {
    const apiRequests = []
    const busStops = []

    Object.values(stopSettings).map((setting) => (
      apiRequests.push(
        axios.post(proxyURL + encodeURIComponent(`${busTimeStopAPI}${setting.id}&nocache=${uniqid()}`))
          .then((response) => busStops.push({
            data: response,
            id: setting.id,
            name: setting.name,
            color: setting.color,
            index: setting.index
          }))
      )
    ))

    Promise.all(apiRequests).then(() => {
      const latestData = [...stopData]

      busStops.forEach((stop) => {
        latestData[stop.index] = {
          id: stop.id,
          name: stop.name,
          color: stop.color,
          buses: getBuses(stop.data),
          timestamp: getTimestamp(stop.data)
        }
      })

      setStopData(latestData)
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
      center={mapSettings.center}
      zoom={mapSettings.zoom}
      zoomControl={false}
    >
      <TileLayer
        attribution={mapSettings.attribution}
        url={mapSettings.tilesURL}
      />

      { userPosition && drawUser(userPosition) }
      { drawRoutes() }
      { drawStops() }
      { drawBuses(stopData) }
      { showInfo(stopData) }
    </MapContainer>
  )
}

export default Tracker
