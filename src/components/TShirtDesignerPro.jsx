import React, { useEffect, useRef, useState } from "react";
import * as fabric from "fabric";
import {
  Box,
  Button,
  IconButton,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import {
  ColorLens,
  FlipCameraAndroid,
  Delete,
  Download,
} from "@mui/icons-material";

const TShirtDesignerPro = () => {
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);
  const [shirtSide, setShirtSide] = useState("front");
  const [shirtColor, setShirtColor] = useState("#FFFFFF");

  useEffect(() => {
    const fabricCanvas = new fabric.Canvas(canvasRef.current, {
      width: 400,
      height: 500,
      backgroundColor: shirtColor,
    });
    setCanvas(fabricCanvas);

    return () => fabricCanvas.dispose();
  }, [shirtColor]);

  // Switch T-shirt side
  const toggleShirtSide = () => {
    setShirtSide(shirtSide === "front" ? "back" : "front");
  };

  // Clear Canvas
  const clearCanvas = () => {
    canvas.clear();
    canvas.setBackgroundColor(shirtColor, canvas.renderAll.bind(canvas));
  };

  // Download Design
  const downloadDesign = () => {
    const dataURL = canvas.toDataURL({ format: "png", quality: 1 });
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "tshirt_design.png";
    link.click();
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
      }}
    >
      {/* T-shirt Preview & Controls */}
      <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
        <Typography variant="h6">T-Shirt Designer</Typography>
        <IconButton onClick={toggleShirtSide}>
          <FlipCameraAndroid />
        </IconButton>
        <Select
          value={shirtColor}
          onChange={(e) => setShirtColor(e.target.value)}
        >
          <MenuItem value="#FFFFFF">
            <ColorLens /> White
          </MenuItem>
          <MenuItem value="#000000">
            <ColorLens /> Black
          </MenuItem>
          <MenuItem value="#FF0000">
            <ColorLens /> Red
          </MenuItem>
          <MenuItem value="#0000FF">
            <ColorLens /> Blue
          </MenuItem>
        </Select>
      </Box>

      {/* T-shirt Canvas */}
      <Box sx={{ border: "1px solid #ddd", width: "400px", height: "500px" }}>
        <canvas ref={canvasRef} />
      </Box>

      {/* Controls */}
      <Box sx={{ display: "flex", gap: 2 }}>
        <Button
          variant="contained"
          startIcon={<Delete />}
          onClick={clearCanvas}
        >
          Clear
        </Button>
        <Button
          variant="contained"
          startIcon={<Download />}
          onClick={downloadDesign}
        >
          Download
        </Button>
      </Box>
    </Box>
  );
};

export default TShirtDesignerPro;
