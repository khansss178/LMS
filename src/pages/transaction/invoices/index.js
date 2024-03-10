import React, { useState } from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import GlobalVerticalDots from '../../../ui-components/globalverticaldots';
import { BsEye, BsTrash } from 'react-icons/bs';
import { FaUserAlt } from "react-icons/fa";
import SearchInputComponent from '../../../ui-components/searchinputcomponent';
import GlobalDialogIndex from '../../../ui-components/globaldialoge';
import DeleteDialog from './component/deletedialog';

const InvoicesView = () => {
  const data = [{ invoiceNo: "test", scheduleno: "temp", clientName: "12PKR", debtorName: "tester", invoiceDate: "12/12/2023", fundingDate: "12/12/2023", status: "Pending", invoiceAmount: "$ 19.00" }]


// States

const [delDialog, setDelDialog] = useState(false);

  // Action Template
  const kebabMenuItems = [
    { id: 1, title: "Assign Ticket", icon: <FaUserAlt /> },
    { id: 2, title: "Response", icon: <BsEye /> },
    { id: 3, title: "Delete", icon: <BsTrash /> },
  ];
  const handleOpenMenuItems = (status) => {

    if (status === 1) {
      // setDelDialog(true);
      // setEditData("Edit");
      // router.push("/campaign/add-campaign");
    } else if (status === 2) {
      // setIsResponseDialog(true);
      // setIsAddDialog(false);
      // setEditData("Edit")

    } else if (status === 3) {
      setDelDialog(true);
      // setIsAddDialog(false);
      // setIsResponseDialog(false);
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
  return (
    <>
      <div className='grid'>
        <div className='md:col-6'>
          text
        </div>
        <div className='md:col-6'>
        <SearchInputComponent type="text" placeholder="Search by invoice no & client name" />
        </div>
        <div className='md:col-12'>
          <div className='card'>
            <DataTable filter value={data} responsiveLayout="scroll" key="_id">
              <Column field="invoiceNo" header="Invoice No"></Column>
              <Column field="scheduleno" header="Schedule No"></Column>
              <Column field="clientName" header="Client Name"></Column>
              <Column field="debtorName" header="Debtor Name"></Column>
              <Column field="invoiceDate" header="Invoice Date"></Column>
              <Column field="fundingDate" header="Funding Date"></Column>
              <Column field="status" header="Status"></Column>
              <Column field="invoiceAmount" header="invoice Amount"></Column>
              <Column body={actionTemplate} header="Action"></Column>
            </DataTable>
          </div>
        </div>
      </div>
      {/* Dialogs */}
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

export default InvoicesView
