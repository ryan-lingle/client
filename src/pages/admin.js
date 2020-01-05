import React, { useEffect, useState } from "react";
import { Loader, Tabs } from "../components";

const Admin = () => {
  const [metrics, setMetrics] = useState(null);
  const [timePeriod, setTimePeriod] = useState("alltime");

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`http://localhost:4000/admin/api?t=${timePeriod}`, {
        mode: 'cors',
      });
      const res = await response.json();
      setMetrics(res);
    }
    fetchData();
  }, [timePeriod]);

  return(
    <div>
      <div id="admin-content">
        {metrics ?
          <div>
            <div id="admin-metrics">
              <h1>METRICS</h1>
              <div className="time-tabs">
                <Tabs
                  tabs={["alltime", "month", "day"]}
                  onChange={tab => setTimePeriod(tab)}
                />
              </div>
              <div id="metrics-metrics" className="row">
                <div className="col-sm-4">
                  <div className="metric-box">
                    <div className="metric-header">USERS</div>
                    <div className="metric-metric">{parseInt(metrics.users).toMoney()}</div>
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="metric-box">
                    <div className="metric-header">REK SUM</div>
                    <div className="metric-metric">{parseInt(metrics.reks.sum).toMoney()} sats</div>
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="metric-box">
                    <div className="metric-header">REK FEES</div>
                    <div className="metric-metric">{parseInt(metrics.fees).toMoney()} sats</div>
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="metric-box">
                    <div className="metric-header">REK COUNT</div>
                    <div className="metric-metric">{parseInt(metrics.reks.count).toMoney()}</div>
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="metric-box">
                    <div className="metric-header">TOTAL DEPOSITS</div>
                    <div className="metric-metric">{parseInt(metrics.fees).toMoney()} sats</div>
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="metric-box">
                    <div className="metric-header">PODCASTS</div>
                    <div className="metric-metric">{parseInt(metrics.podcasts.count).toMoney()}</div>
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="metric-box">
                    <div className="metric-header">CLAIMED PODCASTS</div>
                    <div className="metric-metric">{parseInt(metrics.podcasts.claimed).toMoney()}</div>
                  </div>
                </div>
              </div>
            </div>
            <div id="admin-metrics">
              <h1>REKS</h1>
            </div>
          </div>
        : <Loader />}
      </div>
    </div>
  );
};

export default Admin;
