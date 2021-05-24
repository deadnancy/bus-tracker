import b43marker from '../assets/svg/b43.svg'
import b48marker from '../assets/svg/b48.svg'
import b62marker from '../assets/svg/b62.svg'

import b43route from '../assets/geojson/b43.json'
import b48route from '../assets/geojson/b48.json'
import b62route from '../assets/geojson/b62.json'

const settings = {
  B43: {
    line: 'B43',
    route: b43route,
    color: 'ff0000',
    marker: b43marker,
    stops: [
      [40.7340700, -73.9551300],
      [40.7236000, -73.9504300]
    ]
  },
  B48: {
    line: 'B48',
    route: b48route,
    color: '00cc00',
    marker: b48marker,
    stops: [
      [40.7238200, -73.9501000],
      [40.7262800, -73.9393000]
    ]
  },
  B62: {
    line: 'B62',
    route: b62route,
    color: '1177ff',
    marker: b62marker,
    stops: [
      [40.7340700, -73.9551300],
      [40.7235200, -73.9510000]
    ]
  }
}

export default settings
