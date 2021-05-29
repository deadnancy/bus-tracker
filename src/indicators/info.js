import { useState } from 'react'
import uniqid from 'uniqid'
import time from '../destructurers/time'

const getStopInfo = (stopData) => {
  const stops = []
  let timestamp = '---'

  Object.values(stopData).forEach((stop) => {
    const { buses, color, name } = stop
    timestamp = stop.timestamp

    stops.push({ buses, color, name })
  })

  return { stops, timestamp }
}

const getStatus = (arrival) => {
  const {
    status, eta, departure, terminal
  } = arrival
  let markup = ''

  if (terminal) {
    // Data gets weird sometimes.
    const departs = departure || terminal
    markup = `At terminal. Departs ${time(departs)}.`
  } else {
    const arrives = eta ? time(eta) : '[error]'
    markup = `${status} (ETA ${arrives}).`
  }

  return markup
}

const generateMarkup = (stops) => (
  stops.map((stop) => (
    <section key={uniqid()}>
      <h2 style={{ background: stop.color }}>{stop.name}</h2>
      {
        stop.buses.length === 0
          ? 'No buses scheduled for this stop.'
          : stop.buses.map((bus) => {
            const { line, arrival } = bus

            return (
              <p key={uniqid()}>
                <strong>{line}</strong>: {getStatus(arrival)}
              </p>
            )
          })
      }
    </section>
  ))
)

const drawToggle = (stopData) => (
  Object.values(stopData).map((stop) => (
    <div
      className="stripe"
      key={uniqid()}
      style={{ background: stop.color }}
    />
  ))
)

const showInfo = (stopData) => {
  const [panel, setPanel] = useState(true)
  const stopInfo = getStopInfo(stopData)

  return (
    <>
      <button
        className={`panel leaflet-control ${panel && 'visible'}`}
        onMouseDown={() => setPanel(false)}
        type="button"
      >
        { generateMarkup(stopInfo.stops) }
        <em>Latest data fetched at {stopInfo.timestamp}.</em>
      </button>

      <button
        className={`toggle leaflet-control ${panel && 'hidden'}`}
        onMouseDown={() => setPanel(true)}
        type="button"
      >
        { drawToggle(stopData) }
      </button>
    </>
  )
}

export default showInfo
