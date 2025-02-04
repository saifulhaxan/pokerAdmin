/**
    * @description      : 
    * @author           : Saif
    * @group            : 
    * @created          : 04/11/2024 - 21:22:52
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 04/11/2024
    * - Author          : Saif
    * - Modification    : 
**/
import { useState, useEffect } from "react";
//y
import { DashboardLayout } from "./../../Components/Layout/DashboardLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowCircleDown,
} from "@fortawesome/free-solid-svg-icons";
import { male1, male2, userImage, female1, male3 } from "../../Assets/images";
import { useApi, useGet } from "../../Api";

import "./style.css";
import { Link } from "react-router-dom";
import FormatDateTime from "../../Components/DateFormate";

export const Dashboard = () => {
  const [data, setData] = useState('');
  const [lead, setLead] = useState('');
  const [recived, setReceived] = useState('');
  const [amount, setAmount] = useState('');
  const { ApiData: DashboardStatsData, loading: DashboardStatsLoading, error: DashboardStatsError, get: GetDashboardStats } = useGet(`user/stats`);


  useEffect(() => {

    document.title = 'Poker Admin | Dashboard';
    GetDashboardStats()
  }, []);


  useEffect(() => {
    if (DashboardStatsData) {
      setData(DashboardStatsData)
    }

  }, [DashboardStatsData])

  console.log(data)


  return (
    <>
      <DashboardLayout>
        <div className="container-fluid">
          <div className="row mb-3">
            <div className="col-12">
              <div className="dashCard">
                <div className="row">
                  <div className="col-xl-3 col-md-6 stats">
                    <div className="statsCard">
                      <div className="statsContent">
                        <div className="statsData">
                          {/* {leadLoading ? 'Loading...' : <h3 className="statsNumber">{`$ ${data?.totalSum}`}</h3>} */}
                          <h3 className="statsNumber">{data?.users}</h3>
                          <p className="statsText">Total Users</p>
                        </div>
                      </div>
                      <div className="statsChange">
                        <p>
                          <FontAwesomeIcon
                            icon={faArrowCircleDown}
                            className="me-2 redColor"
                          />

                          100 %
                        </p>
                        <p>Since last week</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-md-6 stats">
                    <div className="statsCard">
                      <div className="statsContent">
                        <div className="statsData">
                          {/* {receivedLoading ? 'Loading... ' : <h3 className="statsNumber">{`$ ${recived?.totalSumReceivedAmount}`}</h3>} */}
                          <h3 className="statsNumber">{data?.lectureTrendObject?.totalLectures}</h3>
                          <p className="statsText">Total Lectures</p>
                        </div>
                      </div>
                      <div className="statsChange">
                        <p>
                          <FontAwesomeIcon
                            icon={faArrowCircleDown}
                            className="me-2 redColor"
                          />

                          100 %
                        </p>
                        <p>Since last week</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-md-6 stats">
                    <div className="statsCard">
                      <div className="statsContent">
                        <div className="statsData">
                          {/* {AmountLoading ? 'Loading...' : 
                          <h3 className="statsNumber">{`$ ${amount?.sumAmountMonthlyReceived}`}</h3>
                          } */}
                          <h3 className="statsNumber">{data?.subscriptions?.length}</h3>
                          <p className="statsText">Active Subscription</p>
                        </div>
                      </div>
                      <div className="statsChange">
                        <p>
                          <FontAwesomeIcon
                            icon={faArrowCircleDown}
                            className="me-2 redColor"
                          />

                          100 %
                        </p>
                        <p>Since last week</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-md-6 stats">
                    <div className="statsCard">
                      <div className="statsContent">
                        <div className="statsData">
                          {/* {AmountLoading ? 'Loading...' : 
                          <h3 className="statsNumber">{`$ ${amount?.sumAmountMonthlyReceived}`}</h3>
                          } */}
                          <h3 className="statsNumber">{data?.activePromos?.length}</h3>
                          <p className="statsText">Active Promotions</p>
                        </div>
                      </div>
                      <div className="statsChange">
                        <p>
                          <FontAwesomeIcon
                            icon={faArrowCircleDown}
                            className="me-2 redColor"
                          />

                          100 %
                        </p>
                        <p>Since last week</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-12">
              <div className="dashCard">
                <div className="row">
                  <div className="col-md-6 mb-4">
                    <div className="titleArea mb-4">
                      <h3 className="mainTitle">Recently Login</h3>
                    </div>
                    <div className="dashData">
                      {
                        data?.recentLogins && data?.recentLogins?.map((item, index) => (
                          <div className="userBox" key={index}>
                            <div className="userImage">
                              <img src={male1} alt="Jhon" />
                            </div>
                            <div className="userName">
                              <h5>{item?.email}</h5>
                              <p><FormatDateTime isoDateString={item?.createdAt}></FormatDateTime></p>
                            </div>
                          </div>
                        ))
                      }
                    </div>
                  </div>
                  <div className="col-md-6 mb-4">
                    <div className="titleArea mb-4">
                      <h3 className="mainTitle">Recently Registered</h3>
                    </div>
                    <div className="dashData">
                      {
                        data && data?.recentRegistrations?.slice(0, 5)?.map((item, index) => (

                          <Link to={`/user-management/user-details/${item?.id}`} className="text-decoration-none text-dark">
                            <div className="userBox" key={index}>
                              <div className="userImage">
                                <img src={male1} alt="Jhon" />
                              </div>
                              <div className="userName">
                                <div className="info">
                                  <h5 className="text-capitalize">{item?.name}</h5>
                                  <small>{item?.email}</small>
                                </div>
                                <p><FormatDateTime isoDateString={item?.createdAt}></FormatDateTime></p>
                              </div>
                            </div>
                          </Link>
                        ))
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};
