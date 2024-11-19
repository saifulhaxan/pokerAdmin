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
import { useGet, usePatch, usePost } from "../../Api";
import { useNavigate, useParams } from "react-router";
export const EditCourse = () => {
    const [unit, setUnit] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        status: true
    });
    const navigate = useNavigate();
    const {id} = useParams();
    const { ApiData: EditCourseData, loading: EditCourseLoading, error: EditCourseError, get: GetEditCourse } = useGet(`courses/${id}`);
    const { ApiData: UpdateCourseData, loading: UpdateCourseLoading, error: UpdateCourseError, patch: GetUpdateCourse } = usePatch(`courses/${id}`);


    // set Data 


    useEffect(()=>{
        if(EditCourseData) {
            setFormData({
                ...formData,
                title: EditCourseData?.title,
                description: EditCourseData?.description,
                status: true
            });
        }
    },[EditCourseData])





    // update data 


    const handleSubmit = (e) => {
        e.preventDefault();
        GetUpdateCourse(formData);
        if (formData?.title && formData?.description) {
        }

      
    };


    useEffect(() => {
        if (UpdateCourseData) {
            setShowModal(true)
            setTimeout(() => {
                setShowModal(false)
            }, 3000)
            navigate('/course-management');
        }
    }, [UpdateCourseData])





    // show data 


    useEffect(()=>{
        GetEditCourse()
    },[])



    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        console.log(formData)
    };







    return (
        <>
            <DashboardLayout>
                <div className="dashCard mb-4">
                    <div className="row mb-3">
                        <div className="col-12 mb-2">
                            <h2 className="mainTitle">
                                <BackButton />
                                Edit Course
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
                                                    label='Edit Course Name'
                                                    required
                                                    id='name'
                                                    type='text'
                                                    placeholder='Enter Course Name'
                                                    labelClass='mainLabel'
                                                    inputClass='mainInput'
                                                    name="title"
                                                    value={formData?.title}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        
                                            <div className="col-md-12 mb-4">
                                                <div className="inputWrapper">
                                                    <div className="form-controls">
                                                        <label htmlFor="">Edit Description</label>
                                                        <textarea
                                                            name="description"
                                                            required
                                                            className="form-control shadow border-0"
                                                            id=""
                                                            cols="30"
                                                            rows="10"
                                                            value={formData?.description}
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

                <CustomModal show={showModal} close={() => { setShowModal(false) }} success heading='Course Update Successfully.' />

            </DashboardLayout>
        </>
    );
};

