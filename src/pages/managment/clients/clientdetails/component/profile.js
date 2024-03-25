import React, { useEffect } from 'react'
import moment from 'moment';
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
                            {/* Heading */}
                            <div className='flex justify-content-between mb-3'>
                                <h4>
                                    {clientDetails?.data?.client_name}
                                </h4>
                            </div>
                            {/* Details */}
                            <div className=''>
                                <div>
                                    <p>Application on:</p>
                                    <p>{moment(clientDetails?.data?.application_date).format('YYYY-MM-DD')}</p>
                                </div>
                                <div>
                                    <p>
                                        contact no:
                                    </p>
                                    <p>{clientDetails?.data?.client_phone}</p>
                                </div>
                            </div>
                            <div className=''>
                                <div>
                                    <p>contact email:</p>
                                    <p>{clientDetails?.data?.client_email}</p>
                                </div>
                                <div>
                                    <p>
                                        Income:
                                    </p>
                                    <p>{clientDetails?.data?.client_income}</p>
                                </div>
                            </div>
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
