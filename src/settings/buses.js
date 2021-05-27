const settings = {
  B43: {
    name: 'B43',
    color: '#ff0000',
    stops: [
      {
        id: 305167,
        name: 'Manhattan Av/Freeman St',
        position: [40.7340700, -73.9551300]
      },
      {
        id: 307121,
        name: 'Manhattan Av/Nassau Av',
        position: [40.7236000, -73.9504300]
      }
    ]
  },
  B48: {
    name: 'B48',
    color: '#00cc00',
    stops: [
      {
        id: 307096,
        name: 'Nassau Av/Manhattan Av',
        position: [40.7238200, -73.9501000]
      },
      {
        id: 303844,
        name: 'Nassau Av/Hausman St',
        position: [40.7262800, -73.9393000]
      }
    ]
  },
  B62: {
    name: 'B62',
    color: '#1177ff',
    stops: [
      {
        // Visual only for 305167. See B43.
        id: 0,
        name: 'Manhattan Av/Freeman St',
        position: [40.7340700, -73.9551300]
      },
      {
        id: 305154,
        name: 'Bedford Av/Manhattan Av',
        position: [40.7235200, -73.9510000]
      }
    ]
  }
}

export default settings
