import { useState } from "react";
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import * as fabric from "fabric";
import { Box, Button, Typography, Container, Grid } from "@mui/material";
import "./TShirtDesigner.css";

export default function TShirtDesigner() {
  const { editor, onReady } = useFabricJSEditor();
  const [canvasSize] = useState({ width: 300, height: 300 });

  // Upload T-shirt Image (Background)
  const onUploadTShirt = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const objectURL = URL.createObjectURL(file);
    const image = await fabric.Image.fromURL(objectURL);

    // Scale the image to cover the canvas while maintaining aspect ratio
    const scaleX = canvasSize.width / image.width;
    const scaleY = canvasSize.height / image.height;
    const scale = Math.max(scaleX, scaleY); // Scale to cover

    image.set({
      selectable: false,
      evented: false,
      scaleX: scale,
      scaleY: scale,
    });

    editor.canvas.clear();
    editor.canvas.add(image);
  };

  // Upload & Add Logo
  const onUploadLogo = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const objectURL = URL.createObjectURL(file);
    const image = await fabric.Image.fromURL(objectURL);

    image.set({
      left: 50,
      top: 50,
      scaleX: 0.2,
      scaleY: 0.2,
      hasControls: true,
      hasBorders: true,
      selectable: true,
    });

    editor.canvas.add(image);
  };

  // Add Text to Canvas
  const addText = () => {
    const text = new fabric.Textbox("Your Text Here", {
      left: 50,
      top: 50,
      fontSize: 15,
      fill: "#000",
      fontFamily: "Arial",
      hasControls: true,
      editable: true,
    });

    editor.canvas.add(text);
  };

  // Export Final Design as Image
  const exportDesign = () => {
    if (!editor.canvas) return;

    // Increase canvas resolution
    const scaleFactor = 3; // Export at 3x resolution for better quality
    const originalWidth = editor.canvas.width;
    const originalHeight = editor.canvas.height;

    // Temporarily scale up
    editor.canvas.setDimensions({
      width: originalWidth * scaleFactor,
      height: originalHeight * scaleFactor,
    });

    editor.canvas.getObjects().forEach((obj) => {
      obj.scaleX *= scaleFactor;
      obj.scaleY *= scaleFactor;
      obj.left *= scaleFactor;
      obj.top *= scaleFactor;
      obj.setCoords();
    });

    // Render the high-resolution image
    const dataURL = editor.canvas.toDataURL({
      format: "png",
      quality: 1, // Maximum quality
      multiplier: scaleFactor, // Export at 3x resolution
    });

    // Reset canvas back to original size
    editor.canvas.setDimensions({
      width: originalWidth,
      height: originalHeight,
    });
    editor.canvas.getObjects().forEach((obj) => {
      obj.scaleX /= scaleFactor;
      obj.scaleY /= scaleFactor;
      obj.left /= scaleFactor;
      obj.top /= scaleFactor;
      obj.setCoords();
    });

    // Create a download link
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "TShirtDesign.png";
    link.click();
  };

  return (
    <Container maxWidth="md">
      <Box textAlign="center" mt={4}>
        <Typography variant="h4" gutterBottom>
          T-Shirt Designer
        </Typography>

        {/* Upload Buttons */}
        <Grid container spacing={2} justifyContent="center" mb={2}>
          <Grid item>
            <Button variant="contained" component="label">
              Upload T-Shirt
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={onUploadTShirt}
              />
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" component="label">
              Upload Logo
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={onUploadLogo}
              />
            </Button>
          </Grid>
        </Grid>

        {/* Add Text & Export Buttons */}
        <Grid container spacing={2} justifyContent="center" mb={2}>
          <Grid item>
            <Button variant="outlined" onClick={addText}>
              Add Text
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="secondary"
              onClick={exportDesign}
            >
              Download Design
            </Button>
          </Grid>
        </Grid>

        {/* Fabric.js Canvas */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 2,
          }}
        >
          <FabricJSCanvas className="canvas" onReady={onReady} />
        </Box>
      </Box>
    </Container>
  );
}
