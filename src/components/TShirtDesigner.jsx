import { useState, useCallback } from 'react';
import { FabricJSCanvas, useFabricJSEditor } from 'fabricjs-react';
import * as fabric from 'fabric';
import {
  Box,
  Button,
  Typography,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  Tooltip,
  Menu,
  MenuItem,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import ImageIcon from '@mui/icons-material/Image';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import Cropper from 'react-easy-crop';
import getCroppedImg from '../utils/cropImageHelper.js'; // Helper for cropping images
import './TShirtDesigner.css';
import { useEffect } from 'react';
import TextEditorToolbar from './TextEditorToolbar';

export default function TShirtDesigner() {
  // Initialize Fabric.js editor
  const { editor, onReady } = useFabricJSEditor();

  // Canvas Size
  const [canvasSize] = useState({ width: 500, height: 500 });

  // Image Upload State
  const [imageSrc, setImageSrc] = useState(null);

  // Cropping State
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [isCropping, setIsCropping] = useState(false);

  // casvas state
  const [selectedObject, setSelectedObject] = useState(null);

  // Image quality
  const [quality, setQuality] = useState(1);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  // Detect when an object is selected
  useEffect(() => {
    if (!editor?.canvas) return;

    const deleteSelectedObject = () => {
      if (selectedObject) {
        editor.canvas.remove(selectedObject);
        editor.canvas.discardActiveObject();
        editor.canvas.renderAll();
        setSelectedObject(null);
      }
    };

    const handleSelection = (event) => {
      const activeObject = event.selected?.[0];
      document.activeElement.blur(); // Remove focus from other elements
      if (activeObject && activeObject.type !== 'textbox') {
        console.log('handleSelection event.selected ', activeObject);
        setSelectedObject(activeObject); // Set the selected object
      }
    };

    const handleDeselection = () => {
      setSelectedObject(null); // Clear selection when clicking outside
    };

    editor.canvas.on('selection:created', handleSelection);
    editor.canvas.on('selection:updated', handleSelection);
    editor.canvas.on('selection:cleared', handleDeselection);

    const handleKeyDown = (event) => {
      if (event.key === 'Delete' && selectedObject) {
        deleteSelectedObject();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      editor.canvas.off('selection:created', handleSelection);
      editor.canvas.off('selection:updated', handleSelection);
      editor.canvas.off('selection:cleared', handleDeselection);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [editor?.canvas, selectedObject]);

  // Open menu when clicking the button
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Handle quality selection and trigger export
  const handleSelect = (selectedQuality) => {
    setQuality(selectedQuality);
    setAnchorEl(null); // Close menu
    exportDesign(selectedQuality); // Call export function with quality
  };

  /**
   * Handles cropping completion
   * @param {Object} _ Unused parameter
   * @param {Object} croppedAreaPixels The selected area to crop
   */
  const onCropComplete = useCallback((_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  /**
   * Uploads a T-shirt background image and opens the cropper
   * @param {Event} event File input change event
   */
  const onUploadTShirt = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const objectURL = URL.createObjectURL(file);
    setImageSrc(objectURL);
    setIsCropping(true);
  };

  /**
   * Handles zoom adjustments for the image cropping tool.
   *
   * This function modifies the zoom level based on the provided `newZoom` value.
   * It ensures that the zoom level stays within a defined range (0.5 to 3) to prevent excessive zooming in or out.
   *
   * @param {number} newZoom - The new zoom level requested.
   *
   * How it works:
   * - A `zoomFactor` of 0.1 is used to incrementally adjust the zoom.
   * - If the new zoom level is greater than the previous zoom level, it zooms in.
   * - If the new zoom level is smaller, it zooms out.
   * - The updated zoom level is clamped between 0.5 (minimum zoom) and 3 (maximum zoom).
   */
  const handleZoomChange = (newZoom) => {
    const zoomFactor = 0.1; // Controls zoom intensity
    setZoom((prevZoom) => {
      let updatedZoom =
        prevZoom + (newZoom > prevZoom ? zoomFactor : -zoomFactor);
      return Math.max(0.5, Math.min(updatedZoom, 3)); // Keep zoom within limits
    });
  };

  /**
   * Applies the cropped image to the canvas as a background
   */
  const applyCroppedImage = async () => {
    if (!croppedAreaPixels || !imageSrc) return;

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
    editor.canvas.renderAll();
    setIsCropping(false);
  };

  /**
   * Uploads and adds a logo to the canvas with automatic resizing and centering.
   *
   * This function ensures that the uploaded logo:
   * - Is resized to fit within a reasonable size, even if the original is very large.
   * - Maintains its aspect ratio while resizing.
   * - Is automatically positioned at the center of the canvas.
   * - Remains fully movable and resizable by the user.
   *
   * @param {Event} event - File input change event.
   */
  const onUploadLogo = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const objectURL = URL.createObjectURL(file);
    const image = await fabric.Image.fromURL(objectURL);

    const canvas = editor.canvas;
    const maxWidth = canvas.width * 0.3; // Logo should not exceed 30% of the canvas width
    const maxHeight = canvas.height * 0.3; // Logo should not exceed 30% of the canvas height

    // Calculate scaling while maintaining aspect ratio
    const scaleFactor = Math.min(
      maxWidth / image.width,
      maxHeight / image.height,
    );

    image.set({
      left: (canvas.width - image.width * scaleFactor) / 2, // Center horizontally
      top: (canvas.height - image.height * scaleFactor) / 2, // Center vertically
      scaleX: scaleFactor,
      scaleY: scaleFactor,
      hasControls: true,
      hasBorders: true,
      selectable: true,
    });

    editor.canvas.add(image);
    canvas.renderAll();
  };

  /**
   * Adds a customizable text box to the canvas
   */
  const addText = () => {
    const text = new fabric.Textbox('Your Text Here', {
      left: editor.canvas.width / 2, // Center X
      top: editor.canvas.height / 2, // Center Y
      fontSize: 12,
      fill: '#000',
      fontFamily: 'Arial',
      hasControls: true,
      editable: true,
      textAlign: 'center', // Align text to center
      originX: 'center', // Ensure object positioning is centered
      originY: 'center',
    });

    editor.canvas.add(text);
    editor.canvas.setActiveObject(text); // Optionally select the text after adding
    editor.canvas.renderAll();
  };

  /**
   * Exports the final design as a high-resolution PNG file
   */
  const exportDesign = () => {
    if (!editor.canvas) return;

    // Get selected quality (1x, 2x, 3x)
    console.log(' quality ', quality);
    const scaleFactor = parseInt(quality, 10);

    const originalWidth = editor.canvas.width;
    const originalHeight = editor.canvas.height;

    // Scale up for high resolution
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

    // Export as PNG
    const dataURL = editor.canvas.toDataURL({
      format: 'png',
      quality: 1,
      multiplier: scaleFactor,
    });

    // Restore original size
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

    // Download Image
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'TShirtDesign.png';
    link.click();
  };

  /**
   * Clears the canvas
   */
  const clearCanvas = () => {
    editor.canvas.clear();
  };

  return (
    <>
      <Box display="flex" height="100vh" sx={{ position: 'relative' }}>
        {/* Sidebar for Actions */}
        <Box
          sx={{
            width: '100px',
            background: '#1a1a1a',
            padding: '10px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '5px',
          }}
        >
          <Typography variant="h5" gutterBottom sx={{ color: 'white' }}>
            Tools
          </Typography>

          <Tooltip
            title="Upload a image to create your custom design!"
            arrow
            placement="right"
          >
            <IconButton component="label" sx={{ color: 'white' }}>
              <CloudUploadIcon sx={{ fontSize: '40px' }} />
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={onUploadTShirt}
              />
            </IconButton>
          </Tooltip>

          <Tooltip
            title="Click to upload a logo to embed on the t-shirt image."
            arrow
            placement="right"
          >
            <IconButton component="label" sx={{ color: 'white' }}>
              <ImageIcon sx={{ fontSize: '40px' }} />
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={onUploadLogo}
              />
            </IconButton>
          </Tooltip>

          <Tooltip title="Add Text" arrow placement="right">
            <IconButton sx={{ color: 'white' }} onClick={addText}>
              <TextFieldsIcon sx={{ fontSize: '40px' }} />
            </IconButton>
          </Tooltip>

          <Tooltip title="Download Image" arrow placement="right">
            <IconButton sx={{ color: 'white' }} onClick={handleClick}>
              <DownloadIcon sx={{ fontSize: '40px' }} />
            </IconButton>
          </Tooltip>

          {/* Dropdown Menu */}
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={() => setAnchorEl(null)}
          >
            <MenuItem onClick={() => handleSelect(1)}>Low Quality</MenuItem>
            <MenuItem onClick={() => handleSelect(2)}>Medium Quality</MenuItem>
            <MenuItem onClick={() => handleSelect(3)}>High Quality</MenuItem>
          </Menu>

          <Tooltip title="Clear Canvas" arrow placement="right">
            <IconButton sx={{ color: 'white' }} onClick={clearCanvas}>
              <DeleteSweepIcon sx={{ fontSize: '40px' }} />
            </IconButton>
          </Tooltip>
        </Box>

        {/* Canvas */}
        <Box
          sx={{
            flexGrow: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'start',
            background: '#e3e3e3',
          }}
        >
          <FabricJSCanvas className="canvas" onReady={onReady} />

          {editor && <TextEditorToolbar canvas={editor.canvas} />}

          {/* Image Cropper Dialog */}
          <Dialog
            open={isCropping}
            onClose={() => setIsCropping(false)}
            fullWidth
          >
            <DialogContent style={{ height: 500 }}>
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={1} // Square crop
                onCropChange={setCrop}
                onZoomChange={handleZoomChange}
                minZoom={0.5} // Allows zooming out
                maxZoom={3} // Allows zooming in
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
    </>
  );
}
