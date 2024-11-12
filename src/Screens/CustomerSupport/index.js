/**
    * @description      : 
    * @author           : Saif
    * @group            : 
    * @created          : 04/11/2024 - 22:57:05
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
import { faEllipsisV, faEye, faCheck, faTimes, faFilter, faEdit, faReply } from "@fortawesome/free-solid-svg-icons";

import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import CustomTable from "../../Components/CustomTable";
import CustomModal from "../../Components/CustomModal";

import CustomPagination from "../../Components/CustomPagination"
import CustomInput from "../../Components/CustomInput";
import CustomButton from "../../Components/CustomButton";


import "./style.css";

export const CustomerSupport = () => {
  const base_url = 'https://custom.mystagingserver.site/Tim-WDLLC/public/'
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [showModal4, setShowModal4] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [inputValue, setInputValue] = useState('');

  const navigate = useNavigate();

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const hanldeRoute = () => {
    navigate('/add-ads')
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

  const filterData = data.filter(item =>
    item.ad_title.toLowerCase().includes(inputValue.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filterData.slice(indexOfFirstItem, indexOfLastItem);


  const AdsListing = () => {
    const LogoutData = localStorage.getItem('login');
    document.querySelector('.loaderBox').classList.remove("d-none");
    fetch('',
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
        // setData(data.data);
      })
      .catch((error) => {
        document.querySelector('.loaderBox').classList.add("d-none");
        console.log(error)
      })

  }

  useEffect(() => {
    document.title = 'Poker City Admin | Customer Support';
    AdsListing()

  }, []);

  const maleHeaders = [
    {
      key: "id",
      title: "S.No",
    },
    {
      key: "username",
      title: "Customer Name",
    },
    {
      key: "email",
      title: "Email",
    },
    {
      key: "message",
      title: "Message",
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


  return (
    <>
      <DashboardLayout>
        <div className="container-fluid">
          <div className="row mb-3">
            <div className="col-12">
              <div className="dashCard">
                <div className="row mb-3 justify-content-between">
                  <div className="col-md-6 mb-2">
                    <h2 className="mainTitle">Customer Queries</h2>
                  </div>
                  {/* <div className="col-md-6 mb-2">
                    <div className="addUser">
                      <CustomButton text="Add New Ad" variant='primaryButton' onClick={hanldeRoute} />
                      <CustomInput type="text" placeholder="Search Here..." value={inputValue} inputClass="mainInput" onChange={handleChange} />
                    </div>
                  </div> */}
                </div>
                <div className="row mb-3">
                  <div className="col-12">
                    <CustomTable
                      headers={maleHeaders}

                    >
                      {/* <tbody>
                        {currentItems.map((item, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td><img src={base_url + item?.ad_image} className="avatarIcon"/></td>
                            <td className="text-capitalize">
                              {item?.ad_title}
                            </td>
                            <td>{item?.created_at}</td>
                            <td className={!item.status  ? 'greenColor' : "redColor"}>{!item.status ? 'Active' : "Inactive"}</td>
                            <td>
                              <Dropdown className="tableDropdown">
                                <Dropdown.Toggle variant="transparent" className="notButton classicToggle">
                                  <FontAwesomeIcon icon={faEllipsisV} />
                                </Dropdown.Toggle>
                                <Dropdown.Menu align="end" className="tableDropdownMenu">
                                <Link to={`/ads-management/edit-ads/${item?.id}`} className="tableAction"><FontAwesomeIcon icon={faEdit} className="tableActionIcon" />Edit</Link>
                                
                                </Dropdown.Menu>
                              </Dropdown>
                            </td>
                          </tr>
                        ))}
                      </tbody> */}
                      <tbody>
                        <tr>
                          <td>01</td>
                          <td>Alpha</td>
                          <td>alpha@test.com</td>
                          <td>I need the Book A How can I puschase?</td>
                          <td>17-oct-2023</td>
                          <td>
                            <Dropdown className="tableDropdown">
                              <Dropdown.Toggle variant="transparent" className="notButton classicToggle">
                                <FontAwesomeIcon icon={faEllipsisV} />
                              </Dropdown.Toggle>
                              <Dropdown.Menu align="end" className="tableDropdownMenu">
                                <Link to="#" className="tableAction"><FontAwesomeIcon icon={faReply} className="tableActionIcon" />Reply</Link>

                              </Dropdown.Menu>
                            </Dropdown>
                          </td>
                        </tr>
                        <tr>
                          <td>02</td>
                          <td>Alpha</td>
                          <td>alpha@test.com</td>
                          <td>I need the Book A How can I puschase?</td>
                          <td>17-oct-2023</td>
                          <td>
                            <Dropdown className="tableDropdown">
                              <Dropdown.Toggle variant="transparent" className="notButton classicToggle">
                                <FontAwesomeIcon icon={faEllipsisV} />
                              </Dropdown.Toggle>
                              <Dropdown.Menu align="end" className="tableDropdownMenu">
                                <Link to="#" className="tableAction"><FontAwesomeIcon icon={faReply} className="tableActionIcon" />Reply</Link>

                              </Dropdown.Menu>
                            </Dropdown>
                          </td>
                        </tr>
                        <tr>
                          <td>03</td>
                          <td>Alpha</td>
                          <td>alpha@test.com</td>
                          <td>I need the Book A How can I puschase?</td>
                          <td>17-oct-2023</td>
                          <td>
                            <Dropdown className="tableDropdown">
                              <Dropdown.Toggle variant="transparent" className="notButton classicToggle">
                                <FontAwesomeIcon icon={faEllipsisV} />
                              </Dropdown.Toggle>
                              <Dropdown.Menu align="end" className="tableDropdownMenu">
                                <Link to="#" className="tableAction"><FontAwesomeIcon icon={faReply} className="tableActionIcon" />Reply</Link>

                              </Dropdown.Menu>
                            </Dropdown>
                          </td>
                        </tr>
                        <tr>
                          <td>04</td>
                          <td>Alpha</td>
                          <td>alpha@test.com</td>
                          <td>I need the Book A How can I puschase?</td>
                          <td>17-oct-2023</td>
                          <td>
                            <Dropdown className="tableDropdown">
                              <Dropdown.Toggle variant="transparent" className="notButton classicToggle">
                                <FontAwesomeIcon icon={faEllipsisV} />
                              </Dropdown.Toggle>
                              <Dropdown.Menu align="end" className="tableDropdownMenu">
                                <Link to="#" className="tableAction"><FontAwesomeIcon icon={faReply} className="tableActionIcon" />Reply</Link>

                              </Dropdown.Menu>
                            </Dropdown>
                          </td>
                        </tr>
                      </tbody>
                    </CustomTable>
                    {/* <CustomPagination
                      itemsPerPage={itemsPerPage}
                      totalItems={data.length}
                      currentPage={currentPage}
                      onPageChange={handlePageChange}
                    /> */}
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
