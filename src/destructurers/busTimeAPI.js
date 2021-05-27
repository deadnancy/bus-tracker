// https://bustime.mta.info/wiki/Developers/SIRIVehicleMonitoring

const svcDelivery = (stop) => stop.data.contents.Siri.ServiceDelivery
const getBuses = (stop) => svcDelivery(stop).StopMonitoringDelivery[0].MonitoredStopVisit
const getTimestamp = (stop) => svcDelivery(stop).ResponseTimestamp.match(/\d\d:\d\d:\d\d/)

// TO DO: Combine position and bearing.
const getBusLine = (bus) => bus.MonitoredVehicleJourney.PublishedLineName[0]
const getBusPosition = (bus) => bus.MonitoredVehicleJourney.VehicleLocation
const getBusBearing = (bus) => bus.MonitoredVehicleJourney.Bearing

export {
  getBusBearing, getBuses, getBusLine, getBusPosition, getTimestamp
}
