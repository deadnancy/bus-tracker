const getActivity = (line) => (
  line.data.contents.Siri.ServiceDelivery
    .VehicleMonitoringDelivery[0].VehicleActivity
)

const getLineName = (activity) => (
  activity[0].MonitoredVehicleJourney.PublishedLineName[0]
)

const getLocation = (bus) => bus.MonitoredVehicleJourney.VehicleLocation

const getBearing = (bus) => bus.MonitoredVehicleJourney.Bearing

export {
  getActivity, getBearing, getLocation, getLineName
}
