// This access token will lasts about 60 days
var accessToken =
  "EAAF2W5GoqZCABO2s1FrsNGegDGSff5VnFBxUuzC0H9Gdu694jmYDM6zGZCpMVeoozBXkYkotaIE5915fPhCAbgrvv54YdzAYnTgRDt9hcQ3RiNy5Y47ZB4cZBHrSAOwqsXe1TzeXEwB3C7TnvtRgpd7BtWfSNCSileyNpsV2ZA7L0ZBls0Mm0BZCRVghUgNCUGf";
var feedDiv = document.getElementById("feedData");

fetch(
  "https://graph.facebook.com/me/feed?fields=full_picture,message,created_time&access_token=" +
    accessToken
)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => {
    console.log("User Feed:", data);
    data.data.forEach((post) => {
      var postDiv = document.createElement("div");
      postDiv.classList.add("post");

      var contentPara = document.createElement("p");
      contentPara.classList.add("message");
      contentPara.textContent = post.message || "";
      postDiv.appendChild(contentPara);

      var timestampPara = document.createElement("p");
      timestampPara.classList.add("timestamp");
      timestampPara.textContent = new Date(post.created_time).toLocaleString();
      postDiv.appendChild(timestampPara);

      // Check if the post has a picture
      if (post.full_picture) {
        var image = document.createElement("img");
        image.src = post.full_picture;
        postDiv.appendChild(image);
      }

      feedDiv.appendChild(postDiv);
    });
  })
  .catch((error) => {
    console.error("There was a problem with the fetch operation:", error);
    feedDiv.textContent = "Error fetching feed data: " + error.message;
  });
