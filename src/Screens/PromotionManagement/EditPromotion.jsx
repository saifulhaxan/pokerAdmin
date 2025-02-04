/**
    * @description      : 
    * @author           : Saif
    * @group            : 
    * @created          : 04/11/2024 - 23:01:33
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 04/11/2024
    * - Author          : Saif
    * - Modification    : 
**/
import { useState, useEffect } from "react";
import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import BackButton from "../../Components/BackButton";
import CustomModal from "../../Components/CustomModal";
import CustomInput from '../../Components/CustomInput';
import { SelectBox } from "../../Components/CustomSelect";
import CustomButton from "../../Components/CustomButton";
import { CategoryList, DietaryList, MenuList } from "../../Components/CategoryList";
import { useGet, usePatch, usePatchForm, usePost, usePostForm } from "../../Api";
import { useNavigate, useParams } from "react-router";
import ImageUpload from "../../Components/ImageUpload";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export const EditPromotion = () => {
    const [unit, setUnit] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({});
    const navigate = useNavigate();
    const { id } = useParams();
    const { ApiData: EditCourseData, loading: EditCourseLoading, error: EditCourseError, get: GetEditCourse } = useGet(`promotion/${id}`);
    const { ApiData: UpdateCourseData, loading: UpdateCourseLoading, error: UpdateCourseError, patch: GetUpdateCourse } = usePatch(`promotion/${id}`);



    useEffect(() => {
        if (EditCourseData) {
            setFormData({
                ...formData,
                title: EditCourseData?.title,
                description: EditCourseData?.description,
                image: EditCourseData?.image
            });
        }
    }, [EditCourseData])


    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        console.log(formData)
    };



    const handleSubmit = (e) => {
        e.preventDefault();
        GetUpdateCourse(formData);


    };


    useEffect(() => {
        GetEditCourse()
    }, [])


    useEffect(() => {
        if (UpdateCourseData) {
            setShowModal(true)
            setTimeout(() => {
                setShowModal(false)
            }, 3000)
            navigate('/promotion-management');
        }
    }, [UpdateCourseData])


    const filehandleChange = (event) => {
        const file =
            event.target.files[0];
        // console.log(file.name)
        if (file) {
            const fileName = file;
            setFormData((prevData) => ({
                ...prevData,
                image: fileName,
            }));
        }
        console.log(formData)
    };

    const handleImageUpload = (response) => {
        console.log('Image upload response:', response);
        setFormData({
            ...formData,
            image: response?.imageUrl
        })
    };

    const removeImage = () => {
        setFormData({
            ...formData,
            image: ''
        })
    }

    const discountList = [
        {
            code: '10%',
            name: '10%'
        },
        {
            code: '20%',
            name: '20%'
        },
        {
            code: '30%',
            name: '30%'
        },
        {
            code: '40%',
            name: '40%'
        },
        {
            code: '50%',
            name: '50%'
        }
    ]


    return (
        <>
            <DashboardLayout>
                <div className="dashCard mb-4">
                    <div className="row mb-3">
                        <div className="col-12 mb-2">
                            <h2 className="mainTitle">
                                <BackButton />
                                Edit Promotion
                            </h2>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-12">
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="row">
                                            <div className="col-md-6 mb-4">
                                                <CustomInput
                                                    label='Edit Promotion Name'
                                                    required
                                                    id='name'
                                                    type='text'
                                                    placeholder='Enter Promotion Name'
                                                    labelClass='mainLabel'
                                                    inputClass='mainInput'
                                                    name="title"
                                                    value={formData.title}
                                                    onChange={handleChange}
                                                />
                                            </div>

                                            <div className="col-md-6 mb-4">
                                                <SelectBox
                                                    selectClass="mainInput"
                                                    name="discount"
                                                    label="Select Discount"
                                                    value={formData?.discount}
                                                    placeholder="Select Discount"
                                                    option={discountList}
                                                    onChange={handleChange}
                                                />
                                            </div>

                                            <div className="col-md-6 mb-4">
                                                <ImageUpload onUpload={handleImageUpload} title="Upload Promotion Image" maxWidth={1600} maxHeight={400} />
                                                {
                                                    formData?.image ? (
                                                        <div className="imageUploadBanner">
                                                            <img src={formData?.image} alt="User" />
                                                            <button type="button" onClick={removeImage}><FontAwesomeIcon icon={faClose}></FontAwesomeIcon></button>
                                                        </div>

                                                    ) : ''
                                                }
                                            </div>


                                             <div className="col-md-6 mb-4">
                                                <CustomInput
                                                    label='Start Date'
                                                    required
                                                    id='name'
                                                    type='date'
                                                    // placeholder='Enter Promotion Name'
                                                    labelClass='mainLabel'
                                                    inputClass='mainInput'
                                                    name="startDate"
                                                    value={formData?.startData}
                                                    onChange={handleChange}
                                                />
                                            </div>

                                            <div className="col-md-6 mb-4">
                                                <CustomInput
                                                    label='End Date'
                                                    required
                                                    id='name'
                                                    type='date'
                                                    // placeholder='Enter Promotion Name'
                                                    labelClass='mainLabel'
                                                    inputClass='mainInput'
                                                    name="endDate"
                                                    value={formData?.endDate}
                                                    onChange={handleChange}
                                                />
                                            </div>

                                            <div className="col-md-12 mb-4">
                                                <div className="inputWrapper">
                                                    <div className="form-controls">
                                                        <label htmlFor="">Edit Description</label>
                                                        <textarea
                                                            name="description"
                                                            className="form-control shadow border-0"
                                                            id=""
                                                            cols="30"
                                                            rows="10"
                                                            value={formData.description}
                                                            onChange={handleChange}
                                                        >
                                                        </textarea>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <CustomButton variant='primaryButton' text='Update' type='submit' />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <CustomModal show={showModal} close={() => { setShowModal(false) }} success heading='Promotion Update Successfully.' />

            </DashboardLayout>
        </>
    );
};

