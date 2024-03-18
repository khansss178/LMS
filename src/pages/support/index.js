import React, { useEffect, useState } from 'react'
//Css
import "./support.scss"
//Prime Component
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { BsTrash } from 'react-icons/bs';
import { FaRegEdit } from "react-icons/fa";
import { BreadCrumb } from "primereact/breadcrumb";
import GlobalVerticalDots from '../../ui-components/globalverticaldots';
import GlobalInputField from '../../ui-components/globalinputfield';
import SecondaryButton from '../../ui-components/secondarybutton';
import GlobalDialogIndex from '../../ui-components/globaldialoge';
import AddEditTicket from './component';
import DeleteDialog from './component/deletedialog';
import { useDispatch, useSelector } from 'react-redux';
import { getSupportList } from '../../redux/auth_slice/support_slice';
const SupportView = () => {
  // const data = [
  //   {
  //     id: 277,
  //     "title": "SQA",
  //     "ticket_type_text": "Feedback",
  //     "priority_text": "High",
  //     "status_text": "Open",
  //     "assignedto": "CA AS",
  //     "createdby": "Amna",
  //     "created_at": "2023-11-30",
  //     "resolution_date": "2024-01-20",
  //   }]
  //Redux Selector
  const supportReducer = useSelector((state) => state.supportMainList);
  // console.log("object:  ", userWhatsappReducer);
  const { data } = supportReducer;
  useEffect(() => {
    dispatch(getSupportList());

  }, []);

  const dispatch = useDispatch();
  // States

  const [isAddDialog, setIsAddDialog] = useState(false);
  const [editData, setEditData] = useState(null);
  const [delDialog, setDelDialog] = useState(false);

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
  // Bredcrumb
  const items = [{ label: `Support` }];
  const home = { icon: 'pi pi-home', to: '/InvoicesView' };
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
                label="Add New Ticket"
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
            <DataTable filter value={data} responsiveLayout="scroll" key="id">
              <Column field="title" header="Ticket Title"></Column>
              <Column field="ticket_type_text" header="Ticket Type"></Column>
              <Column field="priority_text" header="Priority"></Column>
              <Column field="status_text" header="Status"></Column>
              <Column field="assignedto" header="Assigned To"></Column>
              <Column field="createdby" header="Created By"></Column>
              <Column field="created_at" header="Created At"></Column>
              <Column field="resolution_date" header="Resolution"></Column>
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
          header={editData == null ? "Add New Ticket" : "Edit Ticket"}
          draggable={false}
          breakpoints={{ "960px": "80vw", "640px": "90vw" }}
          style={{ width: "40vw" }}
          component={<AddEditTicket editData={editData} onHide={() => { setIsAddDialog(false); setEditData(null) }} />}
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

export default SupportView
