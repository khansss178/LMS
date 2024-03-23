import React, { useEffect } from 'react'
import * as Yup from "yup";
import { useFormik } from 'formik';
import GlobalInputField from '../../../../ui-components/globalinputfield';
import DefaultButton from '../../../../ui-components/defaultbutton';
import SecondaryButton from '../../../../ui-components/secondarybutton';
import GlobalDropdown from '../../../../ui-components/globaldropdown';
import { toast } from 'react-toastify';
import { getClientCreditRequestMainList, resetClientCreditRequestMainListSlice } from '../../../../redux/auth_slice/clientcreditreq_slice';
import { reduxService } from '../../../../redux/services/redux_utils';
import { useDispatch, useSelector } from 'react-redux';
const AddeditRequest = (props) => {
    const { editData, onHide } = props;

    const dispatch = useDispatch();

    const addClientCreditRequest = useSelector((state) => state.clientCreditRequestMainList);
    const { data: clientCreditRequestMainList, addLoading, addSuccess, addError } = addClientCreditRequest;
    const editSupportReducer = useSelector((state) => state.clientCreditRequestMainList);
    const { updateData, updateSuccess, updateError, editLoading } = editSupportReducer;

    //Formik Vaidations
    const validationSchema = Yup.object().shape({
        client_Name: Yup.mixed().required("client Name is required"),
        previous_Credit_Limit: Yup.mixed().required("Previous Credit Limit is required"),
        request_Credit_Limit: Yup.mixed().required("Request Credit Limit is required"),
        // assign_To: editData === null ? null : Yup.mixed().required("Assign To is required"),
        // status_text: editData === null ? null : Yup.mixed().required("Status is required"),
        current_Credit_Limit: Yup.mixed().required("Current Credit Limit is required"),
    });

    const formik = useFormik({
        validationSchema: validationSchema,
        initialValues: {
            client_Name: "",
            previous_Credit_Limit: "",
            request_Credit_Limit: "",
            current_Credit_Limit: "",
        },
        onSubmit: async (values) => {
            // return;
            console.log(values);
            const payload = {
                id: values.id,
                client_id: values.client_Name,
                previous_credit_limit: values.previous_Credit_Limit,
                previous_credit_limit: values.previous_Credit_Limit,
                requested_Credit_Limit: values.request_Credit_Limit,
                request_type: "",
                status: "",
                createdDate: "",
                createdBy: ""
            };
            if (editData === null) {
                dispatch(addClientCreditRequest(payload));
            }
            // else {
            //     payload.id = editData.id;
            //     dispatch(updateSupport(values));

            // }
        }
    });

    useEffect(() => {
        reduxService.handleResponse({
            success: addSuccess,
            error: addError,
            successMsg: 'Successfully Added',
            resetCallback: () => {
                dispatch(resetClientCreditRequestMainListSlice());
            },
            successCallBack: () => {
                formik.resetForm();
                onHide();
                dispatch(getClientCreditRequestMainList());
                window.location.reload();
            }
        });
    }, [addSuccess, addError]);
    // useEffect(() => {
    //     if (updateSuccess !== undefined) {
    //         if (updateSuccess === true) {
    //             toast.success("Status Updated Successfully");
    //             formik.resetForm();
    //             onHide();
    //             dispatch(get());
    //         } else {
    //             toast.error(updateError);
    //         }
    //     }
    //     return () => {

    //         dispatch(resetClientCreditRequestMainListSlice());
    //     }

    // }, [updateData, updateSuccess, updateError]);

    //Drpdown List
    // const clientName = [
    //     { name: "Amir", status: "HG" },
    //     { name: "Saad", status: "MD" },
    //     { name: "Lamda", status: "LW" },
    // ];

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
                            <GlobalDropdown
                                label="Client Name"
                                name="client_Name"
                                id="client_Name"
                                options={clientCreditRequestMainList}
                                optionLabel="name"
                                optionValue="id"
                                placeholder="Select"
                                isRequired
                                // disabled={editData !== null}
                                value={formik.values.client_Name}
                                onChange={formik.handleChange}
                            />
                            {getFormErrorMessage('client_Name')}
                        </div>

                        <div className="col-12 md:col-6 pb-3">
                            <GlobalInputField
                                label="Previous Credit Limit"
                                name="previous_Credit_Limit"
                                id="previous_Credit_Limit"
                                placeholder="Enter text here"
                                // isRequired
                                disabled
                                value={formik.values.previous_Credit_Limit}
                                onChange={formik.handleChange}
                            />
                            {getFormErrorMessage('previous_Credit_Limit')}
                        </div>

                        <div className="col-12 md:col-6 pb-3">
                            <GlobalInputField
                                label="Request Credit Limit"
                                name="request_Credit_Limit"
                                id="request_Credit_Limit"
                                placeholder="Enter text here"
                                isRequired
                                // disabled
                                value={formik.values.request_Credit_Limit}
                                onChange={formik.handleChange}
                            />
                            {getFormErrorMessage('request_Credit_Limit')}
                        </div>
                        <div className="col-12 md:col-6 pb-3">
                            <GlobalInputField
                                label="Current Credit Limit"
                                name="current_Credit_Limit"
                                id="current_Credit_Limit"
                                placeholder="Enter text here"
                                isRequired
                                disabled
                                value={formik.values.current_Credit_Limit}
                                onChange={formik.handleChange}
                            />
                            {getFormErrorMessage('current_Credit_Limit')}
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
                                // loading={editData == null ? addLoading : editLoading}
                                />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default AddeditRequest
