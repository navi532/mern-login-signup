function LocationItem({ location }) {
  return (

      <tr>
      <td className="deviceid">{location.deviceid}</td>
      <td className="devicetype">{location.devicetype}</td>
      <td className="timestamp">{new Date(location.timestamp).toLocaleString("en-US")}</td>
      <td className="location-loc">{location.location}</td>
      <div class="line"></div>
    </tr>
    
  );

  return (
    <div>
      <div className="location">
        <p className="location-id">{location.deviceid}</p>
        <p className="location-type">{location.devicetype}</p>
        <p className="location-timestamp">
          {new Date(location.timestamp).toLocaleString("en-US")}
        </p>
        <p className="location-loc">{location.location}</p>
        <div class="line"></div>
      </div>
    </div>
  );
}

export default LocationItem;
