/**
    * @description      : 
    * @author           : Saif
    * @group            : 
    * @created          : 04/11/2024 - 23:00:34
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 04/11/2024
    * - Author          : Saif
    * - Modification    : 
**/
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import BackButton from "../../Components/BackButton";
import CustomModal from "../../Components/CustomModal";
import CustomInput from '../../Components/CustomInput';
import { SelectBox } from "../../Components/CustomSelect";
import CustomButton from "../../Components/CustomButton";
export const EditUser = () => {
    const { id } = useParams();
    const [categories, setCategories] = useState({});
    const [unit, setUnit] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        image: '', // Initialize image as an empty string
    });


    const fetchCatories = () => {
        const LogoutData = localStorage.getItem('login');
        document.querySelector('.loaderBox').classList.remove("d-none");
        fetch(`https://custom.mystagingserver.site/Tim-WDLLC/public/api/admin/category_listing`,
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${LogoutData}`
                },
            }
        )

            .then(response =>
                response.json()
            )
            .then((data) => {
                console.log(data)
                document.querySelector('.loaderBox').classList.add("d-none");
                setCategories(data.data);
            })
            .catch((error) => {
                document.querySelector('.loaderBox').classList.add("d-none");
                console.log(error)
            })
    }


    const fetechBookData = () => {
        const LogoutData = localStorage.getItem('login');
        document.querySelector('.loaderBox').classList.remove("d-none");
        fetch(`https://custom.mystagingserver.site/Tim-WDLLC/public/api/admin/book_view/${id}`,
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${LogoutData}`
                },
            }
        )

            .then(response =>
                response.json()
            )
            .then((data) => {
                console.log(data)
                document.querySelector('.loaderBox').classList.add("d-none");
                setFormData(data.data);  
            })
            .catch((error) => {
                document.querySelector('.loaderBox').classList.add("d-none");
                console.log(error)
            })
    }
    useEffect(() => {
        fetchCatories()
        fetechBookData()
    }, [])

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        console.log(formData)
    };

    const filehandleChange = (event) => {
        const file = event.target.files[0];
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
      



        const LogoutData = localStorage.getItem('login');


        const handleSubmit = (event) => {
            event.preventDefault();

            // Create a new FormData object
            const formDataMethod = new FormData();
            for (const key in formData) {
                formDataMethod.append(key, formData[key]);
            }

            console.log(formData)
            document.querySelector('.loaderBox').classList.remove("d-none");
            // Make the fetch request
            fetch(`https://custom.mystagingserver.site/Tim-WDLLC/public/api/admin/book_add_update/${id}`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${LogoutData}`
                },
                body: formDataMethod // Use the FormData object as the request body
            })
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    document.querySelector('.loaderBox').classList.add("d-none");
                    console.log(data);
                    setShowModal(true)
                })
                .catch((error) => {
                    document.querySelector('.loaderBox').classList.add("d-none");
                    console.log(error)
                })
        };




        return (
            <>
                <DashboardLayout>
                    <div className="dashCard mb-4">
                        <div className="row mb-3">
                            <div className="col-12 mb-2">
                                <h2 className="mainTitle">
                                    <BackButton />
                                    Edit Book
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
                                                        label='Add Book Title'
                                                        required
                                                        id='name'
                                                        type='text'
                                                        placeholder='Enter Book Title'
                                                        labelClass='mainLabel'
                                                        inputClass='mainInput'
                                                        name="name"
                                                        value={formData.name}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                                <div className="col-md-6 mb-4">
                                                    <CustomInput
                                                        label='Enter price'
                                                        required
                                                        id='price'
                                                        type='number'
                                                        placeholder='Enter price'
                                                        labelClass='mainLabel'
                                                        inputClass='mainInput'
                                                        name="price"
                                                        value={formData.price}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                                <div className="col-md-6 mb-4">
                                                    <SelectBox
                                                        selectClass="mainInput"
                                                        name="category_id"
                                                        label="Select Category"
                                                        required
                                                        value={formData.category_id}
                                                        option={categories}
                                                        onChange={handleChange}
                                                    />

                                                </div>
                                                <div className="col-md-6 mb-4">
                                                    <CustomInput
                                                        label='Upload Product Image'
                                                        required
                                                        id='file'
                                                        type='file'
                                                        labelClass='mainLabel'
                                                        inputClass='mainInput'
                                                        name="image"
                                                        // value={formData.image}
                                                        onChange={filehandleChange}
                                                    />
                                                </div>
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

                    <CustomModal show={showModal} close={() => { setShowModal(false) }} success heading='Book Update Successfully.' />

                </DashboardLayout>
            </>
        );
    };

