// Load the data from the JSON file
const loadProducts = () => {
  return fetch("product.json")
    .then((response) => response.json())
    .then((data) => data.products);
};

// Get the form and search results elements
const searchForm = document.querySelector("#search-form");
const searchResults = document.querySelector("#search-results");

// Define the search function
const searchProducts = (event) => {
  event.preventDefault(); // Prevent the form from submitting

  // Get the user input
  const location = document.querySelector("#location").value.trim();
  const productName = document
    .querySelector("#product-name")
    .value.trim()
    .toLowerCase();

  // Load the products from the JSON file
  loadProducts().then((products) => {
    // Filter the products based on the user input
    const filteredProducts = products.filter((product) => {
      const productLocation = product.location.toLowerCase();
      return (
        productLocation.includes(location.toLowerCase()) &&
        product.name.toLowerCase().includes(productName)
      );
    });

    // Display the search results
    searchResults.innerHTML = "";
    if (filteredProducts.length > 0) {
      const resultList = document.createElement("ul");
      filteredProducts.forEach((product) => {
        const listItem = document.createElement("li");
        const name = document.createElement("h3");
        const description = document.createElement("p");
        const productLocation = document.createElement("p");
        const learnMoreButton = document.createElement("a");

        name.textContent = product.name;
        description.textContent = product.description;
        productLocation.textContent = "Location: " + product.location;
        learnMoreButton.href = "#";
        learnMoreButton.textContent = "Learn More";
        learnMoreButton.classList.add("button");

        listItem.appendChild(name);
        listItem.appendChild(description);
        listItem.appendChild(productLocation);
        listItem.appendChild(learnMoreButton);
        resultList.appendChild(listItem);
      });
      searchResults.appendChild(resultList);
    } else {
      const noResultsMessage = document.createElement("p");
      noResultsMessage.textContent = "No results found.";
      searchResults.appendChild(noResultsMessage);
    }
  });
};

// Add an event listener to the form
searchForm.addEventListener("submit", searchProducts);
