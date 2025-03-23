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
import { Link } from "react-router-dom";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = ["Tshirt", "Tshirt-2", "Tshirt-3", "Tshirt-4"];

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
              <Button
                sx={{ color: "white", textTransform: "capitalize" }}
                component={Link}
                to="/tshirt"
              >
                Tshirt
              </Button>
              <Button
                sx={{ color: "white", textTransform: "capitalize" }}
                component={Link}
                to="/tshirt-2"
              >
                Tshirt-2
              </Button>
              <Button
                sx={{ color: "white", textTransform: "capitalize" }}
                component={Link}
                to="/tshirt-3"
              >
                Tshirt-3
              </Button>
              {/* <Button
                sx={{ color: "white", textTransform: "capitalize" }}
                component={Link}
                to="/tshirt-4"
              >
                Tshirt-4
              </Button> */}
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
