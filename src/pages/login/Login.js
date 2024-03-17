import React, { useEffect } from 'react'
import { useFormik } from "formik";
import * as Yup from 'yup';
// import { useHistory } from "react-router-dom";
import { Button } from "primereact/button";
// import { loginAction } from "../../redux/actions/authAction";
// import LogoImage from "../../Images/js_connect_logo_main@2x.png";
import "./Login.css";
import { resetChangeStatus, loginUser } from "../../redux/auth_slice/login_user_slice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
// import classNames from 'classnames';

const Login = () => {
    // const [username, setusername] = useState("");
    // const [password, setpassword] = useState("");
    //redux
    const { success, error, loading } = useSelector((state) => state.loginUser);

    //hooks

    useEffect(() => {
        if (success !== undefined) {
            if (success === true) {
                toast.success('successfully logged in');
            } else {
                toast.warn(error)
            }

        }
        return () => {

            dispatch((resetChangeStatus))
        }

    }, [success]);

    const dispatch = useDispatch();

    //forms
    const validationSchema = Yup.object().shape({

        password: Yup.string().required("Password is required.").min(8, 'Minimum length should be 8'),
        username: Yup.string().required("Email is required."),

    });

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        validationSchema: validationSchema,
        onSubmit: async (data) => {
            dispatch(loginUser(data));
            console.log(data);

        },
    });
    // const history = useHistory();
    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
    };
    return (
        <div className="login_body">
            <div align="center" style={{ marginTop: "4%", marginBottom: "1%" }}>
                <img src="" alt="" width={"50%"} />
            </div>
            <div className="container" id="container">
                <div className="form-container sign-in-container">
                    <form className="login_form" onSubmit={formik.handleSubmit}>
                        <div className="p-mb-4">
                            <h1 className="login_h1">Login</h1>
                        </div>
                        <div className="p-mt-4">
                            <div className="user_Email-Name">
                                <label><b>Username</b></label>
                                <input id='username' name='username' value={formik.values.username} onChange={formik.handleChange} autoFocus className="login_input" type="text" placeholder="User Name" />
                                {getFormErrorMessage('username')}
                            </div>
                            <div className="user_Email-Name">
                                <label><b>Password</b></label>
                                <input className="login_input input_pass"
                                    value={formik.values.password} onChange={formik.handleChange}
                                    name="password" id="password"
                                    type="password"
                                    placeholder="Enter Password Here!"
                                />
                                {getFormErrorMessage("password")}
                            </div>
                            <div className="p-mt-2">
                                <Button className="login_button" label="Login" loading={loading} type="submit" />
                            </div>
                        </div>
                    </form>
                </div>
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-right">
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
