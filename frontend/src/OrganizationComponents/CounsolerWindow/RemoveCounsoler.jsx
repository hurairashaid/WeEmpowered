import Modal from "@mui/material/Modal";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import axios from "axios";
import CheckIcon from "@mui/icons-material/Check";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  display: "flex",
  transform: "translate(-50%, -50%)",
  width: 900,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const RemoveCounsoler = ({ handleClose, data, retrieveData }) => {
  const organizationId = sessionStorage.getItem("id");

  const removeVolunteer = () => {
    console.log(data);
    axios
      .post("http://localhost:2000/api/organization/removevolunteer", {
        id: data,
        organizationID: organizationId,
      })
      .then((response) => {
        console.log(response);
        retrieveData();
      })
      .catch((error) => {
        console.error("Error removing volunteer:", error);
      })
      .finally(() => {
        handleClose(); // Close the modal after the action is completed or failed
      });
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={style}
          style={{
            width: "30%",
            border: "none",
            borderRadius: "30px",
            flexDirection: "column",
            padding: "0px",
          }}
        >
          <Box
            style={{
              alignItems: "center",
              justifyContent: "flex-start",
            }}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
              textAlign: "center",
              padding: "20px",
              borderRadius: "30px",

              background: "#f7fafa",

              color: "black",
              height: "100%",
            }}
          >
            <CheckIcon style={{ fontSize: "5rem" }} />
            <Typography
              style={{
                fontWeight: "400",
                fontSize: "1rem",
                lineHeight: "1.45",
                letterSpacing: "0.008em",
                textAlign: "center",
                marginBottom: "20px",
              }}
              variant="h4"
            >
              Are you sure you want to remove this volunteer from your
              organization? <br></br> Once removed, you cannot revert this
              action.
            </Typography>
            <Button
              style={{
                backgroundColor: "rgb(227, 232, 242)",
                borderColor: "white",
                color: "#312e2e",
                fontSize: "14px",
                width: "30%",
                borderRadius: "20px",
                fontWeight: "800",
              }}
              variant="outlined"
              onClick={() => removeVolunteer()}
            >
              Confirmed
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default RemoveCounsoler;
