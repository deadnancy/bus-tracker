const userMarker = (color) => `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <line stroke="${color}" stroke-width="6" stroke-linecap="round" x1="70" y1="30" x2="30" y2="70"/>
    <line stroke="${color}" stroke-width="6" stroke-linecap="round" x1="30" y1="30" x2="70" y2="70"/>
  </svg>
`

export default userMarker
