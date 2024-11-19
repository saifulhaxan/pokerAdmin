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

export const TagManagement = () => {

    const [data, setData] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(8);
    const [inputValue, setInputValue] = useState('');
    const [showModal1, setShowModal1] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [addUser, setUser] = useState(false);
    const [editUser, setEditUser] = useState(false);
    const [userForm, setUserFrom] = useState(false);
    const [idUser, setIdUser] = useState(0);
    const [brands, setBrands] = useState({});
    const editBrandList = [];
    const [formData, setFormData] = useState({});
    const [catID, setCatID] = useState('');
    const [delID, setDelID] = useState('');
    const { ApiData: tagData, loading: tagLoading, error: tagError, get: Gettag } = useGet(`tags`);
    const { ApiData: AddNewtagData, loading: AddNewtagLoading, error: AddNewtagError, post: GetAddNewtag } = usePost(`tags`);
    const { ApiData: EdittagData, loading: EdittagLoading, error: EdittagError, get: GetEdittag } = useGet(`tags/${catID ? catID : ''}`);
    const { ApiData: TagUpdateData, loading: TagUpdateLoading, error: TagUpdateError, patch: GetTagUpdate } = usePatch(`tags/${catID}`);
    const { ApiData: TagDeleteData, loading: TagDeleteLoading, error: TagDeleteError, del: GetTagDelete } = useDelete(`tags/${delID}`);


  

    // list tag 

    const maleHeaders = [
        {
            key: "id",
            title: "S.No",
        },
        {
            key: "tagName",
            title: "Tag Name",
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
        if (tagData) {
            setData(tagData)
        }
    }, [tagData])


    useEffect(() => {
        document.title = 'Poker | Tag Management';
        Gettag()
    }, []);


    // add tag


    const handleAddForm = () => {
        setFormData('');
        setUser(true)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        GetAddNewtag(formData);
        if (formData?.title && formData?.status) {
        }

    }

    useEffect(() => {
        if (AddNewtagData) {
            setUser(false);
            setShowModal(true)
            setTimeout(() => {
                setShowModal(false)
            }, 3000)
            Gettag()
        }
    }, [AddNewtagData])


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
            [name]: value,
        }));

        console.log(formData)
    }


    const openEditBox = (catID) => {
        setCatID(catID);

    }

    useEffect(() => {
        if (catID) {
            GetEdittag()
        }
    }, [catID])


    useEffect(() => {
        if (EdittagData) {
            setFormData({
                ...formData,
                title: EdittagData?.title,
                status: EdittagData?.status
            })

            console.log('dataEdit', formData)
            setEditUser(true)
        }
    }, [EdittagData])



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

            Gettag()
        }
    }, [TagUpdateData])


    //delete 

    useEffect(() => {
        if (delID) {
            GetTagDelete()
            Gettag()
        }
    }, [delID])

    useEffect(()=>{
        if(TagDeleteData) {
            GetEdittag()
        }
    },[TagDeleteData])




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
                                        <h2 className="mainTitle">Tag Management</h2>
                                    </div>
                                    <div className="col-md-6 mb-2 d-flex justify-content-end">
                                        <div className="addUser">
                                            <CustomButton text="Add tag" variant='primaryButton' onClick={handleAddForm} />

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
                        <CustomInput
                            label="Add tag"
                            type="text"
                            placeholder="Add tag"
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
                        <CustomInput
                            label="Edit tag"
                            type="text"
                            placeholder="Edit tag"
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


                    <CustomModal show={showModal} close={() => { setShowModal(false) }} success heading='Tag Added Successfully.' />
                    <CustomModal show={showModal1} close={() => { setShowModal1(false) }} success heading='Tag Update Successfully.' />

                </div>
            </DashboardLayout>
        </>
    );
};
