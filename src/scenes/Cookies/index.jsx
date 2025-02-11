import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import DataTable from "react-data-table-component";
import { GrFormViewHide } from "react-icons/gr";
import { IoArrowBackCircle } from "react-icons/io5";
import * as XLSX from "xlsx";
import { ApiUrl } from "../../ApiRUL"


export default function CookieConsent() {
  const [CDeatils, setCDeatils] = useState([]);
  const [SDate, setSDate] = useState({ start: "", end: "" });
  const [SelectedData, setSelectedData] = useState([]);
  const columns = [
    {
      name: "IP Address",
      selector: (row) => row.location?.ip,
      sortable: true,
    },
    {
      name: "User Agent",
      selector: (row) => row.proofOfConsent?.userAgent, // Accessing nested proofOfConsent.userAgent
      wrap: true,
    },
    {
      name: "Consent",
      selector: (row) => (row.consent?.status == true ? "Yes" : "No"),
      sortable: true,
    },
    {
      name: "Preferences",
      selector: (row) =>
        row.consent?.preferences
          ? `Analytics: ${row.consent.preferences.analytics}, Marketing: ${row.consent.preferences.marketing}, Necessary: ${row.consent.preferences.necessary}`
          : null,
      wrap: true,
    },
    // {
    //   name: "User",
    //   selector: (row) => row.user?.name || "Anonymous", // Accessing nested user.name
    //   sortable: true,
    // },
    {
      name: "Created At",
      selector: (row) =>
        moment(row.createdAt).format("DD-MM-YYYY HH:mm:ss"),
      sortable: true,
    },
    {
      name: "Updated At",
      selector: (row) =>
        moment(row.updatedAt).format("DD-MM-YYYY HH:mm:ss"),
      sortable: true,
    },

    {
      name: "Action",
      cell: (row) => (
        <>
          <p style={{ cursor: "pointer", marginRight: "15px", color: "red" }} onClick={() => handleDeleteSingle(row._id)}>Delete</p>
          <GrFormViewHide className="cursor" onClick={() => handleView(row._id)} />
          {/* <p style={{ cursor: "pointer", marginRight: "5px", color: "green" }} onClick={() => handleEdit(row)}>Edit</p> */}
        </>
      ),
    },
  ];
  const [view, setView] = useState(false)
  const [ViewData, setViewData] = useState(null)
  const handleView = async (id) => {
    setView(true)

    const response = await axios.get(`${ApiUrl.BASEURL}/cookies/getbyid/${id}`);

    setViewData(response.data)
  }

  const handleDeleteSingle = async (id) => {
    try {

      let response = await axios.post(`${ApiUrl.BASEURL}/cookies/trash/${id}`);
      if (response.status === 200) {
        setCDeatils(CDeatils.filter((item) => item._id !== id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSDate((prev) => ({ ...prev, [name]: value }));
  };

  const filterDateswise = (data) => {
    if (!Array.isArray(data)) {
      console.error("filterDateswise: Expected an array, got:", data);
      return [];
    }

    return data.filter((item) => {
      const createdAt = moment(item.createdAt);
      const start = SDate.start ? moment(SDate.start, "YYYY-MM-DD") : null;
      const end = SDate.end ? moment(SDate.end, "YYYY-MM-DD") : null;

      if (start && !createdAt.isSameOrAfter(start, "day")) return false;
      if (end && !createdAt.isSameOrBefore(end, "day")) return false;

      return true;
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${ApiUrl.BASEURL}/cookies/getdata`);
        if (response.status === 200) {

          const sortedData = response.data.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );

          setCDeatils(sortedData);

        } else {
          console.error("API response data is not an array:", response.data);
          setCDeatils([]);
        }
      } catch (error) {
        console.error("Error fetching consent data:", error);
        setCDeatils([]); // Fallback to empty array on error
      }
    };
    fetchData();
  }, []);

  const filteredData = filterDateswise(CDeatils);
  const handleSelecteRow = (state) => {
    setSelectedData(state.selectedRows);
  };

  const handleInfo = async () => {
    try {
      const data = [
        ["IP Address", "user Agent", "Analytics", "Necessary"],
        ...SelectedData.map((ele) => [ele.location?.ip, ele.proofOfConsent?.userAgent, ele.consent.preferences.analytics == true ? "YES" : "No", ele.consent.preferences.necessary == true ? "YES" : "No"]),
      ];
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.aoa_to_sheet(data);
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
      const wbout = XLSX.write(wb, { type: "binary", bookType: "xlsx" });
      const blob = new Blob([s2ab(wbout)], { type: "application/octet-stream" });

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "data.xlsx");
      document.body.appendChild(link);
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error generating Excel file:", error);
    }
  };

  const s2ab = (s) => {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff;
    return buf;
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Cookie Consent Details</h2>


      {!view ?
        <>
          <div className="row mb-3">
            <div className="col-md-4">
              <label className="form-label">Start Date</label>
              <input
                type="date"
                name="start"
                className="form-control"
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">End Date</label>
              <input
                type="date"
                name="end"
                className="form-control"
                onChange={handleChange}
              />
            </div>
            <div className="col-md-2 mt-4">
              {SelectedData.length > 0 && (
                <button className="row m-auto p-2" style={{ border: "none", backgroundColor: "blue", color: "white", borderRadius: "6px" }} onClick={handleInfo}>
                  Download
                </button>
              )}
            </div>
          </div>


          <DataTable
            columns={columns}
            data={filteredData}
            pagination
            highlightOnHover
            striped
            selectableRows
            onSelectedRowsChange={handleSelecteRow}
          />
        </>
        : <div>
          <IoArrowBackCircle className="fs-3 cursor" onClick={() => setView(false)} />
          <h3>Location</h3>
          <p>City : {ViewData?.location?.city}</p>
          <p>Country : {ViewData?.location?.country}</p>
          <p>Ip : {ViewData?.location?.ip}</p>
          <p>Region : {ViewData?.location?.region}</p>
          <h3>Proof of consent</h3>
          <p>userAgent : {ViewData?.proofOfConsent?.userAgent}</p>


          {/* <h1>user</h1>
          <p>Name : {ViewData?.user?.name}</p>
          <p>Email : {ViewData?.user?.email}</p> */}

        </div>
      }
    </div>
  );
}
