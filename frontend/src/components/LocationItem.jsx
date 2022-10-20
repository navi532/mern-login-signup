
function LocationItem({ location }) {
  
  return (
    <div className='location'>
      <div>{new Date(location.timestamp).toLocaleString('en-US')}</div>
      <h2>{location.deviceid}</h2>
      <h2>{location.devicetype}</h2>
      <h2>{location.location}</h2>
    </div>
  )
}

export default LocationItem
