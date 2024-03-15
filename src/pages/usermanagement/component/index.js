import React, { useState } from 'react'
import GlobalDropdown from '../../../ui-components/globaldropdown';
import GlobalTextarea from '../../../ui-components/globaltextarea';
import GlobalInputField from '../../../ui-components/globalinputfield';
import DefaultButton from '../../../ui-components/defaultbutton';
import SecondaryButton from '../../../ui-components/secondarybutton';

const AddEditUser = (props) => {
    const { onHide, editData } = props;
    //States
    const [selectedRole, setSelectedRole] = useState(null);
    const [selectedGender, setSelectedGender] = useState(null);
    //OnChange Function
    const onRoleChange = (e) => {
        setSelectedRole(e.value);
    };
    const onGenderChange = (e) => {
        setSelectedGender(e.value);
    };

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

    return (
        <>
            <div className='container-fluid'>
                <div className="grid">
                    <div className="col-12 md:col-6 pb-3">
                        <GlobalInputField
                            label="Full Name"
                            name="full_Name"
                            id="full_Name"
                            placeholder="Enter Full Name"
                            isRequired
                            disabled={editData !== null}
                        />
                    </div>
                    <div className="col-12 md:col-6 pb-3">
                        <GlobalInputField
                            label="Email Address"
                            name="email_Address"
                            id="email_Address"
                            placeholder="Enter Email Address"
                            isRequired
                            disabled={editData !== null}
                        />
                    </div>
                    <div className="col-12 md:col-6 pb-3">
                        <GlobalInputField
                            label="Username"
                            name="user_Name"
                            id="user_Name"
                            placeholder="Enter Username"
                            // isRequired
                            disabled={editData !== null}
                        />
                    </div>
                    <div className="col-12 md:col-6 pb-3">
                        <GlobalInputField
                            label="Phone No"
                            name="phone_No"
                            id="phone_No"
                            placeholder="Enter Phone No"
                            // isRequired
                            disabled={editData !== null}
                        />
                    </div>
                    <div className="col-12 md:col-6 pb-3">
                        <GlobalDropdown
                            label="Gender"
                            name="gender"
                            id="gender"
                            value={selectedGender}
                            options={genderName}
                            onChange={onGenderChange}
                            optionLabel="name"
                            placeholder="Select"
                            // isRequired
                            disabled={editData !== null}
                        />
                    </div>
                    {/* {editData !== null && ( */}
                    <div className="col-12 md:col-6 pb-3">
                        <GlobalDropdown
                            label="Role"
                            id="assign_Role"
                            name="assign_Role"
                            value={selectedRole}
                            options={roleName}
                            onChange={onRoleChange}
                            optionLabel="name"
                            placeholder="Select"
                            isRequired
                        />
                    </div>
                    {/* )} */}
                    <div className="col-12 md:col-12 pb-3">
                        <GlobalTextarea
                            label="Address"
                            name="address"
                            id="address"
                            rows="3"
                            placeholder="Enter Address"
                            // isRequired
                            disabled={editData !== null}
                        />
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
                                style={{ marginLeft: "7px" }}
                                label={editData == null ? "Save" : "Update"}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddEditUser
