import { useState } from "react";
import {
  Heading,
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
} from "@chakra-ui/react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();

  const handleLogin = async () => {
    try {
      const response = await fetch(
        "https://propftx-assignment-be.onrender.com/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        const token = data.token;

        // token
        localStorage.setItem("token", token);

    
        toast({
          title: "Login Successful",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        console.error("Login failed");

   
        toast({
          title: "Login Failed",
          description: "Invalid email or password",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error during login:", error);


      toast({
        title: "Error",
        description: "An error occurred during login",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      boxShadow={" rgba(0, 0, 0, 0.35) 0px 5px 15px;"}
      w={"40%"}
      m={"auto"}
      p={4}
    >
      <Heading mb={4}>Login Page</Heading>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
      >
        <FormControl>
          <FormLabel>Email:</FormLabel>
          <Input
            placeholder="Enter Email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Password:</FormLabel>
          <Input
            placeholder="Enter Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <Button
          mt={4}
          _hover={{
            bg: "#E4405F",
          }}
          bg="#E4405F"
          color="white"
          type="submit"
        >
          Login
        </Button>
      </form>
    </Box>
  );
};

export default Login;
