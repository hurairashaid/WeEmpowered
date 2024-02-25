import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import CounsolerSelectionPanel from "../CounsolerSelectionPanel/CounsolerSelectionPanel";
import { ClassNames } from "@emotion/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { useParams } from "react-router-dom";
import Modal from "@mui/material/Modal";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import WheelchairPickupIcon from "@mui/icons-material/WheelchairPickup";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ChatRoundedIcon from "@mui/icons-material/ChatRounded";
import "./style.css";

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
const theme = createTheme({
  typography: {
    fontFamily: [
      "monospace", // Fallback to generic monospace if the above font isn't available.
    ].join(","),
  },
});
export default function VictimChat() {
  const [description, setDescription] = useState("");
  const [open, setOpen] = React.useState(false);
  const [chatId, setChatId] = useState();
  const [ws, setWs] = useState(null);
  const [organizationRecord, setOrganizationRecord] = useState([]);
  const [message, setMessage] = useState([]);
  const [newTextMessage, setNewTextMessage] = useState("");
  const uniqueId = sessionStorage.getItem("id");
  const name = sessionStorage.getItem("victim");

  const { id } = useParams();

  const handleOpen = (description) => {
    setDescription(description);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const getData = async () => {
    axios
      .post("http://localhost:2000/api/victim/organizationcounsoler", {
        id: id,
      })
      .then((response) => {
        setOrganizationRecord(response.data.response);
      });
  };

  const getMessage = async () => {
    axios
      .post("http://localhost:2000/api/victim//messagerecord", {
        firstId: uniqueId,
        secondId: chatId,
      })
      .then((response) => {
        setMessage(response.data);
      });
  };

  useEffect(() => {
    getData();
    getMessage();
  }, [chatId]);

  useEffect(() => {
    const uniqueId = sessionStorage.getItem("id");
    const ws = new WebSocket(
      `ws://localhost:2000?sessionID=${uniqueId}&name=${name}`
    );
    setWs(ws);
    ws.addEventListener("message", handleMessage);
  }, []);

  //   function showOnlinePeople(peopleArray) {
  //     const people = {};
  //     peopleArray.forEach(({ userId, userName }) => {
  //       people[userId] = userName;
  //     });
  //     setOnlinePeople(people);
  //   }
  console.log(message);
  function handleMessage(ev) {
    const messageData = JSON.parse(ev.data);
    // if ("online" in messageData) {
    //   showOnlinePeople(messageData.online);
    setMessage((perv) => [
      ...perv,
      {
        text: messageData.text,
        sender: messageData.sender,
        recipient: messageData.recipient,
        isOur: false,
      },
    ]);

    // }
  }

  function sendMessage(ev) {
    console.log("sending");
    ev.preventDefault();
    ws.send(
      JSON.stringify({
        message: {
          recipient: chatId,
          text: newTextMessage,
        },
      })
    );
    const uniqueId = sessionStorage.getItem("id");

    setMessage((perv) => [
      ...perv,
      {
        text: newTextMessage,
        sender: uniqueId,
        recipient: chatId,
        isOur: true,
      },
    ]);
    setNewTextMessage("");
    console.log(message);
  }
  return (
    <div
      className="flex v-screen"
      style={{ flexDirection: "column", backgroundColor: "#f7fafa" }}
    >
      <div style={{ padding: "20px 40px", borderBottom: "3px solid #d9d7d7" }}>
        <div style={{ display: "flex", alignItems: "end" }}>
          <WheelchairPickupIcon style={{ fontSize: "28px" }} />
          <h2
            style={{ fontSize: "19px", marginLeft: "10px", fontWeight: "750" }}
          >
            Victim Support Chat
          </h2>
        </div>
      </div>
      <div
        className="flex h-screen"
        style={{ backgroundColor: "#f7fafa", height: "88vh" }}
      >
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
              width: "40%",
            }}
            sx={style}
          >
            <Typography
              style={{ color: "#f5c754" }}
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
          className="bg-white w-1/4 flex flex-col"
          style={{
            paddingLeft: "40px",
            marginTop: "30px",
            backgroundColor: "#f7fafa",
          }}
        >
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
                  onClick={() => {
                    setChatId(e._id);
                  }}
                  sx={{
                    display: "flex",
                    justifyContent: "left",
                    alignItems: "center",
                    flexDirection: "row",
                    textAlign: "center",

                    borderRadius: "30px",
                    backgroundColor:
                      chatId === e._id
                        ? "rgb(227, 232, 242)"
                        : "rgb(247, 250, 250)",
                    color: chatId === e._id ? "black" : "black",
                    marginTop: "15px",

                    width: "100%",
                  }}
                >
                  <div>
                    <AccountCircleIcon style={{ fontSize: "3rem" }} />
                  </div>
                  <div
                    style={{
                      textAlign: "justify",
                      height: "30px",
                      marginLeft: "8px",
                    }}
                  >
                    <Typography
                      style={{
                        fontWeight: "300",
                        fontSize: "0.8rem",
                        lineHeight: "1",
                        letterSpacing: "0.008em",
                        textAlign: "left",
                      }}
                      variant="h6"
                    >
                      {e.counsoler}
                    </Typography>

                    <Button
                      style={{
                        backgroundColor:
                          chatId === e._id
                            ? "rgb(227, 232, 242)"
                            : "rgb(247, 250, 250)",
                        borderColor:
                          chatId === e._id
                            ? "rgb(227, 232, 242)"
                            : "rgb(247, 250, 250)",
                        color: "#ac915f",
                        width: "100%",
                        fontSize: "0.6rem",
                        width: "100%",
                        padding: "0px",
                        fontWeight: "300",
                      }}
                      variant="outlined"
                      onClick={() => handleOpen(e.description)}
                    >
                      view Description
                    </Button>
                  </div>
                  <ChatRoundedIcon
                    style={{ marginLeft: "auto", marginRight: "20px" }}
                  />
                </Box>
              );
            })}
          </div>
          {/* {Object.keys(onlinePeople).map((userId) => (
          <div>{onlinePeople[userId]}</div>
        ))} */}
          <div className="flex-grow"></div>
          <div className="p-2 text-center flex items-center justify-center">
            <span className="mr-2 text-sm text-gray-600 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4"
              >
                <path
                  fillRule="evenodd"
                  d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
            <button className="text-sm bg-blue-100 py-1 px-2 text-gray-500 border rounded-sm">
              logout
            </button>
          </div>
        </div>
        <div
          className="flex flex-col w-3/4 p-2"
          style={{ backgroundColor: "#f7fafa" }}
        >
          {!chatId && (
            <div style={{ margin: "auto" }}>
              please select counsoler to start chatting
            </div>
          )}
          {!!chatId && (
            <div
              className="scroll-container"
              style={{
                height: "90%",
                overflowY: "scroll",
                padding: "0px 20px",
              }}
            >
              {message.map((messages) => (
                <div
                  style={{
                    textAlign: "right",
                    float: "inlineEnd",
                    backgroundColor: "white",
                    borderRadius: "20px",
                    padding: "0px 15px",
                    width: "max-content",
                    marginBottom: "7px",
                    backgroundColor: "#f5c754",
                    marginLeft: messages.sender === uniqueId ? "auto" : "none",
                  }}
                >
                  {messages.text}
                </div>
              ))}
            </div>
          )}
          <div className="flex-grow"></div>
          <form className="flex gap-2" onSubmit={sendMessage}>
            <input
              value={newTextMessage}
              onChange={(ev) => setNewTextMessage(ev.target.value)}
              type="text"
              placeholder="Type your message here"
              className="bg-white flex-grow border rounded-sm p-2"
            />

            <button
              style={{ backgroundColor: "#f5c754" }}
              type="submit"
              className="bg-blue-500 p-2 text-white rounded-sm"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
