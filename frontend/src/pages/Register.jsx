import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faAt, faLock,faUser} from '@fortawesome/free-solid-svg-icons'

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== password2) {
      toast.error("Passwords do not match");
    } else {
      const userData = {
        name,
        email,
        password,
      };

      dispatch(register(userData));
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  const loginAccount = () => {
    navigate("/login");
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="row full-height justify-content-center">
            <div className="col-12 text-center align-self-center">
              <div className="section pb-5 pt-2 pt-sm-2 text center">
                <div className="card-3d-wrap mx-auto">
                  <div className="card-3d-wrapper">
                    <div className="card-front">
                      <div className="center-wrap">
                        <div className="section text-center">
                          <h4 class="mb-4 pt-3 ">Sign Up</h4>
                          <div className="form">
                            <form onSubmit={onSubmit}>
                              <div className="form-group">
                                <input
                                  type="text"
                                  className="form-style"
                                  id="name"
                                  name="name"
                                  value={name}
                                  placeholder="Enter your name"
                                  onChange={onChange}
                                />
                                <FontAwesomeIcon className='input-icon' icon={faUser} />
                              </div>
                              <div className="form-group">
                                <input
                                  type="email"
                                  className="form-style"
                                  id="email"
                                  name="email"
                                  value={email}
                                  placeholder="Enter your email"
                                  onChange={onChange}
                                />
                                <FontAwesomeIcon className='input-icon' icon={faAt} />
                              </div>
                              <div className="form-group">
                                <input
                                  type="password"
                                  className="form-style"
                                  id="password"
                                  name="password"
                                  value={password}
                                  placeholder="Enter password"
                                  onChange={onChange}
                                />
                                <FontAwesomeIcon className='input-icon' icon={faLock} />
                              </div>
                              <div className="form-group">
                                <input
                                  type="password"
                                  className="form-style"
                                  id="password2"
                                  name="password2"
                                  value={password2}
                                  placeholder="Confirm password"
                                  onChange={onChange}
                                />
                                <FontAwesomeIcon className='input-icon' icon={faLock} />
                              </div>
                              <div className="form-group">
                                <button type="submit" className="btn">
                                  Sign Up
                                </button>
                                <div className='form-group' onClick={loginAccount}>
                                  <p ><a href=" " class="link">Already have an account?</a></p>
                                </div>
                                
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
  );
}

export default Register;
