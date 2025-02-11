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

const About = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [rows, setRows] = useState();
  const [image, setImage] = useState(null);
  const [AddAbout, setAddAbout] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editRowId, setEditRowId] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  let InitialData = {
    title: "",
    description: "",

  };

  const [PayloadData, setPayloadData] = useState(InitialData);

  const [SelectedSlot, setSelectedSlot] = useState([]);
  const [ItemsData, setItemsData] = useState([]);





  useEffect(() => {
    getAbout();

  }, []);


  const getAbout = async () => {
    try {
      const response = await getData(ApiUrl.GETABOUT);

      if (response.status === 200) {

        setRows(response.data);

        setAddAbout(false);
      }
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };
  console.log(rows, "response")

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
      formData.append("description", PayloadData.description);
      formData.append("aboutImg", image);

      const response = await postFormData(ApiUrl.ADDABOUT, formData);

      if (response.status === 200) {
        alert(response.data.message);
        setPayloadData(InitialData);
        setAddAbout(false);
        window.location.reload();
      }
    } catch (error) {
      console.error("Error adding About:", error);
    }
  };



  const handleUpdateData = async () => {
    try {
      const formData = new FormData();
      formData.append("title", PayloadData.title);
      formData.append("description", PayloadData.description);
      formData.append("aboutImg", image);

      const response = await putFormData(ApiUrl.UPDATEABOUT + editRowId, formData);

      if (response.status === 200) {
        alert(response.data.message);
        setPayloadData(InitialData);
        setAddAbout(false);
        window.location.reload();
      }
    } catch (error) {
      console.error("Error updating items:", error);
    }
  };



  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this About?")) {
      const response = await deleteData(ApiUrl.DELETEABOUT + id);
      if (response.status === 200) {
        alert(response.data.message);
        window.location.reload();
        getAbout();
      }
    }
  };

  const handleEdit = (data) => {
    setAddAbout(true);
    setIsEditMode(true);
    setEditRowId(data._id);
    let image = `${ApiUrl.IMAGEURL}/AboutImage/${data.aboutImg}`;
 
    setImage(data?.aboutImg);
    setImagePreview(image);
    setPayloadData({
      title: data?.title,
      description: data?.description,
    });

    setImage(data?.aboutImg);

  };


  return (
    <Box m="20px">
      {!AddAbout ? (
        <>
          <Button onClick={() => setAddAbout(true)}>Add About</Button>
          <Header title="About" />
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
            <div className="AboutContainer02">
              <div className="AboutContainer02TitleAndDescription">
                <h2>{rows?.title}</h2>
                <article>{rows?.description}</article>
              </div>

              <div className="AboutContainer02ImageContainer">
                <img
                  className="AboutContainer02Image" width={200} height={200}
                  src={`${ApiUrl.IMAGEURL}/AboutImage/${rows?.aboutImg}`}
                  alt="IMAGE"
                  effect="blur"
                />
              </div>
              <div className="mt-3">
                <button
                  className="cursor border-none edit me-2 fs-6"
                  onClick={() => handleEdit(rows)}
                >Edit</button>
                <button
                  className="cursor border-none delete fs-6"
                  onClick={() => handleDelete(rows?.id)}
                >Delete</button>
              </div>
            </div>
          </Box>
        </>
      ) : (
        <div>
          <Button onClick={() => setAddAbout(false)}>View About</Button>

          <div className="row m-auto">
            <Header
              subtitle={
                isEditMode ? "Edit the About" : "Create a New About"
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
                    <div className="col-md-12 mb-3 ">
                      <Form.Control
                        as="textarea"
                        onChange={handleChange}
                        name="description"
                        value={PayloadData.description}
                        placeholder="Description"
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
                        onClick={() => setAddAbout(false)}
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

export default About;
