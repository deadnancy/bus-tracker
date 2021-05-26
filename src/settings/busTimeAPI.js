// https://bustime.mta.info/wiki/Developers/SIRIStopMonitoring

const apiKey = process.env.REACT_APP_BUS_TIME_API_KEY

const busTimeStopAPI = `http://bustime.mta.info/api/siri/stop-monitoring.json?key=${apiKey}&version=2&StopMonitoringDetailLevel=minimum&MaximumStopVisits=3&MonitoringRef=`
const proxyURL = 'https://fletcher.nyc/etc/proxy.php?url='

export { busTimeStopAPI, proxyURL }
