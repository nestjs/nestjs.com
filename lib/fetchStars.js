window.addEventListener("load", function () {
  const owner = "nestjs";
  const repo = "nest";
  const apiUrl = `https://api.github.com/repos/${owner}/${repo}`;

  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      const stars = data.stargazers_count;
      const formattedStars = formatStars(stars);
      const elements = document.querySelectorAll(".github-stars");
      //  looop in all the github icons
      elements.forEach((el) => {
        el.textContent = formattedStars;
      });
    })
    .catch((error) => {
      console.error("Failed to fetch stars:", error);
    });

  function formatStars(count) {
    if (count >= 1_000_000) {
      return (count / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
    } else if (count >= 1_000) {
      return (count / 1_000).toFixed(1).replace(/\.0$/, "") + "k";
    } else {
      return count.toString();
    }
  }
});
