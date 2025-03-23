import React from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

const ModalBox = ({ open, onClose }) => {
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
              ADD TEXT
            </Typography>
          </Box>
          <IconButton size="small" onClick={onClose} sx={{ color: "white" }}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Body */}
        <Box sx={{ p: 2 }}>
          <TextField
            fullWidth
            placeholder="Enter some text"
            variant="outlined"
            sx={{
              bgcolor: "white",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#ccc",
                },
                "&:hover fieldset": {
                  borderColor: "#999",
                },
              },
            }}
          />

          <Button
            fullWidth
            variant="contained"
            sx={{
              bgcolor: "#28a745",
              color: "white",
              textTransform: "none",
              fontWeight: "bold",
              mt: 2,
              "&:hover": {
                bgcolor: "#218838",
              },
            }}
          >
            ADD TEXT
          </Button>
        </Box>

        {/* Divider */}
        <Box sx={{ borderBottom: "1px solid #ddd", mt: 2 }} />
      </Box>
    </Modal>
  );
};

export default ModalBox;
