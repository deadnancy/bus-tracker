// https://bustime.mta.info/wiki/Developers/SIRIVehicleMonitoring

const apiKey = process.env.REACT_APP_BUS_TIME_API_KEY

const busTimeVehicleAPI = `https://api.prod.obanyc.com/api/siri/vehicle-monitoring.json?key=${apiKey}&version=2&VehicleMonitoringDetailLevel=minimum&LineRef=MTA%20NYCT_`
const busTimeStopAPI = `http://bustime.mta.info/api/siri/stop-monitoring.json?key=${apiKey}&version=2&StopMonitoringDetailLevel=minimum&MaximumStopVisits=2&MonitoringRef=`

const proxyURL = 'https://fletcher.nyc/etc/proxy.php?url='

export { busTimeStopAPI, busTimeVehicleAPI, proxyURL }
