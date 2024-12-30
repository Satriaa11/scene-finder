const searchBtn = document.getElementById("search");
const resultDiv = document.getElementById("result");

searchBtn.addEventListener("click", findAnimeScene);

async function findAnimeScene() {
  const imageUrl = document.getElementById("imageUrl").value;
  if (!imageUrl) {
    alert("Please enter an image URL");
    return;
  }

  resultDiv.innerHTML =
    '<p class="text-lg font-semibold animate-pulse">Searching...</p>';

  try {
    const response = await fetch(
      `https://api.trace.moe/search?url=${encodeURIComponent(imageUrl)}`,
    );

    const data = await response.json();
    if (data?.result && data?.result?.length > 0) {
      const scene = data.result[0];
      console.log(scene);
      //   render
      resultDiv.innerHTML = `
        <div class="bg-white shadow-md rounded-lg p-4 sm:p-6 max-w-2xl mx-auto">
          <h1 class="text-xl sm:text-2xl font-bold mb-4 text-center text-blue-600">Result</h1>
          <div class="mb-4 space-y-2">
            <p class="text-sm sm:text-base"><span class="font-semibold">Anime:</span> ${scene.filename}</p>
            <p class="text-sm sm:text-base"><span class="font-semibold">Episode:</span> ${scene.episode}</p>
            <p class="text-sm sm:text-base"><span class="font-semibold">Time:</span> ${scene.from} - ${scene.to}</p>
            <p class="text-sm sm:text-base"><span class="font-semibold">Similarity:</span> ${(scene.similarity * 100).toFixed(2)}%</p>
          </div>
          <div class="flex flex-col sm:flex-row items-center gap-4">
            <img src="${imageUrl}" alt="scene" class="w-full sm:w-1/2 h-auto rounded-lg mb-4 sm:mb-0">
            <div class="w-full sm:w-1/2">
              <p class="text-center">
                <a href="${scene.video}" target="_blank" class="inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300 text-sm sm:text-base">Watch Now</a>
              </p>
            </div>
          </div>
        </div>
      `;
    } else {
      resultDiv.innerHTML =
        '<p class="text-lg font-semibold text-red-500">No Result Found</p>';
    }
  } catch (error) {
    console.log(error);
    resultDiv.innerHTML =
      '<p class="text-lg font-semibold text-red-500">Error while searching...</p>';
  }
}