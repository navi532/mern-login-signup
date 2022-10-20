import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaUser } from "react-icons/fa";
import { register, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";

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
      {/* <div className='section'>
      <div className='container '>
      <div className='justify-content-center'>
        <h1>
          <FaUser /> Register
        </h1>
        <h1 >Please create an account</h1>
      </div>
      </div>
      </div> */}

      <div className="section">
        <div className="container">
          <div className="row full-height justify-content-center">
            <div className="col-12 text-center align-self-center py-5">
              <div className="section pb-5 pt-5 pt-sm-2 text center">
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
                              </div>
                              <div className="form-group">
                                <input
                                  type="email"
                                  className="form-style mt-2"
                                  id="email"
                                  name="email"
                                  value={email}
                                  placeholder="Enter your email"
                                  onChange={onChange}
                                />
                              </div>
                              <div className="form-group">
                                <input
                                  type="password"
                                  className="form-style mt-2"
                                  id="password"
                                  name="password"
                                  value={password}
                                  placeholder="Enter password"
                                  onChange={onChange}
                                />
                              </div>
                              <div className="form-group">
                                <input
                                  type="password"
                                  className="form-style mt-2"
                                  id="password2"
                                  name="password2"
                                  value={password2}
                                  placeholder="Confirm password"
                                  onChange={onChange}
                                />
                              </div>
                              <div className="form-group mt-4">
                                <button type="submit" className="btn">
                                  Sign Up
                                </button>
                              </div>
                              <div onClick={loginAccount}>
                                <p class="mb-0 mt-4 text-center">
                                  <a href="#0" class="link">
                                    Already have an account?
                                  </a>
                                </p>
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
