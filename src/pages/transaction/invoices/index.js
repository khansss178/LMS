import React from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const InvoicesView = () => {
  const data = [{ nature: "test", feeName: "temp", charges: "12PKR" }]
  return (
    <>

      <div className='card'>
        <DataTable filter value={data} responsiveLayout="scroll" key="_id">

          <Column field="nature" header="Natures"></Column>
          <Column field="feeName" header="Fee Names"></Column>
          <Column field="charges" header="Fee Charges"></Column>
        </DataTable>

      </div>

    </>
  )
}

export default InvoicesView
