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
import { useGet } from "../../Api";

export const NotificationDetail = () => {

    const { id } = useParams();
    const [data, setData] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    const [showModal3, setShowModal3] = useState(false);
    const [showModal4, setShowModal4] = useState(false);
    const [message, setMessage] = useState(false)
    const { ApiData: UseeListingData, loading: UseeListingLoading, error: UseeListingError, get: GetUseeListing } = useGet(`notifications/${id}`);

    const inActive = () => {
        setShowModal(false)
        setShowModal2(true)
    }
    const Active = () => {
        setShowModal3(false)
        setShowModal4(true)
    }

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
                        <div className="col-md-8 mb-2">
                            <h2 className="mainTitle">
                                <BackButton />
                                Notification Detail
                            </h2>
                        </div>

                    </div>
                    <div className="row mb-3">
                        <div className="col-12">
                            <div className="row">
                                {
                                    data?.isForAllUsers != true ? (
                                        <div className="col-xl-6 col-md-6 mb-3">
                                            <h4 className="secondaryLabel">User Name</h4>
                                            {
                                                data?.users?.map((item, index) => (
                                                    <p className="secondaryText" key={index}>{item?.name}</p>
                                                ))
                                            }

                                        </div>
                                    ) : (
                                        <div className="col-xl-6 col-md-6 mb-3">
                                            <h4 className="secondaryLabel">User Name</h4>
                                            <p className="secondaryText" >All Users </p>

                                        </div>
                                    )
                                }


                                <div className="col-xl-6 col-md-6 mb-3">
                                    <h4 className="secondaryLabel">Title</h4>
                                    <p className="secondaryText">{data?.title}</p>
                                </div>
                                <div className="col-xl-12 col-md-12 mb-3">
                                    <h4 className="secondaryLabel">Message</h4>
                                    <p className="secondaryText">{data?.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <CustomModal show={showModal} close={() => { setShowModal(false) }} action={inActive} heading='Are you sure you want to mark this user as inactive?' />
                <CustomModal show={showModal2} close={() => { setShowModal2(false) }} success heading='Marked as Inactive' />

                <CustomModal show={showModal3} close={() => { setShowModal3(false) }} action={Active} heading='Are you sure you want to mark this user as Active?' />
                <CustomModal show={showModal4} close={() => { setShowModal4(false) }} success heading='Marked as Active' />
            </DashboardLayout>
        </>
    );
};

