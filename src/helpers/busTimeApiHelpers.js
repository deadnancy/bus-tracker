// https://bustime.mta.info/wiki/Developers/SIRIVehicleMonitoring

const svcDelivery = (line) => line.data.contents.Siri.ServiceDelivery
const getActivity = (line) => svcDelivery(line).VehicleMonitoringDelivery[0].VehicleActivity
const getTimestamp = (line) => svcDelivery(line).ResponseTimestamp.match(/\d\d:\d\d:\d\d/)

const getLineName = (activity) => activity[0].MonitoredVehicleJourney.PublishedLineName[0]

const getLocation = (bus) => bus.MonitoredVehicleJourney.VehicleLocation
const getBearing = (bus) => bus.MonitoredVehicleJourney.Bearing

export {
  getActivity, getBearing, getLocation, getLineName, getTimestamp
}
