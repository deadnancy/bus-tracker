// https://bustime.mta.info/wiki/Developers/SIRIVehicleMonitoring

const svcDelivery = (stop) => stop.data.contents.Siri.ServiceDelivery
const getBuses = (stop) => svcDelivery(stop).StopMonitoringDelivery[0].MonitoredStopVisit
const getTimestamp = (stop) => svcDelivery(stop).ResponseTimestamp.match(/\d\d:\d\d:\d\d/)

const journey = (bus) => bus.MonitoredVehicleJourney
const position = (bus) => journey(bus).VehicleLocation
const getBusLine = (bus) => journey(bus).PublishedLineName[0]
const getBusPosition = (bus) => [
  [position(bus).Latitude, position(bus).Longitude],
  journey(bus).Bearing
]

export {
  getBuses, getBusLine, getBusPosition, getTimestamp
}
