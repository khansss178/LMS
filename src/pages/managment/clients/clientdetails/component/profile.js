import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getClientById } from '../../../../../redux/auth_slice/client_slice';
// import ClientItem from './clientitem';
const ProfileClient = () => {
    const dispatch = useDispatch();
    const { id } = useParams();


    const clientIDReducer = useSelector((state) => state.clientMainList);
    const { clientDetailsloading, clientDetails } = clientIDReducer;
    useEffect(() => {

        dispatch(getClientById(id));

    }, [dispatch, id]);
    // console.log("Client Details:", clientIDReducer);

    return (
        <>
            {clientDetailsloading && <p>Loading...</p>}
            {clientDetails && (
                <div className='grid'>
                    <div className='md:col-5'>
                        <div className='card'>
                           <div className='flex justify-content-between'></div>
                            {clientDetails?.data?.client_name}
                        </div>

                    </div>
                    <div className='md:col-2'>
                    <div className='card'>
                           <div className='flex justify-content-between'></div>
                            {clientDetails?.data?.client_name}
                        </div>
                    </div>
                    <div className='md:col-5'>
                    <div className='card'>
                           <div className='flex justify-content-between'></div>
                            {clientDetails?.data?.client_name}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default ProfileClient
