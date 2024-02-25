import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import PersonIcon from "@mui/icons-material/Person";

export default function AddCounsoler() {
  const [counsolers, setCounsolers] = useState([]);
  const [open, setOpen] = useState(false);
  const [viewResolvedIssue, setViewResolvedIssue] = useState(false);
  const [removeCounsoler, setRemoveCounsoler] = useState("a");
  const [render, setRender] = useState(true);
  const organizationId = sessionStorage.getItem("id");

  const addToOrganization = async (counsolerIdentity) => {
    try {
      const response = await axios.post(
        "http://localhost:2000/api/organization/allowvolunteer",
        {
          organizationID: organizationId,
          id: counsolerIdentity,
        }
      );
      console.log(response);
      retrieveData();
    } catch (error) {
      console.error("Error removing volunteer:", error);
    }
  };

  const retrieveData = () => {
    if (render == true) {
      setRender(false);
    } else {
      setRender(true);
    }
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

  useEffect(() => {
    getData();
  }, [render]);
  console.log(counsolers.length === 0);
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      {counsolers.length === 0 ? (
        <div>No counsoler in a line to add in organization</div>
      ) : (
        <>
          {counsolers
            ?.filter((counsolers) => counsolers.status === "DEACTIVE")
            .map((e, i) => (
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
                    onClick={() => addToOrganization(e?._id)}
                    style={{
                      backgroundColor: "#e3e8f2",
                      borderColor: "white",
                      color: "#312e2e",
                      fontSize: "14px",
                      width: "100%",
                      borderRadius: "20px",
                      fontWeight: "800",
                    }}
                    variant="outlined"
                  >
                    ADD COUNSOLER
                  </Button>
                </div>
              </Box>
            ))}
        </>
      )}
    </div>
  );
}
