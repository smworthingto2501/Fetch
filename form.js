const form = document.getElementById("user-form");
const occupationSelect = document.getElementById("occupation");
const stateSelect = document.getElementById("state");
const formResponse = document.getElementById("form-response");

// Fetch options for occupation and state
fetch("https://frontend-take-home.fetchrewards.com/form")
  .then(response => response.json())
  .then(data => {
    // Populate occupation options
    data.occupations.forEach(occupation => {
      const option = document.createElement("option");
      option.value = occupation;
      option.text = occupation;
      occupationSelect.add(option);
    });

    // Populate state options
    data.states.forEach(state => {
      const option = document.createElement("option");
      option.value = state.abbreviation;
      option.text = state.name;
      stateSelect.add(option);
    });
  });

form.addEventListener("submit", event => {
  event.preventDefault();

// get the form data
const formData = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
    occupation: document.getElementById("occupation").value,
    state: document.getElementById("state").value
};

// convert form data to JSON
const data = JSON.stringify(formData);

  // Send form data to endpoint
  fetch("https://frontend-take-home.fetchrewards.com/form", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => {
      if (response.status === 201) {
        return response.json();
      } else {
        throw new Error("Form submission failed");
      }
    })
    .then(responseData => {
      formResponse.innerHTML = "Form submitted successfully!";
      console.log(responseData);
    })
    .catch(error => {
      formResponse.innerHTML = error;
    });
});

