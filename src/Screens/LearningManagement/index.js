/**
    * @description      : 
    * @author           : Saif
    * @group            : 
    * @created          : 04/11/2024 - 22:59:59
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 04/11/2024
    * - Author          : Saif
    * - Modification    : 
**/
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV, faEye, faCheck, faTimes, faFilter, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import CustomTable from "../../Components/CustomTable";
import CustomModal from "../../Components/CustomModal";

import CustomPagination from "../../Components/CustomPagination"
import CustomInput from "../../Components/CustomInput";
import CustomButton from "../../Components/CustomButton";


import "./style.css";
import { useDelete, useGet } from "../../Api";
import FormatDateTime from "../../Components/DateFormate";

export const LectureManagement = () => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [showModal4, setShowModal4] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(15);
  const [inputValue, setInputValue] = useState('');
  const [delID, setDelID] = useState('');
  const { ApiData: UseeListingData, loading: UseeListingLoading, error: UseeListingError, get: GetUseeListing } = useGet(`lectures`);
  const { ApiData: TagDeleteData, loading: TagDeleteLoading, error: TagDeleteError, del: GetTagDelete } = useDelete(`lectures/${delID}`);


  const navigate = useNavigate();

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  console.log();

  const hanldeRoute = () => {
    navigate('/add-lecture')
  }

    //delete 

    useEffect(() => {
      if (delID) {
          GetTagDelete()
      }
  }, [delID])


  useEffect(() => {
    if (TagDeleteData) {
        GetUseeListing()
    }
}, [TagDeleteData])

  


  const inActive = () => {
    setShowModal(false)
    setShowModal2(true)
  }
  const ActiveMale = () => {
    setShowModal3(false)
    setShowModal4(true)
  }

  const handleChange = (e) => {
    setInputValue(e.target.value);
  }

  const filterData = data.filter(item =>
    item?.name?.toLowerCase().includes(inputValue.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filterData.slice(indexOfFirstItem, indexOfLastItem);




  useEffect(() => {
    document.title = 'Poker | Module Management';
    GetUseeListing()

  }, []);


  useEffect(() => {
    if (UseeListingData) {
      setData(UseeListingData)
    }
  }, [UseeListingData])

  const maleHeaders = [
    {
      key: "id",
      title: "S.No",
    },
    {
      key: "username",
      title: "Module Name",
    },
    {
      key: "count",
      title: "Category",
    },
    {
      key: "count",
      title: "Tag",
    },
    {
      key: "count",
      title: "Course Name",
    },
    {
      key: "created_at",
      title: "Created On",
    },
    {
      key: "status",
      title: "Status",
    },
    {
      key: "action",
      title: "Action",
    },
  ];


  return (
    <>
      <DashboardLayout>
        <div className="container-fluid">
          <div className="row mb-3">
            <div className="col-12">
              <div className="dashCard">
                <div className="row mb-3 justify-content-between">
                  <div className="col-md-6 mb-2">
                    <h2 className="mainTitle">Module Management</h2>
                  </div>
                  <div className="col-md-6 mb-2">
                    <div className="addUser">
                      <CustomButton text="Add New Module" variant='primaryButton' onClick={hanldeRoute} />
                      <CustomInput type="text" placeholder="Search Here..." value={inputValue} inputClass="mainInput" onChange={handleChange} />
                    </div>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-12">
                    <CustomTable
                      headers={maleHeaders}

                    >
                      <tbody>
                        {currentItems?.map((item, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td className="text-capitalize">
                              {item?.name}
                            </td>
                            <td>{item?.category?.title}</td>
                            <td>{item?.tags[0]?.title}</td>
                            <td>{item?.course?.title}</td>
                            <td><FormatDateTime isoDateString={item?.createdAt}></FormatDateTime></td>
                            <td className={item?.course?.status == true ? 'greenColor' : "redColor"}>{item?.course?.status == true ? 'Active' : "Inactive"}</td>
                            <td>
                              <Dropdown className="tableDropdown">
                                <Dropdown.Toggle variant="transparent" className="notButton classicToggle">
                                  <FontAwesomeIcon icon={faEllipsisV} />
                                </Dropdown.Toggle>
                                <Dropdown.Menu align="end" className="tableDropdownMenu">

                                  <Link to={`/lecture-management/lecture-details/${item?.id}`} className="tableAction"><FontAwesomeIcon icon={faEye} className="tableActionIcon" />View</Link>
                                  <Link to={`/edit-lecture/${item?.id}`} className="tableAction"><FontAwesomeIcon icon={faEdit} className="tableActionIcon" />Edit</Link>
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

          <CustomModal show={showModal} close={() => { setShowModal(false) }} action={inActive} heading='Are you sure you want to mark this user as inactive?' />
          <CustomModal show={showModal2} close={() => { setShowModal2(false) }} success heading='Marked as Inactive' />

          <CustomModal show={showModal3} close={() => { setShowModal3(false) }} action={ActiveMale} heading='Are you sure you want to mark this user as Active?' />
          <CustomModal show={showModal4} close={() => { setShowModal4(false) }} success heading='Marked as Active' />



        </div>
      </DashboardLayout>
    </>
  );
};
