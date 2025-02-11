import { Box, Typography, useTheme, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../Component/Header";
import { useEffect, useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";

import { Form } from "react-bootstrap";
import { MdDeleteForever } from "react-icons/md";
import { CiEdit } from "react-icons/ci";

import {
  deleteData,
  getData,
  postFormData,
  putData,
  putFormData,
} from "../../methods";
import { ApiUrl } from "../../ApiRUL";
import CustomColumnMenu from "../customgrid";

const Banner = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [rows, setRows] = useState([]);
  const [image, setImage] = useState(null);
  const [AddBanner, setAddBanner] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editRowId, setEditRowId] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  let InitialData = {
    title: "",
    subtitle: "",
    bannerImg: "",
    btnText: "",
    btnColor: ""
  };
  
  const [PayloadData, setPayloadData] = useState(InitialData);

  const [SelectedSlot, setSelectedSlot] = useState([]);
  const [SlotsData, setSlotsData] = useState([]);
  const [ItemsData, setItemsData] = useState([]);
  const columns = [
    { field: "index", headerName: "SI No.", width: 100 },
    {
      field: "title",
      headerName: "Title",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "subtitle",
      headerName: "Subtitle",
      flex: 2,
      cellClassName: "name-column--cell",
    },
    {
      field: "btnText",
      headerName: "button Text",
      flex: 3,
      cellClassName: "name-column--cell",
    },
    {
      field: "btnColor",
      headerName: "button Color",
      flex: 4,
      cellClassName: "name-column--cell",
    },


    {
      field: "bannerImg",
      headerName: "Banner Image",
      flex: 1,
      renderCell: (params) => (
        <img
          src={`${ApiUrl.IMAGEURL}/BannerImage/${params.row.bannerImg}`}
          alt="bannerImg"
          style={{ width: 40, height: 40, borderRadius: "none" }}
        />
      ),
      headerAlign: "left",
      align: "left",
    },

    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: ({ row }) => (
        <div color={colors.grey[100]} sx={{ ml: "5px" }}>
          <CiEdit
            className="cursor edit me-2 fs-6"
            onClick={() => handleEdit(row)}
          />
          |{" "}
          <MdDeleteForever
            className="cursor delete fs-6"
            onClick={() => handleDelete(row.id)}
          />
        </div>
      ),
    },
  ];




  useEffect(() => {
    getBanner();

  }, []);

  useEffect(() => {
    let data = ItemsData.length > 0 ? ItemsData : [];
    if (data) {
      const selectedSlotIds = data?.map((slot) => slot?._id);
      setSelectedSlot(selectedSlotIds);
    }
  }, [editRowId]);
  const getBanner = async () => {
    try {
      const response = await getData(ApiUrl.GETBANNER);

      if (response.status === 200) {
        const rowsWithId = response.data.map((item, index) => ({
          ...item,
          id: item._id,
          index: index + 1,
          Bannerimg: item.Bannerimg,
        }));
        setRows(rowsWithId);

        setAddBanner(false);
      }
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };


  const handleChange = (e) => {
    let { name, value } = e.target;

    setPayloadData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleImage = (e) => {
    let { name, value } = e.target;

    const file = e.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
    value = file;
  };

  const handleAddData = async () => {
    try {

      const formData = new FormData();
      formData.append("title", PayloadData.title);
      formData.append("subtitle", PayloadData.subtitle);
      formData.append("btnText", PayloadData.btnText);
      formData.append("btnColor", PayloadData.btnColor);
      formData.append("bannerImg", image);

      const response = await postFormData(ApiUrl.ADDBANNER, formData);

      if (response.status === 200) {
        alert(response.data.message);
        setPayloadData(InitialData);
        setAddBanner(false);
        window.location.reload();
      }
    } catch (error) {
      console.error("Error adding Banner:", error);
    }
  };

 

  const handleUpdateData = async () => {
    try {
      const formData = new FormData();
      formData.append("title", PayloadData.title);
      formData.append("subtitle", PayloadData.subtitle);
      formData.append("btnText", PayloadData.btnText);
      formData.append("btnColor", PayloadData.btnColor);
      formData.append("bannerImg", image);
  
      const response = await putFormData(ApiUrl.UPDATBANNER + editRowId, formData);
  
      if (response.status === 200) {
        alert(response.data.message);
        setPayloadData(InitialData);
        setAddBanner(false);
        window.location.reload();
      }
    } catch (error) {
      console.error("Error updating items:", error);
    }
  };
  


  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this Banner?")) {
      const response = await deleteData(ApiUrl.DELETEBANNER + id);
      if (response.status === 200) {
        alert(response.data.message);
        window.location.reload();
        getBanner();
      }
    }
  };

  const handleEdit = (data) => {
    setAddBanner(true);
    setIsEditMode(true);
    setEditRowId(data._id);
    let image = `${ApiUrl.IMAGEURL}/BannerImage/${data.bannerImg}`;
    let finddata = rows.find((ele) => ele._id === data._id);
    setImage(finddata?.Bannerimg);
    setImagePreview(image);

    setPayloadData({
      title: finddata?.title,
      subtitle: finddata?.subtitle,
      bannerImg: finddata?.bannerImg,
      btnText: finddata?.btnText,
      btnColor: finddata?.btnColor,
    });

    setImage(finddata?.bannerImg);

  };


  return (
    <Box m="20px">
      {!AddBanner ? (
        <>
          <Button onClick={() => setAddBanner(true)}>Add Banner</Button>
          <Header title="Banner" />
          <Box
            m="40px 0 0 0"
            height="75vh"
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none",
              },
              "& .name-column--cell": {
                color: colors.greenAccent[300],
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: colors.blueAccent[700],
                borderBottom: "none",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: colors.primary[400],
              },
              "& .MuiDataGrid-footerContainer": {
                borderTop: "none",
                backgroundColor: colors.blueAccent[700],
              },
              "& .MuiCheckbox-root": {
                color: `${colors.greenAccent[200]} !important`,
              },
            }}
          >
            <DataGrid
              checkboxSelection
              rows={rows}
              columns={columns}
              components={{
                ColumnMenu: CustomColumnMenu,
              }}
            />
          </Box>
        </>
      ) : (
        <div>
          <Button onClick={() => setAddBanner(false)}>View Banner</Button>

          <div className="row m-auto">
            <Header
              subtitle={
                isEditMode ? "Edit the Banner" : "Create a New Banner"
              }
            />
            <div>
              <div className="row border">

                <div className="col-md-10 m-auto p-4">
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <Form.Control
                        onChange={handleChange}
                        name="title"
                        value={PayloadData.title}
                        placeholder="Title"
                      />
                    </div>
                    <div className="col-md-6 mb-3 ">
                      <Form.Control
                        onChange={handleChange}
                        name="subtitle"
                        value={PayloadData.subtitle}
                        placeholder="Subtitle"
                      />
                    </div>
                    <div className="col-md-4 mb-3">
                      <Form.Control
                        onChange={handleChange}
                        name="btnColor"
                        value={PayloadData.btnColor}
                        placeholder="button color"
                        type="color"
                      />
                    </div>
                    <div className="col-md-4 mb-3">
                      <Form.Control
                        onChange={handleChange}
                        name="btnText"
                        value={PayloadData.btnText}
                        placeholder="button text"
                      />
                    </div>
                    <div className="row m-auto cate-img text-center p-3">
                      <Form.Control
                        accept="image/*"
                        style={{ display: "none" }}
                        id="cateimage"
                        type="file"
                        className="row m-auto"
                        onChange={handleImage}
                      />
                      <label htmlFor="cateimage" className="row m-auto">
                        <IoCloudUploadOutline className="fs-2" />
                        <p> Upload Image</p>
                      </label>
                      {imagePreview && (
                        <div className="mt-3">
                          <img
                            src={imagePreview}
                            alt="Preview"
                            style={{ width: "100px", height: "100px" }}
                          />
                        </div>
                      )}
                    </div>
                    <div className="row mt-4 text-center">
                      <Button
                        onClick={() => setAddBanner(false)}
                        className="col-md-3 me-auto"
                        variant="contained"
                      >
                        Cancel
                      </Button>
                      {isEditMode ? (
                        <Button
                          type="submit"
                          color="secondary"
                          className="col-md-3"
                          variant="contained"
                          onClick={handleUpdateData}
                        >
                          Update
                        </Button>
                      ) : (
                        <Button
                          type="submit"
                          color="secondary"
                          className="col-md-3"
                          variant="contained"
                          onClick={handleAddData}
                        >
                          Save
                        </Button>
                      )}
                    </div>
                  </div>{" "}
                </div>


              </div>
            </div>
          </div>
        </div>
      )}
    </Box>
  );
};

export default Banner;
