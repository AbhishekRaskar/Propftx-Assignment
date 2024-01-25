import {
  Heading,
  SimpleGrid,
  Box,
  Text,
  Badge,
  Button,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      axios
        .get("https://propftx-assignment-be.onrender.com/movies", {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          console.log("response", response);
          setMovies(response.data.movies);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [token]);


  const handleDelete = (id) => {
    axios
      .delete(
        `https://propftx-assignment-be.onrender.com/movies/delete/${id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((response) => {
        console.log(`Deleted movie with id: ${id}`);
        setMovies((prevMovies) =>
          prevMovies.filter((movie) => movie._id !== id)
        );
      })
      .catch((error) => {
        console.error("Error deleting movie:", error);
      });
  };

  return (
    <div>
      <Heading>Movies List</Heading>
      <br />
      {token ? (
        <SimpleGrid columns={3} spacing={10}>
          {movies.map((movie) => (
            <Box
              
              boxShadow={" rgba(0, 0, 0, 0.35) 0px 5px 15px;"}
              key={movie.id}
              borderWidth="1px"
              borderRadius="lg"
              p={4}
            >
              <Heading fontSize="xl">Title : {movie.name}</Heading>
              <Text mt={2}>Overview : {movie.overview}</Text>
              <Badge mt={2} colorScheme="teal">
                Rating: {movie.rating}
              </Badge>
              <Text mt={2}>Release Date: {movie.release_date}</Text>
              <Text mt={2}>Duration: {movie.duration} minutes</Text>
              <br />
              <Link to={`/edit/${movie._id}`}>
                <Button colorScheme="teal" mt={2}>
                  Edit
                </Button>
              </Link>
              &nbsp;&nbsp;
              <Button
                colorScheme="red"
                mt={2}
                onClick={() => handleDelete(movie._id)}
              >
                Delete
              </Button>
            </Box>
          ))}
        </SimpleGrid>
      ) : (
        <Text>Please login to view movies.</Text>
      )}
    </div>
  );
};

export default Movies;
