// https://bustime.mta.info/wiki/Developers/SIRIVehicleMonitoring

const svcDelivery = (stop) => stop.data.contents.Siri.ServiceDelivery
const getTimestamp = (stop) => svcDelivery(stop).ResponseTimestamp.match(/\d\d:\d\d:\d\d/)

const journey = (bus) => bus.MonitoredVehicleJourney
const position = (bus) => journey(bus).VehicleLocation
const call = (bus) => journey(bus).MonitoredCall
const getBusLine = (bus) => journey(bus).PublishedLineName[0]

const getBusPosition = (bus) => [
  [position(bus).Latitude, position(bus).Longitude],
  journey(bus).Bearing
]

const getBusArrival = (bus) => ({
  status: call(bus).ArrivalProximityText,
  eta: call(bus).ExpectedArrivalTime,
  departure: call(bus).ExpectedDepartureTime,
  terminal: journey(bus).OriginAimedDepartureTime
})

const getBuses = (stop) => svcDelivery(stop).StopMonitoringDelivery[0].MonitoredStopVisit
  .map((bus) => ({
    line: getBusLine(bus),
    position: getBusPosition(bus),
    arrival: getBusArrival(bus)
  }))

export { getBuses, getTimestamp }
