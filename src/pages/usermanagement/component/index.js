import React, { useEffect, useState } from 'react';
import * as Yup from "yup";
import { useFormik } from 'formik';
import GlobalDropdown from '../../../ui-components/globaldropdown';
import GlobalTextarea from '../../../ui-components/globaltextarea';
import GlobalInputField from '../../../ui-components/globalinputfield';
import DefaultButton from '../../../ui-components/defaultbutton';
import SecondaryButton from '../../../ui-components/secondarybutton';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, getUserList, resetUserSlice, updateUser } from '../../../redux/auth_slice/usermanagement_slice';
import { reduxService } from '../../../redux/services/redux_utils';
import { toast } from 'react-toastify';

const AddEditUser = (props) => {
    const dispatch = useDispatch();
    const { onHide, editData } = props;

    //Redux Selector
    const addUserReducer = useSelector((state) => state.userMainList);
    const { addLoading, addSuccess, addError } = addUserReducer;
    const editUserReducer = useSelector((state) => state.userMainList);
    const { updateData, updateSuccess, updateError, editLoading } = editUserReducer;

    //Formik Vaidations
    const validationSchema = Yup.object().shape({
        full_Name: Yup.mixed().required("Full Name is required"),
        email_Address: Yup.mixed().required("Email Address is required"),
        assign_Role: Yup.mixed().required("Role is required"),
    });

    const formik = useFormik({
        validationSchema: validationSchema,
        initialValues: {
            full_Name: "",
            email_Address: "",
            user_Name: "",
            phone_No: "",
            gender: "",
            assign_Role: "",
            address: "",
        },
        onSubmit: async (values) => {
            const payload = {
                id: values.id,
                fullName: values.full_Name,
                emailAddress: values.email_Address,
                userName: values.user_Name,
                phoneNumber: values.phone_No,
                address: values.address,
                role: values.assign_Role.name,
                gender: values.gender.name,
                isActive: true,
                password: ""
            };
            if (editData === null) {
                dispatch(addUser(payload));
            } else {
                payload.id = editData.id;
                dispatch(updateUser(values));

            }
        }
    });
    useEffect(() => {
        reduxService.handleResponse({
            success: addSuccess,
            error: addError,
            successMsg: 'Successfully Added',
            resetCallback: () => {
                dispatch(resetUserSlice());
            },
            successCallBack: () => {
                formik.resetForm();
                onHide();
                dispatch(getUserList());
                window.location.reload();
            }
        });
    }, [addSuccess, addError]);
    useEffect(() => {
        if (updateSuccess !== undefined) {
            if (updateSuccess === true) {
                toast.success("Status Updated Successfully");
                formik.resetForm();
                onHide();
                dispatch(getUserList());
            } else {
                toast.error(updateError);
            }
        }
        return () => {

            dispatch(resetUserSlice());
        }

    }, [updateData, updateSuccess, updateError]);

    //Drpdown List
    const roleName = [
        { name: "Admin", code: "AD" },
        { name: "User", code: "US" }
    ];
    const genderName = [
        { name: "Male", code: "ML" },
        { name: "Female", code: "FM" },
        { name: "Other", code: "OT" },
    ];
    //Formik Error
    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
    };

    return (
        <>
            <div className='container-fluid'>
                <form onSubmit={formik.handleSubmit}>
                    <div className="grid">
                        <div className="col-12 md:col-6 pb-3">
                            <GlobalInputField
                                label="Full Name"
                                name="full_Name"
                                id="full_Name"
                                placeholder="Enter Full Name"
                                isRequired
                                disabled={editData !== null}
                                value={formik.values.full_Name}
                                onChange={formik.handleChange}
                            />
                            {getFormErrorMessage('full_Name')}
                        </div>
                        <div className="col-12 md:col-6 pb-3">
                            <GlobalInputField
                                label="Email Address"
                                name="email_Address"
                                id="email_Address"
                                placeholder="Enter Email Address"
                                isRequired
                                disabled={editData !== null}
                                value={formik.values.email_Address}
                                onChange={formik.handleChange}
                            />
                            {getFormErrorMessage('email_Address')}
                        </div>
                        <div className="col-12 md:col-6 pb-3">
                            <GlobalInputField
                                label="Username"
                                name="user_Name"
                                id="user_Name"
                                placeholder="Enter Username"
                                // isRequired
                                disabled={editData !== null}
                                value={formik.values.user_Name}
                                onChange={formik.handleChange}
                            />
                            {getFormErrorMessage('user_Name')}
                        </div>
                        <div className="col-12 md:col-6 pb-3">
                            <GlobalInputField
                                label="Phone No"
                                name="phone_No"
                                id="phone_No"
                                placeholder="Enter Phone No"
                                disabled={editData !== null}
                                value={formik.values.phone_No}
                                onChange={formik.handleChange}
                            />
                            {getFormErrorMessage('phone_No')}
                        </div>
                        <div className="col-12 md:col-6 pb-3">
                            <GlobalDropdown
                                label="Gender"
                                name="gender"
                                id="gender"
                                options={genderName}
                                optionLabel="name"
                                placeholder="Select"
                                disabled={editData !== null}
                                value={formik.values.gender}
                                onChange={formik.handleChange}
                            />
                            {getFormErrorMessage('gender')}
                        </div>
                        {/* {editData !== null && ( */}
                        <div className="col-12 md:col-6 pb-3">
                            <GlobalDropdown
                                label="Role"
                                id="assign_Role"
                                name="assign_Role"
                                options={roleName}
                                optionLabel="name"
                                placeholder="Select"
                                isRequired
                                value={formik.values.assign_Role}
                                onChange={formik.handleChange}
                            />
                            {getFormErrorMessage('assign_Role')}
                        </div>
                        {/* )} */}
                        <div className="col-12 md:col-12 pb-3">
                            <GlobalTextarea
                                label="Address"
                                name="address"
                                id="address"
                                rows="3"
                                placeholder="Enter Address"
                                disabled={editData !== null}
                                value={formik.values.address}
                                onChange={formik.handleChange}
                            />
                            {getFormErrorMessage('address')}
                        </div>
                        <div className='col-12 mb-3'>
                            <div className='text-center'>
                                <DefaultButton label="Cancel"
                                    style={{ marginRight: "7px" }}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        onHide()
                                    }} />
                                <SecondaryButton
                                    type="submit"
                                    style={{ marginLeft: "7px" }}
                                    label={editData == null ? "Save" : "Update"}
                                    loading={editData == null ? addLoading : editLoading}

                                />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default AddEditUser
