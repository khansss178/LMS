import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "primereact/button";
// import { loginAction } from "../../redux/actions/authAction";
// import LogoImage from "../../Images/js_connect_logo_main@2x.png";
import "./Login.css";

const Login = () => {
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
    const [loading, setloading] = useState(false);
    const [loadingIcon, setloadingIcon] = useState("");

    let history = useHistory();
    const handleLogin = async (e) => {
        e.preventDefault();
        setloading(true);
        setloadingIcon("pi pi-spin pi-spinner");
        const data = {
            userName: username,
            password: password,
        };
        // const res = await dispatch(loginAction(data));
        setloading(false);
        setloadingIcon("");
        // if (res?.login)
        localStorage.setItem("login", "true");
        history.push("/dashboard");
    };
    return (
        <div className="login_body">
            <div align="center" style={{ marginTop: "4%", marginBottom: "1%" }}>
                <img src="" alt="" width={"50%"} />
            </div>
            <div class="container" id="container">
                <div class="form-container sign-in-container">
                    <form action="#" className="login_form">
                        <div className="p-mb-4">
                            <h1 className="login_h1">Login</h1>
                        </div>
                        <div className="p-mt-4">
                            <input className="login_input" value={username} onChange={(e) => setusername(e.target.value)} type="text" placeholder="User Name" />
                            <input className="login_input" value={password} onChange={(e) => setpassword(e.target.value)} type="password" placeholder="Password" />
                            <div className="p-mt-2">
                                <Button className="login_button" label="Login" icon={loadingIcon || ""} iconPos="right" disabled={loading} onClick={handleLogin} />
                            </div>
                        </div>
                    </form>
                </div>
                <div class="overlay-container">
                    <div class="overlay">
                        <div class="overlay-panel overlay-right">
                            <h1 className="login_h1">Welcome!</h1>
                            <p className="login_p">Please login to access TEEK Portal</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Login;
