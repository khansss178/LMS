import React, { useState } from "react";

// Formik
import * as Yup from "yup";
import { useFormik } from "formik";

// Prime React
// import { Button } from "primereact/button";
import { Password } from "primereact/password";
import SecondaryButton from '../../../../ui-components/secondarybutton';

const ChangePassword = () => {
  // const { user } = useSelector(loginState);
  // const toastContext = useContext(ToastContext);
  // const [isLoading, setIsLoading] = useState(false);

  const validationSchema = Yup.object().shape({
    current_password: Yup.string().required("Current Password is required"),
    new_password: Yup.string()
      .required("New Password is required")
      .max(20, "Maximum length should be 20")
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/, "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"),
    confirm_password: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("new_password"), null], "Passwords must match"),
  });

  const formik = useFormik({
    validationSchema: validationSchema,
    initialValues: {
      current_password: "",
      new_password: "",
      confirm_password: "",
    },
    onSubmit: async (data) => {
      console.log("object", data);
      return
      // setIsLoading(true);
      // try {
      //   let dto = {
      //     previous_password: data.current_password,
      //     new_password: data.new_password,
      //   };
      //   let resp = await changePassword(dto);
      //   if (resp.data.status) {
      //     formik.resetForm();
      //     toastContext.updateToast("Password");
      //   } else {
      //     toastContext.showMessage("Error", resp.data.message, "error");
      //   }
      //   setIsLoading(false);
      //   return;
      // } catch (error) {
      //   console.log(error);
      //   setIsLoading(false);
      // }
    },
  });
  const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
  const getFormErrorMessage = (name) => {
    return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
  };
  return (
    <div>
      {/* <h5>Change Password</h5> */}
      <form onSubmit={formik.handleSubmit}>
        <div className="grid mt-4">
          <div className="md:col-4 col-12">
            <label htmlFor="current_password">
              <b> Current Password</b> <span className="clr_red">*</span>
            </label>
            <Password
              name="current_password"
              id="current_password"
              placeholder="Enter Current Password"
              maxLength="20"
              value={formik.values.current_password}
              onChange={formik.handleChange}
              className="mt-2"
              onBlur={formik.handleBlur}
              toggleMask
            />
            {getFormErrorMessage("current_password")}
          </div>
          <div className="md:col-4 col-12">
            <label htmlFor="new_password">
              <b>New Password</b> <span className="clr_red">*</span>
            </label>
            <Password
              name="new_password"
              id="new_password"
              placeholder="Enter New Password"
              maxLength="20"
              value={formik.values.new_password}
              onChange={formik.handleChange}
              className="mt-2"
              onBlur={formik.handleBlur}
              toggleMask
            />
            {getFormErrorMessage("new_password")}
          </div>
          <div className="md:col-4 col-12">
            <label htmlFor="confirm_password">
              <b>Confirm Password</b> <span className="clr_red">*</span>
            </label>
            <Password
              name="confirm_password"
              id="confirm_password"
              placeholder="Enter Confirm Password"
              maxLength="20"
              value={formik.values.confirm_password}
              onChange={formik.handleChange}
              className="mt-2"
              onBlur={formik.handleBlur}
              toggleMask
            />

            {getFormErrorMessage("confirm_password")}
          </div>
        </div>
        <div className="mt-6 text-right">
          <SecondaryButton
            label="Change Password"
            type="submit"
          //  className="btn btn-default savebtn"
          // isLoading={isLoading}
          />
        </div>
      </form>
    </div>
  );
};


export default ChangePassword
