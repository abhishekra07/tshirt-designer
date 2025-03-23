import { useEffect, useState } from "react";
import { Box, IconButton, MenuItem, Select } from "@mui/material";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import DeleteIcon from "@mui/icons-material/Delete";

const fontSizes = [12, 14, 16, 18, 24, 32, 48, 64];
const fontFamilies = [
  "Arial",
  "Courier New",
  "Georgia",
  "Times New Roman",
  "Verdana",
];

const TextEditorToolbar = ({ canvas }) => {
  const [selectedObject, setSelectedObject] = useState(null);
  const [textStyles, setTextStyles] = useState({
    fontSize: 15,
    textColor: "#000000",
    fontFamily: "Arial",
    isBold: false,
    isItalic: false,
    isUnderlined: false,
    textAlign: "left",
  });
  const [toolbarPosition, setToolbarPosition] = useState({
    right: 0,
    top: "50%",
  });

  useEffect(() => {
    if (!canvas) return;

    const updateToolbar = (event) => {
      const activeObject = event.selected?.[0];
      document.activeElement.blur(); // Remove focus from other elements

      if (activeObject && activeObject.type === "textbox") {
        setSelectedObject(activeObject);
        setTextStyles({
          fontSize: activeObject.fontSize || 15,
          textColor: activeObject.fill || "#000000",
          fontFamily: activeObject.fontFamily || "Arial",
          isBold: activeObject.fontWeight === "bold",
          isItalic: activeObject.fontStyle === "italic",
          isUnderlined: activeObject.underline === true,
          textAlign: activeObject.textAlign || "left",
        });

        // Position toolbar above the text
        // const { left, top, width } = activeObject;
        // console.log("left ", left, " top ", top, " width ", width);
        // setToolbarPosition({ top: top, left: left });
        // console.log("setToolbarPosition ", toolbarPosition);
      }
    };

    const clearSelection = () => {
      setSelectedObject(null);
    };

    canvas.on("selection:created", updateToolbar);
    canvas.on("selection:updated", updateToolbar);
    canvas.on("selection:cleared", clearSelection);

    const handleKeyDown = (event) => {
      if (event.key === "Delete" && selectedObject) {
        deleteObject();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      canvas.off("selection:created", updateToolbar);
      canvas.off("selection:updated", updateToolbar);
      canvas.off("selection:cleared", clearSelection);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [canvas, selectedObject]);

  const updateTextStyles = (property, value) => {
    if (selectedObject) {
      selectedObject.set(property, value);
      setTextStyles((prev) => ({ ...prev, [property]: value }));
      canvas.renderAll();
    }
  };

  const toggleStyle = (style) => {
    const newValue = !textStyles[style];
    const fabricProperty =
      style === "isBold"
        ? "fontWeight"
        : style === "isItalic"
        ? "fontStyle"
        : "underline";

    updateTextStyles(
      fabricProperty,
      newValue ? (style === "isUnderlined" ? true : "bold") : "normal"
    );
  };

  const deleteObject = () => {
    if (selectedObject) {
      canvas.remove(selectedObject);
      canvas.discardActiveObject();
      canvas.renderAll();
      setSelectedObject(null);
    }
  };

  if (!selectedObject) return null;

  return (
    <Box
      sx={{
        position: "absolute",
        right: 0,
        top: "50%",
        transform: "translateY(-50%)", // Corrected this line
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        background: "#fff",
        padding: "6px 10px",
        borderRadius: "6px",
        boxShadow: "0px 2px 6px rgba(0,0,0,0.2)",
        zIndex: 100,
        alignItems: "center",
      }}
    >
      {/* Font Family */}
      <Select
        value={textStyles.fontFamily}
        onChange={(e) => updateTextStyles("fontFamily", e.target.value)}
        size="small"
      >
        {fontFamilies.map((font) => (
          <MenuItem key={font} value={font}>
            {font}
          </MenuItem>
        ))}
      </Select>

      {/* Font Size */}
      <Select
        value={textStyles.fontSize}
        onChange={(e) => updateTextStyles("fontSize", e.target.value)}
        size="small"
      >
        {fontSizes.map((size) => (
          <MenuItem key={size} value={size}>
            {size}
          </MenuItem>
        ))}
      </Select>

      {/* Bold, Italic, Underline */}
      <IconButton
        onClick={() => toggleStyle("isBold")}
        color={textStyles.isBold ? "primary" : "default"}
      >
        <FormatBoldIcon />
      </IconButton>
      <IconButton
        onClick={() => toggleStyle("isItalic")}
        color={textStyles.isItalic ? "primary" : "default"}
      >
        <FormatItalicIcon />
      </IconButton>
      <IconButton
        onClick={() => toggleStyle("isUnderlined")}
        color={textStyles.isUnderlined ? "primary" : "default"}
      >
        <FormatUnderlinedIcon />
      </IconButton>

      {/* Text Alignment */}
      <IconButton
        onClick={() => updateTextStyles("textAlign", "left")}
        color={textStyles.textAlign === "left" ? "primary" : "default"}
      >
        <FormatAlignLeftIcon />
      </IconButton>
      <IconButton
        onClick={() => updateTextStyles("textAlign", "center")}
        color={textStyles.textAlign === "center" ? "primary" : "default"}
      >
        <FormatAlignCenterIcon />
      </IconButton>
      <IconButton
        onClick={() => updateTextStyles("textAlign", "right")}
        color={textStyles.textAlign === "right" ? "primary" : "default"}
      >
        <FormatAlignRightIcon />
      </IconButton>

      {/* Text Color Picker */}
      <input
        type="color"
        value={textStyles.textColor}
        onChange={(e) => updateTextStyles("fill", e.target.value)}
        style={{
          width: "30px",
          height: "30px",
          border: "none",
          cursor: "pointer",
        }}
      />

      {/* 🗑️ Delete Button */}
      <IconButton onClick={deleteObject} color="error">
        <DeleteIcon />
      </IconButton>
    </Box>
  );
};

export default TextEditorToolbar;
