document
  .getElementById("mainForm")
  .addEventListener("submit", performPostRequest);

function performPostRequest(e) {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  axios
    .post("http://localhost:3000/create-user", {
      name,
      email,
      message,
    })
    .then(function (response) {
      console.log(response);
      alert("Thanks for reaching out, We have received your email");
    })
    .catch(function (error) {
      alert(`Oops! Something went wrong ${error}`);
    });

  e.preventDefault();
}
