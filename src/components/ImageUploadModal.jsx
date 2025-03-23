import React, { useState } from "react";
import { Modal, Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const ImageUploadModal = ({ open, onClose }) => {
  const [image, setImage] = useState(null);

  // Handle Image Upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  // Handle Remove Image
  const removeImage = () => {
    setImage(null);
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="modal-title">
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 350,
          bgcolor: "white",
          boxShadow: 24,
          borderRadius: 1,
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            bgcolor: "black",
            color: "white",
            px: 2,
            py: 1,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <DragIndicatorIcon fontSize="small" />
            <Typography variant="body1" fontWeight="bold">
              ADD IMAGE
            </Typography>
          </Box>
          <IconButton size="small" onClick={onClose} sx={{ color: "white" }}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Drag & Drop Box */}
        <Box
          sx={{
            border: "2px dashed #ccc",
            borderRadius: 1,
            textAlign: "center",
            py: 4,
            mx: 2,
            mt: 2,
            position: "relative",
          }}
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              opacity: 0,
              cursor: "pointer",
            }}
          />
          <CloudUploadIcon sx={{ fontSize: 32, color: "#777" }} />
          <Typography variant="body2" color="textSecondary">
            CLICK OR DROP IMAGES HERE
          </Typography>
        </Box>

        {/* Image Preview */}
        {image && (
          <Box
            sx={{
              position: "relative",
              display: "flex",
              justifyContent: "center",
              mt: 2,
            }}
          >
            <IconButton
              size="small"
              onClick={removeImage}
              sx={{
                position: "absolute",
                top: -10,
                left: "10%",
                background: "white",
                border: "1px solid #ccc",
                "&:hover": { background: "#f5f5f5" },
              }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
            <img
              src={image}
              alt="Uploaded"
              style={{
                width: "100px",
                height: "100px",
                objectFit: "contain",
              }}
            />
          </Box>
        )}

        {/* Bottom Spacing */}
        <Box sx={{ height: 20 }} />
      </Box>
    </Modal>
  );
};

export default ImageUploadModal;
