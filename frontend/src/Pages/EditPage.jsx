import React, { useEffect, useState } from "react";
import { Heading, Input, Button, Box } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

const EditPage = () => {
  const { id } = useParams();
  const [movieData, setMovieData] = useState({});
  const [editedData, setEditedData] = useState({});

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          `https://propftx-assignment-be.onrender.com/movies/${id}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );

        const data = await response.json();
        console.log(data.movie);
        setMovieData(data.movie);
        setEditedData(data.movie);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `https://propftx-assignment-be.onrender.com/movies/update/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify(editedData),
        }
      );

      if (response.ok) {
        console.log("Movie updated successfully!");
      } else {
        console.error(
          "Failed to update movie:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error updating movie:", error);
    }
  };

  return (
    <Box w={"50%"} m={"auto"} boxShadow={" rgba(0, 0, 0, 0.35) 0px 5px 15px;"} p={"5"}>
      <Heading>Edit Movie Details</Heading>
      <br />
      <div>
        <label htmlFor="title">Title:</label>
        <Input
          type="text"
          name="name"
          value={editedData.name || ""}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="duration">Duration:</label>
        <Input
          type="text"
          name="duration"
          value={editedData.duration || ""}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="overview">Overview:</label>
        <Input
          type="text"
          name="overview"
          value={editedData.overview || ""}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="rating">Rating:</label>
        <Input
          type="text"
          name="rating"
          value={editedData.rating || ""}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="release_date">Release Date:</label>
        <Input
          type="text"
          name="release_date"
          value={editedData.release_date || ""}
          onChange={handleInputChange}
        />
      </div>
      <Button mt={4} colorScheme="teal" onClick={handleUpdate}>
        Update
      </Button>
    </Box>
  );
};

export default EditPage;
