import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import PersonIcon from "@mui/icons-material/Person";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import EditCounsoler from "./EditCounsoler";
import "./style.css";

import RemoveCounsoler from "./RemoveCounsoler";
const theme = createTheme({
  typography: {
    fontFamily: "monospace", // Specify your desired font-family here
  },
});
export default function CounsolerWindow() {
  const [counsolers, setCounsolers] = useState([]);
  const [open, setOpen] = useState(false);
  const [editedCounsoler, setEditedCounsoler] = useState(false);
  const [editedCounsolerDetail, setEditedCounsolerDetail] = useState([]);
  const [removeCounsoler, setRemoveCounsoler] = useState("a");
  const [render, setRender] = useState(true);
  const organizationId = sessionStorage.getItem("id");
  const organizationName = sessionStorage.getItem("name");
  const organizationDescription = sessionStorage.getItem("description");
  const retrieveData = () => {
    if (render == true) {
      setRender(false);
    } else {
      setRender(true);
    }
  };
  const handleOpen = (id) => {
    setOpen(true);
    setRemoveCounsoler(id);
    console.log(removeCounsoler);
  };
  const handleClose = () => setOpen(false);
  const handleOpenResolved = (id, description, counsoler) => {
    console.log("a");
    setEditedCounsoler(true);
    setEditedCounsolerDetail([id, description, counsoler]);
  };
  const handleCloseResolved = () => {
    console.log("b");
    setEditedCounsoler(false);
  };
  const getData = async () => {
    axios
      .post("http://localhost:2000/api/organization/organizationvolunteer", {
        id: organizationId,
      })
      .then((response) => {
        setCounsolers(response.data.response);
      });
  };
  console.log(counsolers);

  useEffect(() => {
    getData();
  }, [render]);
  return (
    <>
      <ThemeProvider theme={theme} >
        <Box>
          {open && (
            <RemoveCounsoler
              data={removeCounsoler}
              handleClose={handleClose}
              retrieveData={retrieveData}
            />
          )}
          {editedCounsoler && (
            <EditCounsoler
              data={editedCounsolerDetail}
              handleCloseResolved={handleCloseResolved}
              retrieveData={retrieveData}
            />
          )}

          <div style={{ display: "flex" }}>
            {counsolers
              ?.filter((counsolers) => counsolers.status === "ACTIVE")
              .map((e, i) => {
                return (
                  <Box
                    key={i}
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      p: 1,
                      m: 1,
                      width: 300,

                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column",
                      boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                      textAlign: "center",
                      padding: "20px",
                      borderRadius: "30px",
                      background: "#f7fafa",
                      color: "black",
                      mt: 5,
                      boxShadow: "-1px 2px 29px 3px rgba(66,66,66,0.75)",
                      webkitBoxShadow: "-1px 2px 29px 3px rgba(66,66,66,0.75)",
                      mozBoxShadow: "-1px 2px 29px 3px rgba(66,66,66,0.75)",
                    }}
                  >
                    <PersonIcon style={{ fontSize: "8rem" }} />

                    <Typography
                      style={{
                        fontWeight: "600",
                        fontSize: "1.2rem",
                        lineHeight: "1.45",
                        letterSpacing: "0.008em",
                        textAlign: "center",
                      }}
                      variant="h6"
                    >
                      {e?.counsoler}
                    </Typography>

                    <Typography
                      className="scroll-container"
                      style={{
                        fontWeight: "00",
                        fontSize: "1rem",
                        lineHeight: "1.45",
                        letterSpacing: "0.008em",
                        textAlign: "center",
                        height: "30vh",
                        overflowY: "Scroll",
                        marginBottom: "15px",
                      }}
                      variant="h6"
                    >
                      {e?.description}
                    </Typography>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                        marginTop: "20px",
                      }}
                    >
                      <Button
                        onClick={() =>
                          handleOpenResolved(
                            e?._id,
                            e?.description,
                            e?.counsoler
                          )
                        }
                        style={{
                          backgroundColor: "#e3e8f2",
                          borderColor: "white",
                          color: "#312e2e",
                          fontSize: "14px",
                          width: "30%",
                          borderRadius: "20px",
                          fontWeight: "800",
                        }}
                        variant="outlined"
                      >
                        edit
                      </Button>
                      <Button
                        onClick={() => handleOpen(e?._id)}
                        style={{
                          backgroundColor: "#e3e8f2",
                          borderColor: "white",
                          color: "#312e2e",
                          fontSize: "14px",
                          width: "60%",
                          borderRadius: "20px",
                          fontWeight: "800",
                        }}
                        variant="outlined"
                      >
                        Remove
                      </Button>
                    </div>
                  </Box>
                );
              })}
          </div>
        </Box>
      </ThemeProvider>
    </>
  );
}
