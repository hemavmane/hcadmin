import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";

import PersonAddIcon from "@mui/icons-material/PersonAdd";

import Header from "../../Component/Header";

import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import InventoryOutlinedIcon from "@mui/icons-material/InventoryOutlined";
import axios from "axios";
import { useEffect, useState } from "react";
import { ApiUrl } from "../../ApiRUL";
const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  
  return (
    <></>
  );
};

export default Dashboard;
