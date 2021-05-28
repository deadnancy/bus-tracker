import uniqid from 'uniqid'

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
  const time = /\d\d:\d\d:\d\d/
  let markup = ''

  if (terminal) {
    // Data gets weird sometimes.
    const departs = departure || terminal
    markup = `At terminal. Departs ${departs.match(time)}.`
  } else {
    const arrives = eta ? eta.match(time) : '[error?]'
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
          ? 'No buses found.'
          : stop.buses.map((bus) => {
            const { line, arrival } = bus

            return (
              <p key={uniqid()}>
                <strong>{line}</strong>
                {': '}
                {getStatus(arrival)}
              </p>
            )
          })
      }
    </section>
  ))
)

const showInfo = (stopData) => {
  const stopInfo = getStopInfo(stopData)

  return (
    <div className="panel leaflet-control">
      { generateMarkup(stopInfo.stops) }
      <em>
        Last data fetch:
        {' '}
        {stopInfo.timestamp}
      </em>
    </div>
  )
}

export default showInfo
