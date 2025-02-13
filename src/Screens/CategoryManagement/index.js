import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV, faPencil, faCheck, faTimes, faFilter, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import CustomTable from "../../Components/CustomTable";
import CustomModal from "../../Components/CustomModal";

import CustomPagination from "../../Components/CustomPagination"
import CustomInput from "../../Components/CustomInput";
import CustomButton from "../../Components/CustomButton";
import { SelectBox } from "../../Components/CustomSelect";
import Select from 'react-select'
import { useDelete, useGet, usePatch, usePost } from "../../Api";

export const CategotyManagement = () => {

    const [data, setData] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(8);
    const [inputValue, setInputValue] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [showModal1, setShowModal1] = useState(false);
    const [addUser, setUser] = useState(false);
    const [editUser, setEditUser] = useState(false);
    const [userForm, setUserFrom] = useState(false);
    const [idUser, setIdUser] = useState(0);
    const [brands, setBrands] = useState({});
    const editBrandList = [];
    const [formData, setFormData] = useState({});
    const [catID, setCatID] = useState('');
    const [delID, setDelID] = useState('');
    const [courses, setCourses] = useState([]);
    const { ApiData: CategoryData, loading: CategoryLoading, error: CategoryError, get: GetCategory } = useGet(`category`);
    const { ApiData: AddNewCategoryData, loading: AddNewCategoryLoading, error: AddNewCategoryError, post: GetAddNewCategory } = usePost(`category`);
    const { ApiData: EditCategoryData, loading: EditCategoryLoading, error: EditCategoryError, get: GetEditCategory } = useGet(`category/${catID ? catID : ''}`);
    const { ApiData: TagUpdateData, loading: TagUpdateLoading, error: TagUpdateError, patch: GetTagUpdate } = usePatch(`category/${catID}`);
    const { ApiData: TagDeleteData, loading: TagDeleteLoading, error: TagDeleteError, del: GetTagDelete } = useDelete(`category/${delID}`);
    const { ApiData: CourseData, get: GetCourse } = useGet(`courses`);


    useEffect(() => {
        if (CourseData) setCourses(CourseData);
    }, [CourseData]);

    // list category 

    const maleHeaders = [
        {
            key: "id",
            title: "S.No",
        },
        {
            key: "CategoryName",
            title: "Category Name",
        },
        {
            key: "status",
            title: "Status",
        },
        {
            key: "action",
            title: "Action",
        }

    ];


    useEffect(() => {
        if (CategoryData) {
            setData(CategoryData)
        }
    }, [CategoryData])


    useEffect(() => {
        document.title = 'Poker | Category Management';
        GetCategory()
        GetCourse()
    }, []);


    // add category


    const handleAddForm = () => {
        setFormData('');
        setUser(true)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        GetAddNewCategory(formData);
        if (formData?.title && formData?.status) {
        }

    }

    useEffect(() => {
        if (AddNewCategoryData) {
            setUser(false);
            setShowModal(true)
            setTimeout(() => {
                setShowModal(false)
            }, 3000)
            GetCategory()
        }
    }, [AddNewCategoryData])


    // edit categoty 


    const optionData = [
        {
            name: "Active",
            id: true
        },
        {
            name: "Inactive",
            id: false
        },
    ]

    const handleChange = (e) => {
        const { name, value } = e.target;
        

        setFormData((prevData) => ({
            ...prevData,
            [name]: name == 'courseId' ? parseInt(value) : value,
        }));

        console.log(formData)
    }


    const openEditBox = (catID) => {
        setCatID(catID);

    }

    useEffect(() => {
        if (catID) {
            GetEditCategory()
        }
    }, [catID])


    useEffect(() => {
        if (EditCategoryData) {
            setFormData({
                ...formData,
                title: EditCategoryData?.title,
                status: EditCategoryData?.status
            })

            console.log('dataEdit', formData)
            setEditUser(true)
        }
    }, [EditCategoryData])



    // update

    const handleEditSubmit = (event) => {
        event.preventDefault();
        GetTagUpdate(formData);

    }



    useEffect(() => {
        if (TagUpdateData) {
            setEditUser(false);
            setShowModal1(true);
            setTimeout(() => {
                setShowModal1(false)
            }, 1000)

            GetCategory()
        }
    }, [TagUpdateData])


    //delete 

    useEffect(() => {
        if (delID) {
            GetTagDelete()
            GetCategory()
        }
    }, [delID])



    // pagination data 

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const filterData = data?.filter(item =>
        item?.title.toLowerCase().includes(inputValue.toLowerCase())
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filterData?.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <>
            <DashboardLayout>
                <div className="container-fluid">
                    <div className="row mb-3">
                        <div className="col-12">
                            <div className="dashCard">
                                <div className="row mb-3 justify-content-between">
                                    <div className="col-md-6 mb-2">
                                        <h2 className="mainTitle">Category Management</h2>
                                    </div>
                                    <div className="col-md-6 mb-2 d-flex justify-content-end">
                                        <div className="addUser">
                                            <CustomButton text="Add Category" variant='primaryButton' onClick={handleAddForm} />

                                        </div>
                                    </div>
                                </div>
                                <div className="row mb-3">

                                    <div className="col-12">
                                        <CustomTable
                                            headers={maleHeaders}

                                        >
                                            <tbody>
                                                {currentItems && currentItems.map((item, index) => (
                                                    <tr>
                                                        <td>{index + 1}</td>
                                                        <td>{item?.title}</td>
                                                        <td className={`${item?.status === true ? 'text-success' : 'text-danger'}`}>{item?.status === true ? 'Active' : 'Inactive'}</td>
                                                        <td>
                                                            <Dropdown className="tableDropdown">
                                                                <Dropdown.Toggle variant="transparent" className="notButton classicToggle">
                                                                    <FontAwesomeIcon icon={faEllipsisV} />
                                                                </Dropdown.Toggle>
                                                                <Dropdown.Menu align="end" className="tableDropdownMenu">
                                                                    <button className="tableAction" onClick={() => { openEditBox(item?.id) }}><FontAwesomeIcon icon={faEdit} className="tableActionIcon" />Edit</button>
                                                                    <button className="tableAction" onClick={() => { setDelID(item?.id) }}><FontAwesomeIcon icon={faTrash} className="tableActionIcon" />Delete</button>
                                                                </Dropdown.Menu>
                                                            </Dropdown>
                                                        </td>
                                                    </tr>
                                                ))}


                                            </tbody>
                                        </CustomTable>
                                        <CustomPagination
                                            itemsPerPage={itemsPerPage}
                                            totalItems={data?.length}
                                            currentPage={currentPage}
                                            onPageChange={handlePageChange}
                                        />

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* add unit  */}

                    <CustomModal show={addUser} close={() => { setUser(false) }} handleSubmit={handleSubmit}>


                        <SelectBox
                            selectClass="mainInput"
                            name="courseId"
                            label="Select Course"
                            placeholder="Select Course"
                            required
                            value={formData?.courseId || ""}
                            option={courses}
                            onChange={handleChange}
                        />


                        <CustomInput
                            label="Add Category"
                            type="text"
                            placeholder="Add Category"
                            required
                            name="title"
                            labelClass='mainLabel'
                            inputClass='mainInput'
                            value={formData.title}
                            onChange={handleChange}


                        />

                        <SelectBox
                            label="Select Status"
                            required
                            name="status"
                            option={optionData}
                            selectClass="mainInput"
                            onChange={handleChange}
                        />

                        <CustomButton variant='primaryButton' text='Add' type='submit' />
                    </CustomModal>

                    <CustomModal show={editUser} close={() => { setEditUser(false) }} >

                        <SelectBox
                            selectClass="mainInput"
                            name="courseId"
                            label="Edit Course"
                            placeholder="Select Course"
                            required
                            value={formData?.courseId || ""}
                            option={courses}
                            onChange={handleChange}
                        />


                        <CustomInput
                            label="Edit Category"
                            type="text"
                            placeholder="Edit Category"
                            required
                            name="title"
                            labelClass='mainLabel'
                            inputClass='mainInput'
                            value={formData?.title}
                            onChange={handleChange}


                        />

                        <SelectBox
                            label="Select Status"
                            required
                            name="status"
                            value={formData?.status}
                            option={optionData}
                            selectClass="mainInput"
                            onChange={handleChange}
                        />
                        <CustomButton variant='primaryButton' text='Update' type='button' onClick={handleEditSubmit} />
                    </CustomModal>


                    <CustomModal show={showModal} close={() => { setShowModal(false) }} success heading='Category Added Successfully.' />
                    <CustomModal show={showModal1} close={() => { setShowModal1(false) }} success heading='Category Update Successfully.' />

                </div>
            </DashboardLayout>
        </>
    );
};
