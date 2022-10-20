import { useState, useEffect } from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { Route, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { login, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faAt, faLocationPinLock, faLock, faLongArrowUp} from '@fortawesome/free-solid-svg-icons'

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { email, password } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess || user) {
      navigate('/')
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const userData = {
      email,
      password,
    }

    dispatch(login(userData))
  }

  if (isLoading) {
    return <Spinner />
  }
  const createAccount =()=>{
    navigate('/register')
  }

  return (
    <>
      {/* <section className='heading'>
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Login and start setting locations</p>
      </section> */}

      <div className='section'>
        <div className='container'>
          <div className='row full-height justify-content-center'>
          <div className='col-12 text-center align-self-center py-5'>
          <div className='section pb-5 pt-5 pt-sm-2 test-center'>
          <div className='card-3d-wrap mx-auto'>
        <div className='card-3d-wrapper '>
          <div className='card-front'>
            <div className='center-wrap'>
              <div className='section text-center'>
              <h4 class="mb-4 pb-3">Log In</h4>
              <div className='form'>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <input
              type='email'
              className='form-style'
              id='email'
              name='email'
              value={email}
              placeholder='Enter your email'
              onChange={onChange}
            />
            {/* <i class="input-icon fa-at"></i> */}
            
            <FontAwesomeIcon className='input-icon' icon={faAt} />
          </div>
          <div className='form-group  mt-2'>
            <input
              type='password'
              className='form-style'
              id='password'
              name='password'
              value={password}
              placeholder='Enter password'
              onChange={onChange}
            />
            {/* <i class="input-icon uil uil-lock-alt"></i> */}
            <FontAwesomeIcon className='input-icon' icon={faLock} />
          </div>

          <div className='form-group'>
            <button type='submit' className='btn mt-4'>
              Login
            </button>
          </div>
          <div className='form-group' onClick={createAccount}>
          <p class=""><a href="#0" class="link">Create your account?</a></p>
          </div>
        </form>
      </div>
              </div>
            </div>
          </div>
        </div>
      </div>
          </div>
          </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
