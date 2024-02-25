import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { useParams } from "react-router-dom";
import Modal from "@mui/material/Modal";

import { createTheme, ThemeProvider } from "@mui/material/styles";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const defaultTheme = createTheme();
export default function CounsolerSelectionPanel(props) {
  // useEffect(() => {
  //   const uniqueId = sessionStorage.getItem("id");
  //   const name = sessionStorage.getItem("name");
    
  //   console.log(name);
  //   const ws = new WebSocket(
  //     `ws://localhost:2000?sessionID=${uniqueId}&name=${name}`
  //   );
  //   setWs(ws);
  //   ws.addEventListener("message", handleMessage);
  // }, []);
  const [description, setDescription] = useState("");

  const [open, setOpen] = React.useState(false);
  const handleOpen = (description) => {
    setDescription(description);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const { id } = useParams();
  console.log(id);
  const [organizationRecord, setOrganizationRecord] = useState([]);
  const getData = async () => {
    axios
      .post("http://localhost:2000/api/victim/organizationcounsoler", {
        id: id,
      })
      .then((response) => {
        setOrganizationRecord(response.data.response);
      });
  };

  useEffect(() => {
    getData();
  }, []);
  console.log(organizationRecord);
  const navigate = useNavigate();

  const name = sessionStorage.getItem("name");
  console.log(name);

  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            style={{
              border: "none",
              borderRadius: "20px",
              textAlign: "center",
              width: "90%",
            }}
            sx={style}
          >
            <Typography
              style={{ color: "green" }}
              id="modal-modal-title"
              variant="h6"
              component="h2"
            >
              Description of Volutneer
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {description}
            </Typography>
          </Box>
        </Modal>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        ></div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {organizationRecord.map((e, i) => {
            return (
              <Box
                key={i}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                  boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                  textAlign: "center",
                  padding: "20px",
                  borderRadius: "30px",
                  backgroundColor: "#e095e1",
                  color: "white",
                  mt: 5,
                  width: "90%",
                }}
              >
                <div>
                  <PersonIcon style={{ fontSize: "8rem" }} />
                </div>
                <div>
                  <Typography
                    style={{
                      fontWeight: "600",
                      fontSize: "1rem",
                      lineHeight: "1.45",
                      letterSpacing: "0.008em",
                      textAlign: "center",
                    }}
                    variant="h6"
                  >
                    {e.counsoler}
                  </Typography>
                  <Typography
                    style={{
                      fontWeight: "600",
                      fontSize: "1rem",
                      lineHeight: "1.45",
                      letterSpacing: "0.008em",
                      textAlign: "center",
                    }}
                    variant="h6"
                  >
                    20 Dealing Victim
                  </Typography>
                  <Button
                    style={{
                      backgroundColor: "white",
                      borderColor: "white",
                      color: "#312e2e",
                      fontSize: "14px",
                      width: "100%",
                      borderRadius: "20px",
                      fontWeight: "800",
                      fontSize: "0.5rem",
                      marginTop: "20px",
                    }}
                    variant="outlined"
                    onClick={() => handleOpen(e.description)}
                  >
                    view Description
                  </Button>
                </div>
              </Box>
            );
          })}
        </div>
      </ThemeProvider>
    </>
  );
}
