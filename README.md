# Emoji Generator API

The Emoji Generator API allows you to dynamically generate emojis by combining different eye and mouth variants onto a base emoji body image.

## Features

- **Dynamic Generation:** Customize emojis by selecting different eye and mouth variants.
- **PNG Output:** Emojis are generated and returned as PNG images.

## Setup

1. **Clone the Repository:**

   ```
   git clone https://github.com/your/repository.git
   cd repository-folder
   ```

2. **Install Dependencies:**

   Ensure you have Node.js and npm installed. Then, install dependencies using:

   ```
   npm install
   ```

3. **Run the Server:**

   Start the server by running:

   ```
   node yourFileName.js
   ```

   The server will start on `http://localhost:3000` by default.

## Usage

### Generate Emoji

- **Endpoint:** `/generate-emoji/:eye/:mouth`
- **Method:** GET
- **Parameters:**
  - `:eye` - Index of the eye variant (0 to 5)
  - `:mouth` - Index of the mouth variant (0 to 2)

#### Example

To generate an emoji with the 3rd eye variant and the 2nd mouth variant:

```
GET http://localhost:3000/generate-emoji/2/1
```

Replace `2` and `1` with valid indices according to the available variants.

### Response

The generated emoji image will be returned as a PNG file.

## Error Handling

- If invalid eye or mouth indices are provided, the API will respond with a `400 Bad Request` error.

## Dependencies

- [Express.js](https://expressjs.com/) - Web framework for Node.js
- [Sharp](https://sharp.pixelplumbing.com/) - High-performance image processing library


