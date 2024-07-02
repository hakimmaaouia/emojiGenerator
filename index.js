const express = require("express");
const sharp = require("sharp");

const app = express();
const port = 3000;
const BASE_IMAGE_PATH = "./assets/body/variant1.png";
const EYES_VARIANTS = [
  "./assets/eye/variant1.png",
  "./assets/eye/variant2.png",
  "./assets/eye/variant3.png",
  "./assets/eye/variant4.png",
  "./assets/eye/variant5.png",
  "./assets/eye/variant6.png",
];
const MOUTHS_VARIANTS = [
  "./assets/mouth/variant1.png",
  "./assets/mouth/variant2.png",
  "./assets/mouth/variant3.png",
];

const overlayImages = async (baseImagePath, eyeImagePath, mouthImagePath) => {
  try {
    const baseMetadata = await sharp(baseImagePath).metadata();
    const eyeMetadata = await sharp(eyeImagePath).metadata();
    const mouthMetadata = await sharp(mouthImagePath).metadata();

    const baseImage = await sharp(baseImagePath).toBuffer();
    const eyeImage = await sharp(eyeImagePath).toBuffer();
    const mouthImage = await sharp(mouthImagePath).toBuffer();

    const combinedImage = await sharp(baseImage)
      .composite([
        {
          input: eyeImage,
          blend: "over",
          top: 150,
          left: (baseMetadata.width - eyeMetadata.width) / 2,
        },
        {
          input: mouthImage,
          blend: "over",
          top: 400,
          left: (baseMetadata.width - mouthMetadata.width) / 2,
        },
      ])
      .toBuffer();

    return combinedImage;
  } catch (error) {
    console.error("Error overlaying images:", error);
    throw new Error("Failed to overlay images.");
  }
};

app.get("/generate-emoji/:eye/:mouth", async (req, res) => {
  const eyeVariantIndex = parseInt(req.params.eye);
  const mouthVariantIndex = parseInt(req.params.mouth);

  if (
    isNaN(eyeVariantIndex) ||
    eyeVariantIndex < 0 ||
    eyeVariantIndex >= EYES_VARIANTS.length ||
    isNaN(mouthVariantIndex) ||
    mouthVariantIndex < 0 ||
    mouthVariantIndex >= MOUTHS_VARIANTS.length
  ) {
    return res.status(400).send("Invalid eye or mouth variant indices.");
  }

  try {
    const combinedImage = await overlayImages(
      BASE_IMAGE_PATH,
      EYES_VARIANTS[eyeVariantIndex],
      MOUTHS_VARIANTS[mouthVariantIndex]
    );

    res.type("png").send(combinedImage);
  } catch (error) {
    console.error("Error generating emoji:", error);
    res.status(500).send("Failed to generate emoji.");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Emoji generator API running on http://localhost:${port}`);
});
