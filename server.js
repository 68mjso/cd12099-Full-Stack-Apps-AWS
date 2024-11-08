import express from "express";
import bodyParser from "body-parser";
import { filterImageFromURL, deleteLocalFiles } from "./util/util.js";

// Init the Express application
const app = express();

// Set the network port
const port = process.env.PORT || 8082;

// Use the body parser middleware for post requests
app.use(bodyParser.json());

app.get("/filteredimage", async (req, res, next) => {
  const imageUrl = req?.query?.image_url ?? "";
  if (imageUrl.trim() === "") {
    const error = new Error("Missing input: image_url is required.");
    error.status = 400; // Bad Request for missing input
    return res.status(error.status).json({ message: error.message }); // Return error message as JSON
  }
  try {
    // Process the image URL (wrap in try-catch to handle any errors)
    const data = await filterImageFromURL(imageUrl);
    //Send success response with filtered image data
    return res.status(200).send(data);
  } catch (err) {
    // Handle any errors like invalid image URL or processing failure
    const error = new Error(
      "Unable to process the image. Please check the image URL."
    );
    error.status = 422; // Unprocessable Entity for invalid images
    return res.status(error.status).json({ message: error.message }); // Return error message as JSON
  }
});

// @TODO1 IMPLEMENT A RESTFUL ENDPOINT
// GET /filteredimage?image_url={{URL}}
// endpoint to filter an image from a public url.
// IT SHOULD
//    1
//    1. validate the image_url query
//    2. call filterImageFromURL(image_url) to filter the image
//    3. send the resulting file in the response
//    4. deletes any files on the server on finish of the response
// QUERY PARAMATERS
//    image_url: URL of a publicly accessible image
// RETURNS
//   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

/**************************************************************************** */

//! END @TODO1

// Root Endpoint
// Displays a simple message to the user
app.get("/", async (req, res) => {
  res.send("try GET /filteredimage?image_url={{}}");
});

// Start the Server
app.listen(port, () => {
  console.log(`server running http://localhost:${port}`);
  console.log(`press CTRL+C to stop server`);
});
