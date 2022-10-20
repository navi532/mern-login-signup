import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import LocationItem from '../components/LocationItem'
import Spinner from '../components/Spinner'
import { getLocations } from '../features/locations/locationSlice'
import {logout,reset} from '../features/auth/authSlice'

function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { locations, isLoading, isError, message } = useSelector(
    (state) => state.locations
  )
  
  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    if (!user) {
      navigate('/login')
    }

    dispatch(getLocations()) 
    if(!isError)
    { 
      dispatch(reset()) 
    }
  }, [user, navigate, isError, message, dispatch])

  if (isLoading) {
    return <Spinner />
  }


  // const { user } = useSelector((state) => state.auth)
  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }

  return (
    <>
      <section className='heading'>
        <h1>Welcome {user && user.name}</h1>
        <h2>GPS Dashboard</h2>
      </section>
      <div className="location-details">
      <p >Device Id</p>
      <p >Device Type</p>
      <p >Timestmap</p>
      <p >Location</p>
      </div>
      <section className='content'>
        {locations.length > 0 ? (
          <div className='locations'>
            {locations.map((location) => (
              <LocationItem key={location.deviceid + location.timestamp} location={location} />
            ))}
          </div>
        ) : (
          <h3>You don't have any location data</h3>
        )}
      </section>
      <button className='btn' onClick={onLogout}>
              {/* <FaSignOutAlt /> Logout */}
              Logout
            </button>
    </>
  )
}

export default Dashboard
