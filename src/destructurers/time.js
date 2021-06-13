const time = (date) => {
  const military = date.match(/\d\d:\d\d:\d\d/)[0]
  const hours = military.substring(0, 2) % 12 || 12

  return `${hours}${military.slice(2)}`
}

export default time
