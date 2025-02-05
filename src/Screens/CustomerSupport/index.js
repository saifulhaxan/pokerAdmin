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
import { faEllipsisV, faEye, faCheck, faTimes, faFilter, faEdit } from "@fortawesome/free-solid-svg-icons";

import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import CustomTable from "../../Components/CustomTable";
import CustomModal from "../../Components/CustomModal";

import CustomPagination from "../../Components/CustomPagination"
import CustomInput from "../../Components/CustomInput";
import CustomButton from "../../Components/CustomButton";


import "./style.css";
import { useGet, usePatch } from "../../Api";
import FormatDateTime from "../../Components/DateFormate";
import { base_url } from "../../Api/apiConfig";

export const CustomerSupport = () => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [showModal4, setShowModal4] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(15);
  const [inputValue, setInputValue] = useState('');
  const [listID, setListID] = useState(null);
  const [status, setStatus] = useState('');
  const { ApiData: CustomerSupportData, loading: CustomerSupportLoading, error: CustomerSupportError, get: GetCustomerSupport } = useGet(`customer-support`)
  const { ApiData: StatusChangeData, loading: StatusChangeLoading, error: StatusChangeError, patch: GetStatusChange } = usePatch(`customer-support/change-status/${listID}?status=${status}`)

  const navigate = useNavigate();

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  console.log();

  const hanldeRoute = () => {
    navigate('/add-message')
  }


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

  const [statusFilter, setStatusFilter] = useState("ALL");
  const filterData = data.filter(ticket =>
    (statusFilter === "ALL" || ticket.status === statusFilter) &&
    (inputValue === "" || ticket.name.toLowerCase().includes(inputValue.toLowerCase()))
  );


  // const filterData = data.filter(item =>
  //   item?.name?.toLowerCase().includes(inputValue.toLowerCase())
  // );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filterData.slice(indexOfFirstItem, indexOfLastItem);




  useEffect(() => {
    document.title = 'Poker | Customer Management';
    GetCustomerSupport()

  }, []);


  useEffect(() => {
    if (CustomerSupportData) {
      setData(CustomerSupportData)
    }
  }, [CustomerSupportData]);






  const maleHeaders = [
    {
      key: "id",
      title: "S.No",
    },
    {
      key: "username",
      title: "Name",
    },
    {
      key: "emai",
      title: "Email",
    },
    {
      key: "read",
      title: "Mark as Read",
    },
    {
      key: "status",
      title: "Status",
    },

    {
      key: "created_at",
      title: "Created On",
    },
    {
      key: "action",
      title: "Action",
    },
  ];

  const LogoutData = localStorage.getItem('login');

  const markResolved = async (listID, status) => {
    if (listID && status) {
      try {
        const response = await fetch(
          `${base_url}customer-support/change-status/${listID}?status=${status == 'CLOSE' ? 'OPEN' : 'CLOSE'}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              // Add authorization token if required
              "Authorization": `Bearer ${LogoutData}`
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setStatus('');
        setListID(null);
        GetCustomerSupport()
        return data;
      } catch (error) {
        console.error("Error changing customer status:", error);
        return null;
      }
    }
  };





  return (
    <>
      <DashboardLayout>
        <div className="container-fluid">
          <div className="row mb-3">
            <div className="col-12">
              <div className="dashCard">
                <div className="row mb-3 justify-content-between">
                  <div className="col-md-6 mb-2">
                    <h2 className="mainTitle">Customer Management</h2>
                  </div>
                  <div className="col-md-6 mb-2">
                    <div className="addUser align-items-end">
                      <div className="filterBox mb-3">
                        <label>Filter by Status: </label>
                        <select className="mainInput" onChange={(e) => setStatusFilter(e.target.value)} value={statusFilter}>
                          <option value="ALL">All</option>
                          <option value="OPEN">Open</option>
                          <option value="CLOSE">Resolved</option>
                        </select>
                      </div>
                      {/* <CustomButton text="Add New Message" variant='primaryButton' onClick={hanldeRoute} /> */}
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
                        {currentItems?.map((item, index) =>
                        (

                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td className="text-capitalize">
                              {item?.name}
                            </td>
                            <td>{item?.email}</td>
                            <td className={item?.seen === true ? 'text-success' : 'text-danger'}>{item?.seen === true ? 'Read' : 'Unread'}</td>
                            <td className={item?.status === 'CLOSE' ? 'text-success' : 'text-danger'}>{item?.status == "CLOSE" ? 'RESOLVED' : item?.status}</td>
                            <td><FormatDateTime isoDateString={item?.createdAt}></FormatDateTime></td>
                            <td>
                              <Dropdown className="tableDropdown">
                                <Dropdown.Toggle variant="transparent" className="notButton classicToggle">
                                  <FontAwesomeIcon icon={faEllipsisV} />
                                </Dropdown.Toggle>
                                <Dropdown.Menu align="end" className="tableDropdownMenu">

                                  <Link to={`/customer-support/message-details/${item?.id}`} className="tableAction"><FontAwesomeIcon icon={faEye} className="tableActionIcon" />View</Link>
                                  {item?.status == 'OPEN' && (
                                    <button className="tableAction" onClick={() => { markResolved(item?.id, item?.status) }}><FontAwesomeIcon icon={faCheck} className="tableActionIcon" />Resolve</button>
                                  )}
                                  {item?.status == 'CLOSE' && (
                                    <button className="tableAction" onClick={() => { markResolved(item?.id, item?.status) }}><FontAwesomeIcon icon={faCheck} className="tableActionIcon" />Open</button>
                                  )}
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
