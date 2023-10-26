const elementId = document.getElementsByClassName("classValue");

for (let i = 0; i < elementId.length; i++) {
  const keyId = elementId[i].getAttribute("title");
  elementId[i].addEventListener("click", () => {
    Swal.fire(`El ID de la multa es: <strong>${keyId}</strong>`);
  });
}

const searchBar = document.getElementById("searchBar");

searchBar.addEventListener("input", function () {
  const searchText = searchBar.value.toLowerCase();

  const rows = document.querySelectorAll("table tr");

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    const columns = row.getElementsByTagName("td");

    let found = false;

    for (let j = 1; j < columns.length; j++) {
      const cellText = columns[j].textContent.toLowerCase();

      if (cellText.includes(searchText)) {
        found = true;
        break;
      }
    }

    if (found) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  }
});
