import React from "react";
import { Link } from "react-router-dom";
import { Box } from "@chakra-ui/react";

const Navbar = () => {
  return (
    <Box p={"2%"} w={"80%"} m={"auto"} borderRadius={"5"} bg={"#E4405F"}>
      <Box fontSize={"large"} display="flex" justifyContent="space-around">
        <Link to="/">Home</Link>
        <Link to="/movies">Movies</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
      </Box>
    </Box>
  );
};

export default Navbar;
