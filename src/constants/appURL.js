const appURL = {
    baseUrl: 'https://zfkwjgvbz4irxgpaa3qxz5rmzq0alhsm.lambda-url.us-east-1.on.aws/api/',
    adminLogin: 'Account/Login',
    // Support
    getSupportList: 'Support/GetAllTicketList',
    addSupport: 'Support/AddNewTicket',
    updateSupport: 'Support/UpdateTicketById',
    deleteSupport: 'Support/DeleteTicketById',
    // UserManagement
    getUserList: 'Account/GetAllUserList',
    addUser: 'Account/AddUser',
    updateUser: 'Account/UpdateUser',
    deleteUser: 'Account/DeleteUser',
    // ClientManagement
    getClientList: 'Client/GetAllClientList',
    addClient: 'Client/AddNewClient',
    updateClient: 'Client/UpdateClientById',
    deleteClient: 'Client/DeleteClientById',
    // Loan Credit Request
    clientCreditRequestMainListView: 'LoanTransaction/GetCreditRequestList',
    addClientCreditRequest: 'LoanTransaction/AddCreditRequest',
    deleteCreditRequest: '',
}

export default appURL
