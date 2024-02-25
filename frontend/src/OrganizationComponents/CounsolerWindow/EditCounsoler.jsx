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
import { useState } from "react";

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

const organization = sessionStorage.getItem("id");
export default function EditCounsoler({
  handleCloseResolved,
  data,
  retrieveData,
}) {
  const [description, setDescription] = useState(data[1]);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formFetchedData = new FormData(event.currentTarget);
    const formData = {
      description: formFetchedData.get("description"),
      organizationID: organization,
      id: data[0],
    };
    try {
      const dataResponse = await axios.post(
        "http://localhost:2000/api/organization/editvolunteer",
        formData
      );
      handleCloseResolved();
      retrieveData();
    } catch (error) {
      console.log(error);
    }
  };
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleCloseResolved}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={style}
          style={{
            width: "40%",
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
              height: "100%",
            }}
          >
            <Typography
              style={{
                fontWeight: "600",
                fontSize: "1.5rem",
                lineHeight: "1.45",
                letterSpacing: "0.008em",
                textAlign: "center",
                marginBottom: "20px",
              }}
              variant="h4"
            >
              {data[2]}
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
              style={{ width: "100%" }}
            >
              <TextField
                onChange={handleDescriptionChange}
                multiline
                value={description}
                rows={10}
                fullWidth
                label="Editable Description"
                id="fullWidth"
                style={{ backgroundColor: "white" }}
                name="description"
              />
              <Button
                type="submit"
                style={{
                  backgroundColor: "rgb(227, 232, 242)",
                  borderColor: "white",
                  color: "#312e2e",
                  fontSize: "14px",
                  width: "60%",
                  borderRadius: "20px",
                  fontWeight: "800",
                  marginTop: "20px",
                }}
                variant="outlined"
              >
                Edit Description
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
