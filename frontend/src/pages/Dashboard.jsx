import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import LocationItem from "../components/LocationItem";
import Spinner from "../components/Spinner";
import { getLocations } from "../features/locations/locationSlice";
import { logout, reset } from "../features/auth/authSlice";

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { locations, isLoading, isError, message } = useSelector(
    (state) => state.locations
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate("/login");
    }

    dispatch(getLocations());
    if (!isError) {
      dispatch(reset());
    }
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  // const { user } = useSelector((state) => state.auth)
  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  return (
    <>
      <section className="heading">
        <div className="navbar"> 
        <h2>Welcome {user && user.name}</h2>
        <button className="btn" onClick={onLogout}>
        {/* <FaSignOutAlt /> Logout */}
        Logout
      </button>
         </div>
        <h1>GPS Dashboard</h1>
      </section>
      {/* <div className="location-details">
        <p>Device Id</p>
        <p>Device Type</p>
        <p>Timestmap</p>
        <p>Location</p>
      </div> */}
      <section className="content">
        {locations.length > 0 ? (
          <table className="locations">
            <thead>
              <tr>
                <th className='deviceid' scope="col">Device Id</th>
                <th className='devicetype' scope="col">Device Type</th>
                <th scope="col">Timestmap</th>
                <th className='location-loc' scope="col">Location</th>
              </tr>
            </thead>
            {/* <div className="line"></div>  */}
            {locations.map((location) => (
              <LocationItem
                key={location.deviceid + location.timestamp}
                location={location}
              />
            ))}
          </table>
        ) : (
          <h3>You don't have any location data</h3>
        )}
      </section>
      
    </>
  );
}

export default Dashboard;
