import { useDispatch,  } from "react-redux";
import "../assets/styles/Login.css";
import FacebookLogin from "react-facebook-login";
import { loginUser } from '../actions/index'
import { useState } from "react";

export const Login = () => {
  const dispatch = useDispatch({});
  const [userRole, setUserRole] = useState('estudiante');
  
  //faceboook auth callback
  const responseFacebook = (response) => {
    const data = {
      name: response.name,
      picture: response.picture,
      email: response.email,
      id: response.userID,
      role : userRole,
    };
    const redirectUrl = './home'
    if (data) {
      dispatch(loginUser(data ,redirectUrl ));
    }
  };

  return (
    <div>
      <div className="page" id="page">
        <h1 className="tittle">Kuepa</h1>
        <div class="login-wrap">
          <div class="login-html">
            <input id="tab-1" type="radio" name="tab" value={userRole} onClick={()=>setUserRole("estudiante")} class="sign-in" checked />
            <label for="tab-1" class="tab">
              Estudiante
            </label>
            <input id="tab-2" type="radio" name="tab" value={userRole} onClick={()=>setUserRole("Instructor")} class="sign-up" />
            <label for="tab-2" class="tab">
              Instructor
            </label>
            <div class="login-form">
              <div class="sign-in-htm">
                <div class="group">
                  <label for="user" class="label">
                    Ingresa/Registrate como estudiante
                  </label>
                  <div class="group">
                    <FacebookLogin
                      appId="266518281927428"
                      icon="fa-facebook"
                      textButton="facebook"
                      autoLoad={false}
                      fields="name,email,picture"
                      onClick={"hi"}
                      callback={responseFacebook}
                      render={(renderProps) => (
                        <input
                          type="submit"
                          class="button"
                          onClick={renderProps.onClick}
                          value="Sign Up"
                        />
                      )}
                    />
                  </div>
                  <div class="hr"></div>
                </div>
              </div>
              <div class="sign-up-htm">
                <div class="group">
                  <label for="pass" class="label">
                  Ingresa/Registrate como instructor
                  </label>
                </div>
                <div class="group">
                <FacebookLogin
                      appId="266518281927428"
                      icon="fa-facebook"
                      textButton="facebook"
                      autoLoad={false}
                      fields="name,email,picture"
                      onClick={"hi"}
                      callback={responseFacebook}
                      render={(renderProps) => (
                        <input
                          type="submit"
                          class="button"
                          onClick={renderProps.onClick}
                          value="Sign Up"
                          /> 
                          )}
                          />
                </div>
                <div class="hr"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
