import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
  Container,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = ["Home", "Design", "About", "Contact"];

  return (
    <>
      {/* Navbar (Ensuring Full Width) */}
      <AppBar
        position="static"
        sx={{ backgroundColor: "#0096c7", width: "100%" }}
      >
        <Container maxWidth="xl">
          {" "}
          {/* Ensures it spans full width */}
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            {/* Logo / Brand */}
            <Typography variant="h6" sx={{ flexGrow: 1, cursor: "pointer" }}>
              TeeCraft
            </Typography>

            {/* Desktop Menu (Hidden on Mobile) */}
            <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
              {menuItems.map((item) => (
                <Button key={item} sx={{ color: "white" }}>
                  {item}
                </Button>
              ))}
            </Box>

            {/* Mobile Menu Button (Hidden on Desktop) */}
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={handleDrawerToggle}
              sx={{ display: { xs: "flex", md: "none" } }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer (Only for Small Screens) */}
      <Drawer anchor="right" open={mobileOpen} onClose={handleDrawerToggle}>
        <List sx={{ width: 250 }}>
          <ListItem>
            <IconButton edge="end" color="inherit" onClick={handleDrawerToggle}>
              <CloseIcon />
            </IconButton>
          </ListItem>
          {menuItems.map((item) => (
            <ListItem key={item} disablePadding>
              <ListItemButton>
                <ListItemText primary={item} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default Navbar;
