// Handle the Generate Image button click
document.getElementById("generate-btn").addEventListener("click", () => {
  const prompt = "A futuristic city at sunset"; // Example prompt
  const n = 1; // Number of images to generate

  // Send a POST request to the /generate-image route
  fetch("/generate-image", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt, n })
  })
    .then(response => response.json())
    .then(data => {
      console.log("Image generation response:", data);
      if (data.images && data.images.length > 0) {
        // Display the generated images
        const outputDiv = document.getElementById("output");
        outputDiv.innerHTML = ""; // Clear previous images
        data.images.forEach((image, index) => {
          const img = document.createElement("img");
          img.src = image.url;
          img.alt = `Generated image ${index + 1}`;
          img.style.width = "256px";
          img.style.margin = "10px";
          outputDiv.appendChild(img);
        });
      } else {
        alert(data.message || "No images generated.");
      }
    })
    .catch(error => {
      console.error("Error generating image:", error);
      alert("An error occurred while generating the image.");
    });
});
