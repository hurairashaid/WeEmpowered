import React from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import PersonIcon from "@mui/icons-material/Person";
import WheelchairPickupIcon from "@mui/icons-material/WheelchairPickup";

export default function VictimPanel() {
  const [organizationRecord, setOrganizationRecord] = useState([]);
  const getData = async () => {
    axios
      .post("http://localhost:2000/api/organization/allorganization")
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
      <div
        style={{
          padding: "20px 40px",
          borderBottom: "3px solid #d9d7d7",
          backgroundColor: "rgb(247, 250, 250)",
        }}
      >
        <div style={{ display: "flex", alignItems: "end" }}>
          <WheelchairPickupIcon style={{ fontSize: "28px" }} />
          <h2
            style={{
              fontSize: "19px",
              marginLeft: "10px",
              fontWeight: "750",
            }}
          >
            Victim Support Organization
          </h2>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "left",
          flexDirection: "row",
          padding: "0px 40px",
          backgroundColor: "rgb(247, 250, 250)",
          height: "88vh",
        }}
      >
        {organizationRecord.map((e, i) => {
          return (
            <Link
              key={i}
              to={`/victimchat/${e._id}`}
              // Define the path for redirection
              style={{
                textDecoration: "none",
                color: "inherit",
                marginRight: "20px",
                width: "25%",
              }} // Optional: Style the link
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                  boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                  textAlign: "center",
                  padding: "20px",
                  borderRadius: "30px",

                  mt: 5,
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  backgroundColor: "#f5c754",
                  color: "black",
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
                    {e.name}
                  </Typography>
                </div>
              </Box>
            </Link>
          );
        })}
      </div>
    </>
  );
}
