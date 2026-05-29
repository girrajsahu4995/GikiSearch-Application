let searchInputEl = document.getElementById("searchInput");
let searchResultsEl = document.getElementById("searchResults");
let spinnerEl = document.getElementById("spinner");

function createAndAppendSearchResult(result) {

  let { link, title, description } = result;

  let resultItemEl = document.createElement("div");
  resultItemEl.classList.add("result-item");

  let titleEl = document.createElement("a");
  titleEl.href = link;
  titleEl.target = "_blank";
  titleEl.textContent = title;
  titleEl.classList.add("result-title");

  resultItemEl.appendChild(titleEl);

  let breakEl1 = document.createElement("br");
  resultItemEl.appendChild(breakEl1);

  let urlEl = document.createElement("a");
  urlEl.href = link;
  urlEl.target = "_blank";
  urlEl.textContent = link;
  urlEl.classList.add("result-url");

  resultItemEl.appendChild(urlEl);

  let descriptionEl = document.createElement("p");
  descriptionEl.textContent = description;
  descriptionEl.classList.add("link-description");

  resultItemEl.appendChild(descriptionEl);

  searchResultsEl.appendChild(resultItemEl);
}

function displayResults(searchResults) {

  spinnerEl.classList.add("d-none");

  if (searchResults.length === 0) {

    searchResultsEl.innerHTML = `
      <h3 style="text-align:center; color:white;">
        No Results Found
      </h3>
    `;

    return;
  }

  for (let result of searchResults) {
    createAndAppendSearchResult(result);
  }
}

function searchWikipedia(event) {

  if (event.key === "Enter") {

    let searchInput = searchInputEl.value.trim();

    if (searchInput === "") {
      return;
    }

    spinnerEl.classList.remove("d-none");
    searchResultsEl.textContent = "";

    let url =
      "https://apis.ccbp.in/wiki-search?search=" + searchInput;

    let options = {
      method: "GET"
    };

    fetch(url, options)
      .then(function(response) {
        return response.json();
      })
      .then(function(jsonData) {

        let { search_results } = jsonData;

        displayResults(search_results);
      })
      .catch(function() {

        spinnerEl.classList.add("d-none");

        searchResultsEl.innerHTML = `
          <h3 style="color:red; text-align:center;">
            Something went wrong...
          </h3>
        `;
      });
  }
}

searchInputEl.addEventListener("keydown", searchWikipedia);