import React, { useEffect, useState } from "react";
import { Loader, Tabs, Table } from "../components";
import { Modal } from "react-bootstrap";
import { toSats } from "../utils";
import JSONPretty from 'react-json-pretty';

const ErrorJson = (error) => {
  const [show, setShow] = useState(false);
  return(
    <div>
      <button onClick={() => setShow(true)}>VIEW JSON</button>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>ERROR</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <JSONPretty id="json-pretty" data={error}></JSONPretty>
        </Modal.Body>
      </Modal>
    </div>
  );
};

const errorSchema = {
  message: {
    title: "message",
    format: "string"
  },
  location: {
    title: "location",
    format: "string",
  },
  client: {
    title: "client",
    format: "string",
  },
  operation: {
    title: "operation",
    format: "string",
  },
  createdAt: {
    title: "date",
    format: "time",
  },
  __: {
    title: "JSON",
    children: ({ fullError }) => (
      <ErrorJson error={fullError} />
    )
  }
};

const Admin = () => {
  const [metrics, setMetrics] = useState(null);
  const [timePeriod, setTimePeriod] = useState("alltime");

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`${process.env.REACT_APP_ADMIN_ENDPOINT}/api?t=${timePeriod}`, {
        mode: 'cors',
      });
      const res = await response.json();
      setMetrics(res);
    }
    fetchData();
  }, [timePeriod]);


  console.log(metrics);

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
                    <div className="metric-metric">{toSats(metrics.users, false)}</div>
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="metric-box">
                    <div className="metric-header">REK SUM</div>
                    <div className="metric-metric">{toSats(metrics.reks.sum)}</div>
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="metric-box">
                    <div className="metric-header">REK FEES</div>
                    <div className="metric-metric">{toSats(metrics.fees)}</div>
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="metric-box">
                    <div className="metric-header">REK COUNT</div>
                    <div className="metric-metric">{toSats(metrics.reks.count, false)}</div>
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="metric-box">
                    <div className="metric-header">TOTAL DEPOSITS</div>
                    <div className="metric-metric">{toSats(metrics.fees)}</div>
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="metric-box">
                    <div className="metric-header">PODCASTS</div>
                    <div className="metric-metric">{toSats(metrics.podcasts.count, false)}</div>
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="metric-box">
                    <div className="metric-header">CLAIMED PODCASTS</div>
                    <div className="metric-metric">{toSats(metrics.podcasts.claimed, false)}</div>
                  </div>
                </div>
              </div>
            </div>
            <div id="admin-metrics">
              <h1>ERRORS</h1>
              <Table data={metrics.errors} schema={errorSchema} />
            </div>
          </div>
        : <Loader />}
      </div>
    </div>
  );
};

export default Admin;
