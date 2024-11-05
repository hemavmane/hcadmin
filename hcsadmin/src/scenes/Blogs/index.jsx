import { Box, Typography, useTheme, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../Component/Header";
import { useEffect, useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Form } from "react-bootstrap";
import { MdDeleteForever } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { GrFormView } from "react-icons/gr";

import {
  deleteData,
  getData,
  postFormData,
  putData,
  putFormData,
} from "../../methods";
import { ApiUrl } from "../../ApiRUL";
import CustomColumnMenu from "../customgrid";

const BlogPage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [rows, setRows] = useState([]);
  const [image, setImage] = useState(null);
  const [Blogs, setBlogs] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editRowId, setEditRowId] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [Subtitle, setSubtitle] = useState("")
  const [description, setDescription] = useState("")

  let InitialData = {
    title: "",
    blogImg: "",
  };

  const [PayloadData, setPayloadData] = useState(InitialData);


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
      headerName: "subtitle",
      flex: 2,
      cellClassName: "name-column--cell",
    },

    {
      field: "blogImg",
      headerName: "Blog Image",
      flex: 1,
      renderCell: (params) => (
        <img
          src={`${ApiUrl.IMAGEURL}/BlogImage/${params.row.blogImg}`}
          alt="blogImg"
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
          <GrFormView
            className="cursor edit fs-6"
            onClick={() => handleView(row.id)}
          />


        </div>
      ),
    },
  ];

  const handleView = () => {

  }


  useEffect(() => {
    getBlogs();

  }, []);


  const getBlogs = async () => {
    try {
      const response = await getData(ApiUrl.GETBLOG);

      if (response.status === 200) {

        const rowsWithId = response?.data?.map((item, index) => ({
          ...item,
          id: item._id,
          index: index + 1,
          blogImg: item.blogImg,
        }));
        setRows(rowsWithId);

        setBlogs(false);
      }
      console.log(response?.data)
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
      const titleSlug = PayloadData.title.replace(/\s+/g, '-').toLowerCase();

      const formData = new FormData();

      formData.append("title", PayloadData.title);
      formData.append("subtitle", Subtitle);
      formData.append("description", description);
      formData.append("blogImg", image);
      formData.append("page_slug", titleSlug)
      const response = await postFormData(ApiUrl.ADDBLOG, formData);

      if (response.status === 200) {
        alert(response.data.message);
        setPayloadData(InitialData);
        setBlogs(false);
        window.location.reload();
      }
    } catch (error) {
      console.error("Error adding Blog:", error);
    }
  };



  const handleUpdateData = async () => {
    try {
      const titleSlug = PayloadData.title.replace(/\s+/g, '-').toLowerCase();

      const formData = new FormData();
      formData.append("title", PayloadData.title);
      formData.append("subtitle", Subtitle);
      formData.append("description", description);
      formData.append("blogImg", image);
      formData.append("page_slug", titleSlug)

      const response = await putFormData(ApiUrl.UPDATEBLOG + editRowId, formData);

      if (response.status === 200) {
        alert(response.data.message);
        setPayloadData(InitialData);
        setBlogs(false);
        window.location.reload();
      }
    } catch (error) {
      console.error("Error updating items:", error);
    }
  };



  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this Blog?")) {
      const response = await deleteData(ApiUrl.DELETEBLOG + id);
      if (response.status === 200) {
        alert(response.data.message);
        window.location.reload();
        getBlogs();
      }
    }
  };

  const handleEdit = (data) => {
    setBlogs(true);
    setIsEditMode(true);
    setEditRowId(data._id);
    let image = `${ApiUrl.IMAGEURL}/BlogImage/${data.blogImg}`;
    let finddata = rows.find((ele) => ele._id === data._id);
    setImage(finddata?.blogImg);
    setImagePreview(image);

    setPayloadData({
      title: finddata?.title,

    });



    setDescription(finddata?.description);
    setSubtitle(finddata?.subtitle);
    setImage(finddata?.blogImg);

  };

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setDescription(data);
  };
  const handleChangeSubtitle = (event, editor) => {
    const data = editor.getData();
    setSubtitle(data);
  };
  return (
    <Box m="20px">
      {!Blogs ? (
        <>
          <Button onClick={() => setBlogs(true)}>Add Blog</Button>
          <Header title="Blogs" />
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
          <Button onClick={() => setBlogs(false)}>View Blog</Button>

          <div className="row m-auto">
            <Header
              subtitle={
                isEditMode ? "Edit the Blog" : "Create a New Blog"
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
                    <label>Subtitle</label>
                    <div className="col-md-12 mb-3">

                      <CKEditor
                        editor={ClassicEditor}
                        data={Subtitle}
                        onChange={handleChangeSubtitle}
                        height={200}
                      />
                    </div>

                    <label>Description</label>
                    <div className="col-md-12 mb-3 ">

                      <CKEditor
                        editor={ClassicEditor}
                        data={description}
                        onChange={handleEditorChange}
                        height={200}
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
                        onClick={() => setBlogs(false)}
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

export default BlogPage;
