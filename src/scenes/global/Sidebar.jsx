import { useState } from "react";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import GridViewIcon from "@mui/icons-material/GridView";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import PhotoIcon from "@mui/icons-material/Photo";
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  const logout = () => {
    localStorage.removeItem("hcadmin");
    window.location.assign("/");
  };

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#478CCF !important",
        },
        "& .pro-menu-item.active": {
          color: "#478CCF !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  <img
                    width="20px"
                    height="20px"
                    src="../HealthConsultancyLogo.webp"
                  />
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src="./../assets/user.png"
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  Admin
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  Health Consultancy
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/dashboard"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <SubMenu title="Home Page" icon={<GridViewIcon />}>
              <Item
                title="Banner"
                to="/banner"
                icon={<PhotoIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Service"
                to="/service"
                icon={<ManageAccountsIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Provider Trust"
                to="/providertrust"
                icon={<ManageAccountsIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            </SubMenu>
            <Item
              title="Blog Page"
              to="/blogpage"
              icon={<PhotoIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Contact"
              to="/contact"
              icon={<PermContactCalendarIcon />}
              selected={selected}
              setSelected={setSelected}
            />


            <SubMenu title="About Page" icon={<GridViewIcon />}>
              <Item
                title="About"
                to="/about"
                icon={<PhotoIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Overview"
                to="/overview"
                icon={<ManageAccountsIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Provider Trust"
                to="/providertrust"
                icon={<ManageAccountsIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Company Values Page"
                to="/cmvalue"
                icon={<ManageAccountsIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              
              <Item
                title="Mission and Vision"
                to="/mission"
                icon={<ManageAccountsIcon />}
                selected={selected}
                setSelected={setSelected}
              />

            </SubMenu>
            <Item
              title="Cookis"
              to="/cookies"
              icon={<PermContactCalendarIcon />}
              selected={selected}
              setSelected={setSelected}
            />

          </Box>

          <Box
            sx={{
              position: "absolute",
              bottom: "-10px",
              width: "100%",
              textAlign: "center",
              marginTop: "25px",
            }}
          >
            <button
              onClick={logout}
              style={{
                background: "#ff000047",
                border: "none",
                color: "black",
                padding: "5px",
                cursor: "pointer",
                width: "60%",
                margin: "auto",
                borderRadius: "5px",
              }}
            >
              Logout
            </button>
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
