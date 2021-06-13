const busMarker = (color) => `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <circle fill="${color}" cx="50" cy="50" r="12.5" />
    <polyline fill="none" stroke="${color}" stroke-width="6" stroke-linecap="round" points="70,25 96,50 70,75" />
  </svg>
`

export default busMarker
