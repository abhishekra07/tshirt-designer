import React from "react";
import { Box, Button, Typography, IconButton, Grid } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import ImageIcon from "@mui/icons-material/Image";
import PaletteIcon from "@mui/icons-material/Palette";
import FormatColorTextIcon from "@mui/icons-material/FormatColorText";
import DownloadIcon from "@mui/icons-material/Download";
import ClearIcon from "@mui/icons-material/Clear";
import white from "../assets/white-front.png";
import { useState } from "react";
import DesignOptions from "./DesignOptions";

const TShirtDesignerUI = () => {
  const [selected, setSelected] = useState(white);

  return (
    <Box sx={{ display: "flex", backgroundColor: "#f5f5f5" }}>
      {/* Sidebar */}
      <Box
        sx={{ width: "70px", backgroundColor: "#1a1a1a", color: "#fff", p: 2 }}
      >
        <SidebarButton icon={<CloudUploadIcon />} text="Upload" />
        <SidebarButton icon={<TextFieldsIcon />} text="Add Text" />
        <SidebarButton icon={<ImageIcon />} text="Add Art" />
        <SidebarButton icon={<PaletteIcon />} text="Product Colors" />
        <SidebarButton icon={<FormatColorTextIcon />} text="Add Names" />
      </Box>

      {/* Main Content */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          p: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* Utility Buttons Area */}
        <Box
          sx={{
            backgroundColor: "#d6d3d3",
            color: "#fff",
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            mb: 1,
            position: "fixed",
            right: 0,
            bottom: 0,
            borderRadius: "15px",
            pl: 1,
            pr: 1,
          }}
        >
          <IconButton sx={{ color: "black" }}>
            <DownloadIcon />
          </IconButton>
          <IconButton sx={{ color: "red" }}>
            <ClearIcon />
          </IconButton>
        </Box>

        {/* Design Area */}
        <Grid container spacing={2}>
          {/* <Grid item xs={6}>
            <Box
              sx={{
                backgroundColor: "#fff",
                p: 3,
                borderRadius: 2,
                boxShadow: 1,
              }}
            >
              <Typography variant="h6">How do you want to start?</Typography>
              <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid item xs={6}>
                  <OptionButton icon={<CloudUploadIcon />} text="Upload" />
                </Grid>
                <Grid item xs={6}>
                  <OptionButton icon={<TextFieldsIcon />} text="Add Text" />
                </Grid>
                <Grid item xs={6}>
                  <OptionButton icon={<ImageIcon />} text="Add Art" />
                </Grid>
                <Grid item xs={6}>
                  <OptionButton
                    icon={<ShoppingCartIcon />}
                    text="Change Products"
                  />
                </Grid>
              </Grid>
            </Box>
          </Grid> */}

          <Grid item xs={12}>
            <Box
              sx={{
                width: "100%",
                height: "550px",
                backgroundColor: "#af7171",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 2,
                boxShadow: 1,
                p: 3,
              }}
            >
              <img
                src={selected} // Replace with T-shirt image
                alt="T-shirt"
                style={{ maxHeight: "100%", maxWidth: "100%" }}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Right Panel */}
      <DesignOptions onSelect={setSelected} />
      {/* <Box sx={{ width: "100px", p: 2 }}>
        <Button variant="outlined" fullWidth>
          Front
        </Button>
        <Button variant="outlined" fullWidth sx={{ mt: 1 }}>
          Back
        </Button>
        <Button variant="outlined" fullWidth sx={{ mt: 1 }}>
          Sleeve Design
        </Button>
      </Box> */}

      {/* Footer Bar */}
      {/* <Box
        sx={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          backgroundColor: "#fff",
          p: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: "0px -2px 5px rgba(0,0,0,0.1)",
        }}
      >
        <Button startIcon={<AddIcon />} variant="outlined">
          Add Products
        </Button>
        <Typography>Gildan Softstyle Jersey T-shirt</Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button startIcon={<SaveIcon />} variant="outlined">
            Save | Share
          </Button>
          <Button startIcon={<ShoppingCartIcon />} variant="contained">
            Get Price
          </Button>
        </Box>
      </Box> */}
    </Box>
  );
};

// Sidebar Button
const SidebarButton = ({ icon, text }) => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      my: 2,
    }}
  >
    <IconButton sx={{ color: "white" }}>{icon}</IconButton>
    <Typography variant="caption">{text}</Typography>
  </Box>
);

// Option Button (Inside Design Area)
const OptionButton = ({ icon, text }) => (
  <Button
    variant="outlined"
    fullWidth
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      p: 2,
    }}
  >
    {icon}
    <Typography variant="body2">{text}</Typography>
  </Button>
);

export default TShirtDesignerUI;
