import { useEffect, useState } from 'react'
import axios from 'axios'
import L from 'leaflet'
import {
  CircleMarker, GeoJSON, MapContainer, Marker, TileLayer
} from 'react-leaflet'
import 'leaflet-rotatedmarker'
import uniqid from 'uniqid'

import {
  getActivity, getBearing, getLocation, getLineName
} from './helpers/busTimeApiHelpers'
import settings from './settings/busSettings'
import { busTimeAPI, proxyURL } from './settings/busTimeSettings'
import {
  mapAttribution, mapboxURL, mapCenter, mapZoom
} from './settings/mapSettings'

import 'leaflet/dist/leaflet.css'
import './Tracker.css'

function Tracker() {
  const [busData, setBusData] = useState({})

  const getBusData = () => {
    const apiRequests = []
    const busLines = []

    Object.values(settings).map((bus) => (
      apiRequests.push(
        axios.get(proxyURL + encodeURIComponent(busTimeAPI + bus.line))
          .then((response) => busLines.push(response))
      )
    ))

    Promise.all(apiRequests).then(() => {
      busLines.forEach((line) => {
        const activity = getActivity(line)
        const lineName = getLineName(activity)

        const buses = activity.map((bus) => {
          const location = getLocation(bus)
          const bearing = getBearing(bus)

          return [[location.Latitude, location.Longitude], bearing]
        })

        setBusData((prevBusData) => ({
          ...prevBusData,
          [lineName]: { name: lineName, buses }
        }))
      })
    })
      .catch((error) => { throw new Error(error) })
  }

  const drawBus = (line, position) => {
    const [location, bearing] = position

    return (
      <Marker
        icon={L.icon({
          iconSize: [40, 40],
          iconUrl: settings[line].marker
        })}
        key={uniqid()}
        position={location}
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

  useEffect(() => { getBusData() }, [])

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
      { Object.values(settings).map((line) => drawRoute(line)) }

      { Object.values(settings).map((bus) => (
        bus.stops.map((position) => drawStop(bus.color, position))
      ))}

      { Object.values(busData).map((line) => (
        line.buses.map((position) => drawBus(line.name, position))
      ))}
    </MapContainer>
  )
}

export default Tracker
