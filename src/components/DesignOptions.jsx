import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/system";
import black from "../assets/black-front.png";
import white from "../assets/white-front.png";

const Container = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  position: "absolute",
  right: "10px",
  top: "150px",
});

const Option = styled(Box)(({ selected }) => ({
  border: selected ? "2px solid blue" : "2px solid transparent",
  padding: "5px",
  marginBottom: "8px",
  cursor: "pointer",
  borderRadius: "5px",
  transition: "all 0.3s ease",
  "&:hover": {
    border: "2px solid gray",
  },
}));

const Thumbnail = styled("img")({
  width: "60px",
  height: "60px",
  objectFit: "cover",
});

const options = [
  { id: "front", label: "Front", image: white },
  { id: "back", label: "Back", image: black },
  { id: "sleeve", label: "Sleeve", image: white },
];

const DesignOptions = ({ onSelect }) => {
  const [selected, setSelected] = useState("front");

  const handleClick = (id) => {
    setSelected(id);
    onSelect(id);
  };

  return (
    <Container>
      {options.map((option) => (
        <Option
          key={option.id}
          selected={selected === option.id}
          onClick={() => handleClick(option.image)}
        >
          <Thumbnail src={option.image} alt={option.label} />
          <Typography variant="caption">{option.label}</Typography>
        </Option>
      ))}
    </Container>
  );
};

export default DesignOptions;
