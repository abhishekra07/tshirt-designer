import { useState, useCallback } from "react";
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import * as fabric from "fabric";
import Cropper from "react-easy-crop";
import getCroppedImg from "../utils/cropImageHelper.js"; // Helper to crop the image
import {
  Box,
  Button,
  Typography,
  Container,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  Tooltip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import "./TShirtDesigner.css";

export default function TShirtDesigner() {
  const { editor, onReady } = useFabricJSEditor();
  const [canvasSize] = useState({ width: 300, height: 300 });
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [isCropping, setIsCropping] = useState(false);

  // Get Cropped Image
  const onCropComplete = useCallback((_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  // Upload T-shirt Image (Background)
  const onUploadTShirt = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const objectURL = URL.createObjectURL(file);
    setImageSrc(objectURL);
    setIsCropping(true); // Open Cropper
  };

  // Apply Cropped Image to Canvas
  const applyCroppedImage = async () => {
    const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
    const image = await fabric.Image.fromURL(croppedImage);

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
    setIsCropping(false);
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

  // Clear the canvas
  const clearCanvas = () => {
    editor.canvas.clear();
  };

  return (
    <Container maxWidth="md">
      <Box textAlign="center" mt={4}>
        {/* Upload Buttons */}
        <Grid container spacing={2} justifyContent="center" mb={2}>
          <Grid item>
            <Tooltip
              title="Upload a t-shirt image to create your custom design!"
              arrow
            >
              <Button
                variant="contained"
                component="label"
                sx={{ textTransform: "none" }}
              >
                Upload T-Shirt
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={onUploadTShirt}
                />
              </Button>
            </Tooltip>
          </Grid>
          <Grid item>
            <Tooltip
              title="Click to upload a logo to embed on the t-shirt image."
              arrow
            >
              <Button
                variant="contained"
                component="label"
                sx={{ textTransform: "none" }}
              >
                Upload Logo
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={onUploadLogo}
                />
              </Button>
            </Tooltip>
          </Grid>
        </Grid>

        {/* Add Text & Export Buttons */}
        <Grid container spacing={2} justifyContent="center" mb={2}>
          <Grid item>
            <Button
              variant="outlined"
              onClick={addText}
              sx={{ textTransform: "none" }}
            >
              Add Text
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="secondary"
              onClick={exportDesign}
              sx={{ textTransform: "none" }}
            >
              Download Design
            </Button>
          </Grid>
        </Grid>

        <Grid container spacing={3} justifyContent="center" mb={2}>
          <Grid item>
            <Button
              variant="contained"
              color="error"
              onClick={clearCanvas}
              startIcon={<DeleteIcon />}
              sx={{ textTransform: "none" }}
            >
              Clear Canvas
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

          {/* Image Cropper Dialog */}
          <Dialog
            open={isCropping}
            onClose={() => setIsCropping(false)}
            fullWidth
          >
            <DialogContent style={{ height: 400 }}>
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={1} // Square crop
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setIsCropping(false)}>Cancel</Button>
              <Button
                variant="contained"
                color="primary"
                onClick={applyCroppedImage}
              >
                Apply Crop
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Box>
    </Container>
  );
}
