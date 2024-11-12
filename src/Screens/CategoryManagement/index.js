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

export const CategotyManagement = () => {

    const [data, setData] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(8);
    const [inputValue, setInputValue] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [addUser, setUser] = useState(false);
    const [editUser, setEditUser] = useState(false);
    const [userForm, setUserFrom] = useState(false);
    const [idUser, setIdUser] = useState(0);
    const [brands, setBrands] = useState({});
    const editBrandList = [];
    const [formData, setFormData] = useState({});

    const handleChangeSelect = (selected) => {
        setFormData({
            ...formData, brands: selected
        })
    };

    const optionData = [
        {
            name: "Active",
            code: "1"
        },
        {
            name: "Inactive",
            code: "0"
        },
    ]

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };




    const handleChange = (e) => {
        setInputValue(e.target.value);
    }



    const fetchData = () => {
        const LogoutData = localStorage.getItem('login');
        document.querySelector('.loaderBox').classList.remove("d-none");
        fetch('https://custom2.mystagingserver.site/food-stadium/public/api/vendor/zip_code_list',
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
                document.querySelector('.loaderBox').classList.add("d-none");
                console.log(data?.data)
                setData(data?.data);
            })
            .catch((error) => {
                document.querySelector('.loaderBox').classList.add("d-none");
                console.log(error)
            })
    }

    console.log(data)

    const SelectOptions = [];
    useEffect(() => {
        document.title = 'Poker | Category List';

        fetchData()
        // fectchBrandData();



    }, []);

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



    for (const key in brands) {
        if (brands.hasOwnProperty(key)) {
            const item = brands[key];

            // Create an object for each option with 'value' and 'label' properties
            const option = {
                value: item.id, // Assuming 'item.name' represents the option's value
                label: item.name, // Assuming 'item.name' also represents the option's label
            };

            // Push the option object into the SelectOptions array
            SelectOptions.push(option);
        }
    }

    console.log(SelectOptions);

    const handleSubmit = (event) => {
        event.preventDefault();

        console.log(formData)
        document.querySelector('.loaderBox').classList.remove("d-none");
        const LogoutData = localStorage.getItem('login');
        fetch(`https://custom2.mystagingserver.site/food-stadium/public/api/vendor/zip_code_add`,
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${LogoutData}`
                },
                body: JSON.stringify(formData)
            },
        )
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                document.querySelector('.loaderBox').classList.add("d-none");
                setShowModal(true)
                console.log(data)
                setUser(false)
                setFormData({
                    zip_code: ''
                })
                setShowModal(false)
                fetchData()

            })
            .catch((error) => {
                document.querySelector('.loaderBox').classList.add("d-none");
                console.log(error);
            })
    }

    const editUnit = (unitID) => {
        const LogoutData = localStorage.getItem('login');
        fetch(`https://custom.mystagingserver.site/mtrecords/public/api/admin/view-unit/${unitID}`,
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${LogoutData}`
                },
            },
        )
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                console.log(data)
                setIdUser(unitID)
                console.log(idUser);
                data.unit[0].unit_brands.map((item) => {
                    const editData = {
                        value: item.brands.id,
                        label: item.brands.name,
                    };
                    editBrandList.push(editData)
                })
                setFormData({
                    ...formData,
                    name: data.unit[0].name,
                    status: data.status,
                    brands: editBrandList
                });

                setEditUser(true)

            })
            .catch((error) => {
                console.log(error);
            })
    }

    const handleEditSubmit = (event) => {
        event.preventDefault();
        console.log(formData)

        const LogoutData = localStorage.getItem('login');
        fetch(`https://custom.mystagingserver.site/mtrecords/public/api/admin/unit-add-edit/${idUser}`,
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${LogoutData}`
                },
                body: JSON.stringify(formData)
            },
        )
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                console.log(data)
                setFormData({
                    name: ''
                })
                fetchData()
                setEditUser(false)


            })
            .catch((error) => {
                document.querySelector('.loaderBox').classList.add("d-none");
                console.log(error);
            })
    }





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
                                            <CustomButton text="Add Category" variant='primaryButton' onClick={() => {
                                                setUser(true)
                                            }} />

                                        </div>
                                    </div>
                                </div>
                                <div className="row mb-3">

                                    <div className="col-12">
                                        <CustomTable
                                            headers={maleHeaders}

                                        >
                                            <tbody>
                                                {/* {data && Object.values(data).map((value, index) => (
                                                    <tr>
                                                        <td>{index + 1}</td>
                                                        <td>{value}</td>
                                                    </tr>
                                                ))} */}
                                                <tr>
                                                    <td>01</td>
                                                    <td>Poker Game</td>
                                                    <td className="text-success">Active</td>
                                                    <td>    
                                                        <Dropdown className="tableDropdown">
                                                            <Dropdown.Toggle variant="transparent" className="notButton classicToggle">
                                                                <FontAwesomeIcon icon={faEllipsisV} />
                                                            </Dropdown.Toggle>
                                                            <Dropdown.Menu align="end" className="tableDropdownMenu">
                                                                <button className="tableAction" onClick={() => {
                                                                    setEditUser(true)
                                                                }}><FontAwesomeIcon icon={faEdit} className="tableActionIcon" />Edit</button>
                                                                <button className="tableAction"><FontAwesomeIcon icon={faTrash} className="tableActionIcon" />Delete</button>
                                                            </Dropdown.Menu>
                                                        </Dropdown>
                                                    </td>
                                                </tr>

                                            </tbody>
                                        </CustomTable>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* add unit  */}

                    <CustomModal show={addUser} close={() => { setUser(false) }} >
                        <CustomInput
                            label="Add Category"
                            type="number"
                            placeholder="Add Category"
                            required
                            name="zip_code"
                            labelClass='mainLabel'
                            inputClass='mainInput'
                            value={formData.category_name}
                            onChange={(event) => {
                                setFormData({ ...formData, category_name: event.target.value });
                                console.log(formData);
                            }}


                        />

                        <CustomButton variant='primaryButton' text='Add' type='button' onClick={handleSubmit} />
                    </CustomModal>

                    <CustomModal show={editUser} close={() => { setEditUser(false) }} >
                        <CustomInput
                            label="Edit Category"
                            type="number"
                            placeholder="Edit Category"
                            required
                            name="zip_code"
                            labelClass='mainLabel'
                            inputClass='mainInput'
                            value={formData.category_name}
                            onChange={(event) => {
                                setFormData({ ...formData, category_name: event.target.value });
                                console.log(formData);
                            }}


                        />
                        <CustomButton variant='primaryButton' text='Update' type='button' onClick={handleEditSubmit} />
                    </CustomModal>


                    <CustomModal show={showModal} close={() => { setShowModal(false) }} success heading='Category Added Successfully.' />

                </div>
            </DashboardLayout>
        </>
    );
};
