import { Container, Typography, Box } from "@mui/material";

export default function Footer() {
  return (
    <Box sx={{ backgroundColor: "#f5f5f5", py: 2, textAlign: "center" }}>
      <Container>
        <Typography variant="body2" color="textSecondary">
          © {new Date().getFullYear()} TeeCraft | All Rights Reserved.
        </Typography>
      </Container>
    </Box>
  );
}
