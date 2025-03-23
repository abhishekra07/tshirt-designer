import React, { useState } from "react";
import { Box, Button, IconButton, Tooltip, TextField } from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import PaletteIcon from "@mui/icons-material/Palette";
import whiteShirt from "../assets/white-front.png";
import blackShirt from "../assets/black-front.png";
import DownloadIcon from "@mui/icons-material/Download";
import LayersIcon from "@mui/icons-material/Layers";
import UploadIcon from "@mui/icons-material/Upload";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";

import ModalBox from "./ModalBox";
import ImageUploadModal from "./ImageUploadModal";

const TShirtEditor = () => {
  const [tshirtImage, setTshirtImage] = useState(whiteShirt);
  const [openTextModal, setOpenTextModal] = useState(false);
  const [openImageModal, setOpenImageModal] = useState(false);

  const handleOpenModal = (type) => {
    if (type === "text") {
      setOpenTextModal(true);
    } else if (type === "image") {
      setOpenImageModal(true);
    }
  };

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f0f0f0",
      }}
    >
      {/* Centered Editor Box */}
      <Box
        sx={{
          width: "90vw", // Responsive width
          maxWidth: "900px", // Limit max width
          height: "90vh", // Fit within viewport height
          maxHeight: "600px", // Prevent excessive height
          backgroundColor: "#fff",
          borderRadius: "12px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
          overflow: "hidden",
          padding: "10px",
        }}
      >
        {/* Top Toolbar */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            bgcolor: "black",
            p: 1,
            borderRadius: "6px",
          }}
        >
          <Button
            sx={{ color: "white", fontSize: "12px" }}
            startIcon={<AddPhotoAlternateIcon />}
            onClick={() => handleOpenModal("image")}
          >
            ADD IMAGE
          </Button>
          <Button
            sx={{ color: "white", fontSize: "12px" }}
            startIcon={<TextFieldsIcon />}
            onClick={() => handleOpenModal("text")}
          >
            ADD TEXT
          </Button>
          <Button
            sx={{ color: "white", fontSize: "12px" }}
            startIcon={<PaletteIcon />}
          >
            CHOOSE DESIGN
          </Button>
        </Box>

        {/* Modal Box for Text */}
        <ModalBox
          open={openTextModal}
          onClose={() => setOpenTextModal(false)}
        />
        <ImageUploadModal
          open={openImageModal}
          onClose={() => setOpenImageModal(false)}
        />

        {/* Main Content - T-Shirt Editor */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
            width: "100%",
          }}
        >
          {/* Left Sidebar (Closer to Image) */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              marginRight: "10px",
            }}
          >
            <Tooltip title="Layers" arrow placement="right">
              <IconButton sx={{ bgcolor: "#f5f5f5" }}>
                <LayersIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Upload" arrow placement="right">
              <IconButton sx={{ bgcolor: "#f5f5f5" }}>
                <UploadIcon />
              </IconButton>
            </Tooltip>
          </Box>

          {/* T-Shirt Display Area */}
          <Box
            sx={{
              position: "relative",
              width: "260px",
              height: "360px",
              backgroundColor: "#f5f5f5",
              borderRadius: "8px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              overflow: "hidden",
              boxShadow: "inset 0px 4px 8px rgba(0,0,0,0.1)",
            }}
          >
            <img
              src={tshirtImage}
              alt="T-Shirt"
              style={{ width: "100%", objectFit: "contain" }}
            />
          </Box>

          {/* Right Sidebar (Closer to Image) */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              marginLeft: "10px",
            }}
          >
            <Tooltip title="Zoom In" arrow placement="left">
              <IconButton sx={{ bgcolor: "#f5f5f5" }}>
                <ZoomInIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Zoom Out" arrow placement="left">
              <IconButton sx={{ bgcolor: "#f5f5f5" }}>
                <ZoomOutIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        {/* Bottom Toolbar */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: "8px",
            width: "100%",
          }}
        >
          <Tooltip title="Undo" arrow>
            <IconButton sx={{ bgcolor: "#f5f5f5" }}>
              <UndoIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Redo" arrow>
            <IconButton sx={{ bgcolor: "#f5f5f5" }}>
              <RedoIcon />
            </IconButton>
          </Tooltip>
        </Box>

        {/* T-Shirt Selection & Download */}
        <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
          <img
            src={whiteShirt}
            alt="White T-Shirt"
            style={{
              width: "40px",
              cursor: "pointer",
              border: tshirtImage === whiteShirt ? "2px solid blue" : "none",
              borderRadius: "4px",
            }}
            onClick={() => setTshirtImage(whiteShirt)}
          />
          <img
            src={blackShirt}
            alt="Black T-Shirt"
            style={{
              width: "40px",
              cursor: "pointer",
              border: tshirtImage === blackShirt ? "2px solid blue" : "none",
              borderRadius: "4px",
            }}
            onClick={() => setTshirtImage(blackShirt)}
          />
        </Box>

        {/* Download Button */}
        <Tooltip title="Download Image" arrow placement="right">
          <IconButton sx={{ color: "white", mt: 2, bgcolor: "black" }}>
            <DownloadIcon sx={{ fontSize: "32px" }} />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default TShirtEditor;
