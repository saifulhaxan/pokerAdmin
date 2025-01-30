/**
    * @description      : 
    * @author           : Saif
    * @group            : 
    * @created          : 04/11/2024 - 23:01:24
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 04/11/2024
    * - Author          : Saif
    * - Modification    : 
**/
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import BackButton from "../../Components/BackButton";
import CustomModal from "../../Components/CustomModal";
import CustomButton from "../../Components/CustomButton";
import { useGet, usePatch } from "../../Api";
import { male1 } from "../../Assets/images";
import FormatDateTime from "../../Components/DateFormate";

export const UserDetails = () => {

    const { id } = useParams();
    const [data, setData] = useState({});
    const [status, setStatus] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    const [showModal3, setShowModal3] = useState(false);
    const [showModal4, setShowModal4] = useState(false);
    const [historyData, setHistoryData] = useState();
    const [message, setMessage] = useState(false)
    const { ApiData: UseeListingData, loading: UseeListingLoading, error: UseeListingError, get: GetUseeListing } = useGet(`user/getOne/${id}`);
    const { ApiData: StatusUpdateData, loading: StatusUpdateLoading, error: StatusUpdateError, patch: GetStatusUpdate } = usePatch(`user/${id}`);
    const { ApiData: SubscriptionHistoryData, loading: SubscriptionHistoryLoading, error: SubscriptionHistoryError, get: GetSubscriptionHistory } = useGet(`subscription/history/${id}`);

    useEffect(() => {
        if (SubscriptionHistoryData) {
            setHistoryData(SubscriptionHistoryData)
        }

    }, [SubscriptionHistoryData])

    const inActive = () => {
        setShowModal(false)
        setStatus({
            ...status,
            status: false
        })
        setShowModal2(true)

        setTimeout(() => {
            setShowModal2(false)
        }, 1000)
        console.log('status', status)
    }
    const Active = () => {
        setShowModal3(false)
        setStatus({
            ...status,
            status: true
        })
        setShowModal4(true)
        setTimeout(() => {
            setShowModal4(false)
        }, 1000)
        console.log('status', status)
    }

    useEffect(() => {
        if (status) {
            GetStatusUpdate(status);
        }
    }, [status])


    useEffect(() => {
        if (StatusUpdateData) {
            GetUseeListing()
        }
    }, [StatusUpdateData])

    useEffect(() => {
        GetUseeListing()
        GetSubscriptionHistory()
    }, [])


    useEffect(() => {
        if (UseeListingData) {
            setData(UseeListingData)
        }
    }, [UseeListingData])




    return (
        <>
            <DashboardLayout>
                <div className="dashCard mb-4">
                    <div className="row mb-3">
                        <div className="col-12 mb-2">
                            <h2 className="mainTitle">
                                <BackButton />
                                User Details
                            </h2>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-12">
                            <div className="row mb-3 justify-content-end">
                                <div className="col-lg-4 text-end order-1 order-lg-2 mb-3">
                                    <button onClick={() => {
                                        data?.isActive ? setShowModal(true) : setShowModal3(true)
                                    }} className="notButton primaryColor fw-bold text-decoration-underline">Mark as {data?.isActive ? 'Inactive' : 'Active'}</button>
                                    <span className={`statusBadge ${data?.isActive == 1 ? 'statusBadgeActive' : 'statusBadgeInactive'}`}>{data?.isActive == 1 ? 'Active' : 'Inactive'}</span>
                                </div>
                            </div>


                            <div className="row">
                                <div className="col-md-12 mb-4">

                                    <div className="productImages">
                                        <img src={data?.profilePicture ? data?.profilePicture : male1} className="detailPro" />
                                    </div>
                                </div>
                                <div className="col-xl-4 col-md-4 mb-3">
                                    <h4 className="secondaryLabel">User Name</h4>
                                    <p className="secondaryText">{data?.name}</p>
                                </div>
                                <div className="col-xl-4 col-md-4 mb-3">
                                    <h4 className="secondaryLabel">User Email</h4>
                                    <p className="secondaryText">{data?.email}</p>
                                </div>
                                <div className="col-xl-4 col-md-4 mb-3">
                                    <h4 className="secondaryLabel">User Contact</h4>
                                    <p className="secondaryText">{data?.phone}</p>
                                </div>
                                <div className="col-xl-4 col-md-4 mb-3">
                                    <h4 className="secondaryLabel">User DOB</h4>
                                    <p className="secondaryText">{data?.dob}</p>
                                </div>
                                <div className="col-xl-4 col-md-4 mb-3">
                                    <h4 className="secondaryLabel">User Subscription Status</h4>
                                    <p className="secondaryText">{data?.subscribedUser === true ? 'Active' : 'Inactive'}</p>
                                </div>

                                <div className="col-md-12">
                                    <h3 className="mainTitle my-4">Subscription History</h3>
                                    {
                                        historyData?.length > 0 ? (
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th>Start Date</th>
                                                        <th>End Date</th>
                                                        <th>Plan</th>
                                                        <th>Status</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        historyData && historyData?.map((item, index) => (
                                                            <tr key={index}>
                                                                <td><FormatDateTime isoDateString={item?.createdAt}></FormatDateTime></td>
                                                                <td><FormatDateTime isoDateString={item?.endDate}></FormatDateTime></td>
                                                                <td className="text-capitalize">{item?.plan}</td>
                                                                <td className={item?.status == 'PAID' ? 'text-success' : 'text-danger'}>{item?.status}</td>
                                                            </tr>
                                                        ))
                                                    }

                                                </tbody>
                                            </table>
                                        ) : (
                                            <p>No Subscription History</p>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <CustomModal show={showModal} close={() => { setShowModal(false) }} action={inActive} heading='Are you sure you want to mark this user as inactive?' />
                <CustomModal show={showModal2} success heading='Marked as Inactive' />

                <CustomModal show={showModal3} close={() => { setShowModal3(false) }} action={Active} heading='Are you sure you want to mark this user as Active?' />
                <CustomModal show={showModal4} success heading='Marked as Active' />
            </DashboardLayout>
        </>
    );
};

