import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useState } from 'react'
import SecondaryButton from '../../ui-components/secondarybutton';
import GlobalInputField from '../../ui-components/globalinputfield';
import { BreadCrumb } from 'primereact/breadcrumb';
import GlobalVerticalDots from '../../ui-components/globalverticaldots';
import { FaRegEdit } from 'react-icons/fa';
import { BsTrash } from 'react-icons/bs';
import GlobalDialogIndex from '../../ui-components/globaldialoge';
// import GlobalInputSwitch from '../../ui-components/globalinputswitch';
import AddEditUser from './component';
import DeleteDialog from './component/deletedialog';

const UserManagement = () => {
  const data = [
    {
      id: 277,
      "full_name": "SQA",
      "email_address": "Feedback@gmail.com",
      "phone_no": "0333-3445678",
      "address": "Test test Lorem IpSum",
      "status": "Active",
    },
    {
      id: 217,
      "full_name": "SQA",
      "email_address": "Feedback@gmail.com",
      "phone_no": "0333-3445678",
      "address": "Test test Lorem IpSum",
      "status": "Inactive",
    },
  ]
  // States

  const [isAddDialog, setIsAddDialog] = useState(false);
  const [editData, setEditData] = useState(null);
  const [delDialog, setDelDialog] = useState(false);
  // const [isInputClick, setIsInputClick] = useState(false);

  const kebabMenuItems = [
    { id: 1, title: "Edit", icon: <FaRegEdit /> },
    { id: 2, title: "Delete", icon: <BsTrash /> },
  ];
  const handleOpenMenuItems = (status) => {

    if (status === 1) {
      setIsAddDialog(true);
      setEditData("Edit")
    } else if (status === 2) {
      setDelDialog(true);

    }
  };

  const actionTemplate = () => {
    return (
      <>
        <GlobalVerticalDots
          items={kebabMenuItems}
          handleMenuOpen={handleOpenMenuItems}
          btnclr={false}
        />
      </>
    );
  }

  // const activeInavtiveTemplate = (rowData) => {
  //   return (<>
  //     <GlobalInputSwitch
  //       checked={rowData.status === "Active"}
       
  //       onClick={() => setIsInputClick(true)}
  //     />
  //   </>)
  // }
  // Bredcrumb
  const items = [{ label: `UserManagement` }];
  const home = { icon: 'pi pi-home' };
  return (
    <>
      <div className="">
        <BreadCrumb model={items} home={home} />
      </div>
      <div className="grid">
        <div className="md:col-8">

        </div>
        <div className="md:col-4 col-12">
          <div className="equal_space inlineFlex">
            <GlobalInputField
              id="searchField"
              name="searchField"
              type="text"
              placeholder="Search..."
              className="input_position"
            />

            <div>
              <SecondaryButton
                label="Add New User"
                type="button"
                onClick={() => setIsAddDialog(true)}
                style={{ width: "120px", height: "36px", marginTop: "5px" }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className='grid'>
        <div className='md:col-12'>
          <div className='card'>
            <DataTable filter value={data} responsiveLayout="scroll" key="_id">
              <Column field="full_name" header="Full Name"></Column>
              <Column field="email_address" header="Ticket Type"></Column>
              <Column field="phone_no" header="Priority"></Column>
              <Column field="address" header="Status"></Column>
              <Column field="status" header="Assigned To"></Column>
              {/* <Column body={activeInavtiveTemplate} header="Active/Inactive"></Column> */}
              <Column body={actionTemplate} header="Action"></Column>
            </DataTable>
          </div>
        </div>
      </div>
      {/*Add Edit Dialogs */}
      {isAddDialog && (
        <GlobalDialogIndex
          showHeader={true}
          visible={isAddDialog}
          onHide={() => { setIsAddDialog(false); setEditData(null) }}
          header={editData == null ? "Add New User" : "Edit User"}
          draggable={false}
          breakpoints={{ "960px": "80vw", "640px": "90vw" }}
          style={{ width: "40vw" }}
        component={<AddEditUser editData={editData} onHide={() => { setIsAddDialog(false); setEditData(null) }} />}
        />
      )
      }
      {/*Del Dialogs */}

      {delDialog && (
        <GlobalDialogIndex
          showHeader={true}
          visible={delDialog}
          onHide={() => setDelDialog(false)}
          header={false}
          draggable={false}
          breakpoints={{ "960px": "80vw", "640px": "90vw" }}
          style={{ width: "20vw" }}
        component={<DeleteDialog onHide={() => setDelDialog(false)} />}
        />
      )}

    </>
  )
}


export default UserManagement
