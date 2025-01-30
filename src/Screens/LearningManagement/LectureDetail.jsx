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

export const LectureDetails = () => {

    const { id } = useParams();
    const [data, setData] = useState({});
    const [status, setStatus] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    const [showModal3, setShowModal3] = useState(false);
    const [showModal4, setShowModal4] = useState(false);
    const [message, setMessage] = useState(false)
    const { ApiData: UseeListingData, loading: UseeListingLoading, error: UseeListingError, get: GetUseeListing } = useGet(`lectures/${id}`);
    const { ApiData: StatusUpdateData, loading: StatusUpdateLoading, error: StatusUpdateError, patch: GetStatusUpdate } = usePatch(`courses/${id}`);

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
                                Module Details
                            </h2>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-12">
                            {/* <div className="row mb-3 justify-content-end">
                                <div className="col-lg-4 text-end order-1 order-lg-2 mb-3">
                                    <button onClick={() => {
                                        data?.status ? setShowModal(true) : setShowModal3(true)
                                    }} className="notButton primaryColor fw-bold text-decoration-underline">Mark as {data?.status ? 'Inactive' : 'Active'}</button>
                                    <span className={`statusBadge ${data?.status == 1 ? 'statusBadgeActive' : 'statusBadgeInactive'}`}>{data?.status == 1 ? 'Active' : 'Inactive'}</span>
                                </div>
                            </div> */}


                            <div className="row align-items-center">
                                <div className="col-md-5">
                                    <video width="100%" className="h-550" controls src={data?.videoUpload}></video>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <div className="row">
                                        <div className="col-md-12 mb-3">
                                            <h4 className="secondaryText">Lecture Title</h4>
                                            <p className="">{data?.name}</p>
                                        </div>
                                        <div className="col-md-12 mb-3">
                                            <h4 className="secondaryText">Course Name</h4>
                                            <p className="">{data?.course?.title}</p>
                                        </div>
                                        <div className="col-md-12 mb-3">
                                            <h4 className="secondaryText">Category</h4>
                                            <p className="">{data?.category?.title}</p>
                                        </div>
                                        <div className="col-md-12 mb-3">
                                            <h4 className="secondaryText">Tag</h4>
                                            {data?.tags?.map((item) => (
                                                <p className="">{item?.title}</p>
                                            ))}

                                        </div>
                                    </div>
                                </div>




                                <div className="col-xl-12 col-md-12 my-5">
                                    <h4 className="secondaryText">Course Description</h4>
                                    <p className="">{data?.description}</p>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                <CustomModal show={showModal} close={() => { setShowModal(false) }} action={inActive} heading='Are you sure you want to mark this course as inactive?' />
                <CustomModal show={showModal2} success heading='Marked as Inactive' />

                <CustomModal show={showModal3} close={() => { setShowModal3(false) }} action={Active} heading='Are you sure you want to mark this course as Active?' />
                <CustomModal show={showModal4} success heading='Marked as Active' />
            </DashboardLayout>
        </>
    );
};

