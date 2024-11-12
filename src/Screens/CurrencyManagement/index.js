import { useState, useEffect } from "react";

import { DashboardLayout } from "./../../Components/Layout/DashboardLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowCircleDown,
} from "@fortawesome/free-solid-svg-icons";
import { CChart } from "@coreui/react-chartjs";
import { SelectBox } from "../../Components/CustomSelect";
import { useApi } from "../../Api";
import { manaImage } from "../../Assets/images";

import "./style.css";
import CustomInput from "../../Components/CustomInput";

export const CurrencyManagement = () => {
  const [data, setData] = useState('');
  const [lead, setLead] = useState('');
  const [mana, setMana] = useState(1);
  const [usd, setUsd] = useState(.3);
  const [recived, setReceived] = useState('');
  const [amount, setAmount] = useState('');
  const { apiData: leadsAmountData, loading: dataLoading } = useApi('admin/leads-amount');
  const { apiData: leadsAmountMonthlyData, loading: leadLoading } = useApi('admin/leads-amount-monthly');
  const { apiData: leadsAmountReceivedData, loading: receivedLoading } = useApi('admin/leads-amount-received');
  const { apiData: leadsAmountReceivedMonthlyData, loading: AmountLoading } = useApi('admin/leads-amount-received-monthly');


  useEffect(() => {

    document.title = 'Poker City Admin | Currency Management';
  }, []);


  useEffect(() => {
    setData(leadsAmountData)
    setLead(leadsAmountMonthlyData)
    setReceived(leadsAmountReceivedData)
    setAmount(leadsAmountReceivedMonthlyData)

  }, [leadsAmountData, leadsAmountMonthlyData, leadsAmountReceivedData, leadsAmountReceivedMonthlyData])


  return (
    <>
      <DashboardLayout>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <h2 className="mainTitle mb-3">Mana Currency</h2>
              <div className="manaThumnail">
                <img src={manaImage} className="mw-100" />
              </div>
            </div>
          </div>
          <div className="row align-items-center mb-5">
            <div className="col-md-3">
              <CustomInput
                label="Mana"
                type="number"
                placeholder="1 Mana"
                name="name"
                labelClass='mainLabel'
                inputClass='mainInput'
                value={mana}
                onChange={(event) => {
                  setMana(event.target.value);
                  setUsd((.3 * event.target.value))
                }}
              />
            </div>
            <div className="col-md-1 text-center">
              <span>=</span>
            </div>
            <div className="col-md-3">
              <CustomInput
                label="USD"
                type="number"
                placeholder="$1"
                name="name"
                labelClass='mainLabel'
                inputClass='mainInput'
                value={usd}
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-12">
              <div className="dashCard">
                <div className="d-flex flex-wrap justify-content-between">
                  <h3 className="mainTitle">Mana</h3>
                </div>
                <div className="graph-wrapper">
                  <CChart
                    type="line"
                    height="90"
                    options={{
                      scales: {
                        y: {
                          suggestedMin: 0,
                          suggestedMax: 40,
                        },
                      },
                    }}
                    data={{
                      labels: ["Octuber 2023"],
                      tension: "0.5",
                      datasets: [
                        {
                          label: "Mana",

                          backgroundColor: "#221123",
                          borderColor: "#221123",
                          pointBackgroundColor: "#221123",
                          pointBorderColor: "#221123",
                          borderWidth: 1,
                          data: [35],
                          tension: 0.5,
                        },
                        {
                          label: "USD",
                          backgroundColor: "#5a3473",
                          borderColor: "#5a3473",
                          pointBackgroundColor: "#5a3473",
                          borderWidth: 1,
                          pointBorderColor: "#5a3473",
                          data: [20],
                          tension: 0.5,
                        },
                      ],
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};
