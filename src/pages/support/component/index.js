import React, { useEffect } from 'react'
import * as Yup from "yup";
import { useFormik } from 'formik';
import DefaultButton from '../../../ui-components/defaultbutton';
import SecondaryButton from '../../../ui-components/secondarybutton';
import GlobalDropdown from '../../../ui-components/globaldropdown';
import GlobalInputField from '../../../ui-components/globalinputfield';
import GlobalTextarea from '../../../ui-components/globaltextarea';
import { useDispatch, useSelector } from 'react-redux';
import { addSupport, getSupportList, resetSupportSlice, updateSupport } from '../../../redux/auth_slice/support_slice';
import { reduxService } from '../../../redux/services/redux_utils';
// import { Button } from 'primereact/button';

const AddEditTicket = (props) => {
    const dispatch = useDispatch();
    const { onHide, editData } = props;
    //Redux Selector
    const addSupportReducer = useSelector((state) => state.supportMainList);
    const { addLoading, addSuccess, addError } = addSupportReducer;
    
    //Redux Selector End


    //Formik Vaidations
    const validationSchema = Yup.object().shape({
        ticketTitle: Yup.mixed().required("Ticket Title is required"),
        ticketType: Yup.mixed().required("Ticke Type is required"),
        priority: Yup.mixed().required("Priority is required"),
        assign_To: editData === null ? null : Yup.mixed().required("Assign To is required"),
        ticketDetails: Yup.mixed().required("Ticket Details is required"),
    });

    const formik = useFormik({
        validationSchema: validationSchema,
        initialValues: {
            ticketTitle: "",
            ticketType: "",
            priority: "",
            assign_To: "",
            ticketDetails: "",
        },
        onSubmit: async (data) => {

            console.log(data, "Add Data");
            const payload = {
                id: 0, // Assuming id is always 0 for new entries
                title: data.ticketTitle,
                ticket_type_text: data.ticketType.name,
                created_at: new Date().toISOString(), // You may adjust this based on your requirements
                resolution_date: null, // You may adjust this based on your requirements
                createdby: null, // You may adjust this based on your requirements
                assignedto: data.assign_To || null, // If assign_To is null, it will be set to null in the payload
                priority_text: data.priority.name,
                status_text: null // You may adjust this based on your requirements
            };
            console.log(payload, "Add Data");
            // return
            // dispatch(addSupport(data))
            if (editData === null) {
                dispatch(addSupport(data));
            }
            // else {
            //     data['id'] = editData.id;
            //     dispatch(updateSupport(data));
            // }

            // dispatch(addSupport(body));

        },
    });

    useEffect(() => {
        reduxService.handleResponse({
            success: addSuccess,
            error: addError,
            successMsg: 'Successfully Added',
            resetCallback: () => {
                dispatch(resetSupportSlice());
            },
            successCallBack: () => {
                formik.resetForm();
                onHide();
                dispatch(getSupportList());
            }
        });
    }, [dispatch, addSuccess, addError]);



    //Drpdown List
    const priorityName = [
        { name: "Critical", status: "CT" },
        { name: "High", status: "HG" },
        { name: "Medium", status: "MD" },
        { name: "Low", status: "LW" },
    ];
    const ticketName = [
        { name: "Feedback", status: "FB" },
        { name: "Error", status: "ER" },
        { name: "Help", status: "HP" },
    ];
    const assignTo = [
        { name: "Ahmed", status: "AH" },
        { name: "Jaleel", status: "JL" },
        { name: "Islam", status: "IS" },
    ];

    useEffect(() => {
        dispatch(getSupportList());
    }, []);

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
                                label="Ticket Title"
                                name="ticketTitle"
                                id="ticketTitle"
                                placeholder="Enter text here"
                                isRequired
                                disabled={editData !== null}
                                value={formik.values.ticketTitle}
                                onChange={formik.handleChange}
                            />
                            {getFormErrorMessage('ticketTitle')}
                        </div>
                        <div className="col-12 md:col-6 pb-3">
                            <GlobalDropdown
                                label="Ticket Type"
                                name="ticketType"
                                id="ticketType"
                                options={ticketName}
                                optionLabel="name"
                                optionValue="status"
                                placeholder="Select"
                                isRequired
                                disabled={editData !== null}
                                value={formik.values.ticketType}
                                onChange={formik.handleChange}
                            />
                            {getFormErrorMessage('ticketType')}
                        </div>
                        <div className="col-12 md:col-6 pb-3">
                            <GlobalDropdown
                                label="Priority"
                                id="priority"
                                name="priority"
                                options={priorityName}
                                optionLabel="name"
                                optionValue="status"
                                placeholder="Select"
                                isRequired
                                disabled={editData !== null}
                                value={formik.values.priority}
                                onChange={formik.handleChange}
                            />
                            {getFormErrorMessage('priority')}
                        </div>

                        {editData !== null && (
                            <div className="col-12 md:col-6 pb-3">
                                <GlobalDropdown
                                    label="Assign To"
                                    id="assign_To"
                                    name="assign_To"
                                    options={assignTo}
                                    optionLabel="name"
                                    optionValue="status"
                                    placeholder="Select"
                                    isRequired
                                    value={formik.values.assign_To}
                                    onChange={formik.handleChange}
                                />
                                {getFormErrorMessage('assign_To')}
                            </div>
                        )}
                        <div className="col-12 col-md-12 pb-3">
                            <GlobalTextarea
                                label="Ticket Details"
                                name="ticketDetails"
                                id="ticketDetails"
                                rows="3"
                                placeholder="Enter text here"
                                isRequired
                                disabled={editData !== null}
                                value={formik.values.ticketDetails}
                                onChange={formik.handleChange}
                            />
                            {getFormErrorMessage('ticketDetails')}
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
                                    loading={addLoading}
                                />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}


export default AddEditTicket
