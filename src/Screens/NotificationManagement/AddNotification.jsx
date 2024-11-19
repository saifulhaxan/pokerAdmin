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
import { useGet, usePost } from "../../Api";
import { useNavigate } from "react-router";
export const AddNotification = () => {
    const [unit, setUnit] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        userIds: [] // Initialize image as an empty string
    });

    const navigate = useNavigate()

    const categories = CategoryList();
    const dietary = DietaryList();
    const Menu = MenuList();
    const [users, setUser] = useState();
    const { ApiData: UseeListingData, loading: UseeListingLoading, error: UseeListingError, get: GetUseeListing } = useGet(`user/getAll`);
    const { ApiData: AddNewtagData, loading: AddNewtagLoading, error: AddNewtagError, post: GetAddNewtag } = usePost(`notifications/send-to-specific`);


    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData?.title && formData?.description) {
            GetAddNewtag(formData);
        }

    }

    useEffect(() => {
        if (AddNewtagData) {
            setUser(false);
            setShowModal(true)
            setTimeout(() => {
                setShowModal(false)
            }, 3000)
            GetUseeListing()
            navigate('/notification-management')
        }
    }, [AddNewtagData])



    useEffect(() => {
        GetUseeListing()
    }, [])

    useEffect(() => {
        if (UseeListingData) {
            setUser(UseeListingData)
        }
    }, [UseeListingData])


    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: name === "userIds" ? [value] : value, // If "userIds", set as array; otherwise, set as value
        }));
        console.log(formData)


    };


    const [hideBox, setHideBox] = useState(true);
    const handleCheck = (e) => {
        const { name, value, checked } = e.target;
        setHideBox(!checked)
        if (!checked) {
            setFormData({
                ...formData,
                userIds: ['']
            })
        }
        setFormData((prevData) => ({
            ...prevData,
            [name]: checked,
        }));
    }


    return (
        <>
            <DashboardLayout>
                <div className="dashCard mb-4">
                    <div className="row mb-3">
                        <div className="col-12 mb-2">
                            <h2 className="mainTitle">
                                <BackButton />
                                Add Notification
                            </h2>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-12">
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="row align-items-center">
                                            <div className="col-md-5 mb-4">
                                                <CustomInput
                                                    label='Add Title'
                                                    required
                                                    id='name'
                                                    type='text'
                                                    placeholder='Enter Title'
                                                    labelClass='mainLabel'
                                                    inputClass='mainInput'
                                                    name="title"
                                                    value={formData.title}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="col-md-2 mb-4">
                                                <div class="form-group form-check">
                                                    <input type="checkbox" class="form-check-input" name="isForAllUsers" onChange={handleCheck} id="user" />
                                                    <label class="form-check-label" for="user">Select all user</label>
                                                </div>
                                            </div>

                                            {
                                                hideBox && (
                                                    <div className="col-md-5 mb-4">
                                                        <SelectBox
                                                            selectClass="mainInput"
                                                            name="userIds"
                                                            label="Select User"
                                                            placeholder="Select User"
                                                            required
                                                            value={formData.user}
                                                            option={users}
                                                            onChange={handleChange}
                                                        />

                                                    </div>
                                                )
                                            }
                                            <div className="col-md-12 mb-4">
                                                <div className="inputWrapper">
                                                    <div className="form-controls">
                                                        <label htmlFor="">Description</label>
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
                                                <CustomButton variant='primaryButton' text='Submit' type='submit' />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <CustomModal show={showModal} close={() => { setShowModal(false) }} success heading='Notification Send Successfully.' />

            </DashboardLayout>
        </>
    );
};

