// https://bustime.mta.info/wiki/Developers/SIRIVehicleMonitoring

const apiDetailLevel = 'minimum'
const apiKey = process.env.REACT_APP_BUS_TIME_API_KEY
const noCache = new Date().getTime()

const busTimeAPI = `https://api.prod.obanyc.com/api/siri/vehicle-monitoring.json?key=${apiKey}&version=2&VehicleMonitoringDetailLevel=${apiDetailLevel}&noCache=${noCache}&LineRef=MTA%20NYCT_` // Finished in tracker.

const proxyURL = `https://fletcher.nyc/etc/proxy.php?noCache=${noCache}&url=`

export { busTimeAPI, proxyURL }
