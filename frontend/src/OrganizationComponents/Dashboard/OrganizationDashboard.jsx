import * as React from "react";
import "../../App.css";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import InsertEmoticonRoundedIcon from "@mui/icons-material/InsertEmoticonRounded";
import PentagonIcon from "@mui/icons-material/Pentagon";
import {
  Link,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useEffect } from "react";
import { Stack, ToggleButton } from "@mui/material";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddCounsoler from "../AddCounsolers/AddCounsoler";
import CounsolerWindow from "../CounsolerWindow/CounsolerWindow";
const drawerWidth = 300;
const routes = [
  {
    name: "Counsolers",
    path: "organization/counsolers",
    element: <CounsolerWindow />,
    icon: <PersonSearchIcon style={{ marginRight: "10px" }} />,
  },
  {
    name: "Add Counsolers",
    path: "organization/addcounsolers",
    element: <AddCounsoler />,
    icon: <PersonAddIcon style={{ marginRight: "10px" }} />,
  },
];

const theme = createTheme({
  typography: {
    fontFamily: "monospace", // Specify your desired font-family here
  },
});
function OrganizationDashboard(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const navigate = useNavigate();
  const navigateHandler = (path) => {
    navigate(path);
  };
  const name = sessionStorage.getItem("name");
  const description = sessionStorage.getItem("description");
  const organizatonId = sessionStorage.getItem("id");
  const checkAuthentication = () => {
    if (name == null && description == null && organizatonId == null) {
      navigate("/");
    }
  };
  let location = useLocation();
  const isActiveRoute = (path) => {
    console.log(location.pathname.slice(23));
    console.log(path);
    return location.pathname.slice(23) === path;
  };

  useEffect(() => {
    checkAuthentication();
  }, []);

  const drawer = (
    <div style={{ marginLeft: "50px", marginTop: "40px", marginRight: "8px" }}>
      <Stack>
        {routes.map((routes, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton
              onClick={() => navigateHandler(routes.path)}
              style={{ padding: "0px", marginBottom: "20px" }}
            >
              <Link
                type="button"
                to={"#"}
                className="focus"
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "5px",
                  paddingLeft: "19px",
                  borderRadius: "48px",
                  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                }}
              >
                {routes.icon}

                <ListItemText sx={{}} primary={routes.name} />
              </Link>
            </ListItemButton>
          </ListItem>
        ))}
      </Stack>
    </div>
  );

  // Remove this const when copying and pasting into your project.
  const container =
    window !== undefined ? () => window().document.body : undefined;
  return (
    <ThemeProvider theme={theme} style={{ height: "100vh" }}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          style={{
            zIndex: "999999",
            boxShadow: "none",
            borderBottom: "3px solid #cccccc",
          }}
          position="fixed"
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: { sm: `100%` },
            ml: { sm: `0px`, backgroundColor: "#f7fafa", color: "black" },
          }}
        >
          <Toolbar style={{ paddingLeft: "50px", paddingRight: "50px" }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <PentagonIcon />
            <Typography
              style={{ lineHeight: "1" }}
              variant="h5"
              noWrap
              component="div"
            >
              {name}
            </Typography>
          </Toolbar>
          <Toolbar>
            <Typography
              style={{ lineHeight: "1", fontSize: "18px", fontWeight: "100" }}
              variant="h5"
              noWrap
              component="div"
            >
              counsoler in the organization
            </Typography>
            <button
              style={{
                backgroundColor: "#f5c754",
                borderRadius: "20px",
                padding: "5px 30px",
                marginLeft: "25px",
                fontWeight: "600",
              }}
              onClick={() => navigateHandler("organization/addcounsolers")}
            >
              Add Counsoler
            </button>

            <AccountCircleIcon
              style={{ fontSize: "40px", marginLeft: "25px" }}
            />
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
                backgroundColor: "pink", // Apply pink background color
                border: "none", // Remove border
              },
            }}
          >
            <Box
              sx={{
                color: "white",
                backgroundColor: "white",
                width: "80%",
                margin: "0px auto",
                marginTop: "50px",
                borderRadius: "20px",
                textAlign: "center",
              }}
            >
              this is me
            </Box>
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
                // Remove border
                border: "none",
                backgroundColor: "#f7fafa",
              },
            }}
            open
          >
            <Box
              sx={{
                marginTop: "118px",
                textAlign: "center",
                marginLeft: "50px",
              }}
            >
              <Box
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "left",
                  alignItems: "center",
                }}
              >
                <InsertEmoticonRoundedIcon style={{ fontSize: "60px" }} />
                <div style={{ textAlign: "left", marginLeft: "10px" }}>
                  <h2 style={{ color: "black", fontWeight: "700" }}>{name}</h2>
                  <h1 style={{ fontSize: "13px" }}>Counsoling Service</h1>
                </div>
              </Box>
            </Box>
            {drawer}
          </Drawer>
        </Box>
        <Box
          component="main"
          sx={{
            backgroundColor: "#f7fafa",
            height: "100vh",
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          <Toolbar />
          <Routes>
            <Route
              path="organization/counsolers"
              element={<CounsolerWindow />}
            />
            <Route
              path="organization/addcounsolers"
              element={<AddCounsoler />}
            />
          </Routes>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

OrganizationDashboard.propTypes = {
  window: PropTypes.func,
};

export default OrganizationDashboard;
