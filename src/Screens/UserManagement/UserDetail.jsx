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

export const UserDetails = () => {

    const { id } = useParams();
    const [data, setData] = useState({});
    const [status, setStatus] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    const [showModal3, setShowModal3] = useState(false);
    const [showModal4, setShowModal4] = useState(false);
    const [message, setMessage] = useState(false)
    const { ApiData: UseeListingData, loading: UseeListingLoading, error: UseeListingError, get: GetUseeListing } = useGet(`user/getOne/${id}`);
    const { ApiData: StatusUpdateData, loading: StatusUpdateLoading, error: StatusUpdateError, patch: GetStatusUpdate } = usePatch(`user/${id}`);

    const inActive = () => {
        setShowModal(false)
        setStatus({
            ...status,
            status: false
        })
        setShowModal2(true)

        setTimeout(()=>{
            setShowModal2(false)
        },1000)
        console.log('status', status)
    }
    const Active = () => {
        setShowModal3(false)
        setStatus({
            ...status,
            status: true
        })
        setShowModal4(true)
        setTimeout(()=>{
            setShowModal4(false)
        },1000)
        console.log('status', status)
    }

    useEffect(()=>{
        if(status) {
            GetStatusUpdate(status);
        }
    },[status])


    useEffect(()=>{
        if(StatusUpdateData) {
            GetUseeListing()
        }
    },[StatusUpdateData])

    useEffect(() => {
        GetUseeListing()
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
                                {/* <div className="col-md-6 mb-4">

                                    <div className="productImage">
                                        <img src={base_url + data?.image} />
                                    </div>
                                </div> */}
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
                            </div>
                        </div>
                    </div>
                </div>

                <CustomModal show={showModal} close={() => { setShowModal(false) }} action={inActive} heading='Are you sure you want to mark this user as inactive?' />
                <CustomModal show={showModal2}  success heading='Marked as Inactive' />

                <CustomModal show={showModal3} close={() => { setShowModal3(false) }} action={Active} heading='Are you sure you want to mark this user as Active?' />
                <CustomModal show={showModal4}  success heading='Marked as Active' />
            </DashboardLayout>
        </>
    );
};

