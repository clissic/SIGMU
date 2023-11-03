const elementId = document.getElementsByClassName("classValue");

for (let i = 0; i < elementId.length; i++) {
  const keyId = elementId[i].getAttribute("title");
  elementId[i].addEventListener("click", () => {
    Swal.fire(`El ID de la multa es: <strong>${keyId}</strong>`);
  });
}

/* const searchBar = document.getElementById("searchBar"); */
const numberSearchBar = document.getElementById("searchByNumber");
const dateSearchBar = document.getElementById("searchByDate");
const hourSearchBar = document.getElementById("searchByHour");
const articleSearchBar = document.getElementById("searchByArticle");
const amountSearchBar = document.getElementById("searchByAmount");
const extraAmountSearchBar = document.getElementById("searchByExtraAmount");
const brandSearchBar = document.getElementById("searchByBrand");
const modelSearchBar = document.getElementById("searchByModel");
const regSearchBar = document.getElementById("searchByReg");
const docSearchBar = document.getElementById("searchByDoc");
const nameSearchBar = document.getElementById("searchByName");
const phoneSearchBar = document.getElementById("searchByPhone");
const adressSearchBar = document.getElementById("searchByAdress");

/* searchBar.addEventListener("input", () => {
  const searchText = searchBar.value.toLowerCase();
  const rows = document.querySelectorAll("table tr");
  for (let i = 3; i < rows.length; i++) { // Comienza desde la cuarta fila (excluye las tres primeras)
    const row = rows[i];
    const columns = row.getElementsByTagName("td");
    let found = false;
    for (let j = 0; j < columns.length; j++) {
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
}); */

numberSearchBar.addEventListener("input", () => {
  const searchText = numberSearchBar.value.toLowerCase(); // Usar numberSearchBar en lugar de searchBar
  const rows = document.querySelectorAll("table tr");
  for (let i = 3; i < rows.length; i++) {
    const row = rows[i];
    const columns = row.getElementsByTagName("td");
    const cellText = columns[1].textContent.toLowerCase(); // Compara solo con la segunda columna (N°)
    if (cellText.includes(searchText)) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  }
});

dateSearchBar.addEventListener("input", () => {
  const searchText = dateSearchBar.value.toLowerCase(); // Usar numberSearchBar en lugar de searchBar
  const rows = document.querySelectorAll("table tr");
  for (let i = 3; i < rows.length; i++) {
    const row = rows[i];
    const columns = row.getElementsByTagName("td");
    const cellText = columns[2].textContent.toLowerCase(); // Compara solo con la segunda columna (N°)
    if (cellText.includes(searchText)) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  }
});

hourSearchBar.addEventListener("input", () => {
  const searchText = hourSearchBar.value.toLowerCase(); // Usar numberSearchBar en lugar de searchBar
  const rows = document.querySelectorAll("table tr");
  for (let i = 3; i < rows.length; i++) {
    const row = rows[i];
    const columns = row.getElementsByTagName("td");
    const cellText = columns[3].textContent.toLowerCase(); // Compara solo con la segunda columna (N°)
    if (cellText.includes(searchText)) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  }
});

articleSearchBar.addEventListener("input", () => {
  const searchText = articleSearchBar.value.toLowerCase(); // Usar numberSearchBar en lugar de searchBar
  const rows = document.querySelectorAll("table tr");
  for (let i = 3; i < rows.length; i++) {
    const row = rows[i];
    const columns = row.getElementsByTagName("td");
    const cellText = columns[4].textContent.toLowerCase(); // Compara solo con la segunda columna (N°)
    if (cellText.includes(searchText)) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  }
});

amountSearchBar.addEventListener("input", () => {
  const searchText = amountSearchBar.value.trim().toLowerCase(); // Usar numberSearchBar en lugar de searchBar
  const rows = document.querySelectorAll("table tr");
  for (let i = 3; i < rows.length; i++) {
    const row = rows[i];
    const columns = row.getElementsByTagName("td");
    const cellText = columns[5].textContent.trim().toLowerCase(); // Compara solo con la segunda columna (N°)
    if (cellText === searchText) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  }
});

extraAmountSearchBar.addEventListener("input", () => {
  const searchText = extraAmountSearchBar.value.trim().toLowerCase(); // Usar numberSearchBar en lugar de searchBar
  const rows = document.querySelectorAll("table tr");
  for (let i = 3; i < rows.length; i++) {
    const row = rows[i];
    const columns = row.getElementsByTagName("td");
    const cellText = columns[6].textContent.trim().toLowerCase(); // Compara solo con la segunda columna (N°)
    if (cellText === searchText) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  }
});

brandSearchBar.addEventListener("input", () => {
  const searchText = brandSearchBar.value.toLowerCase(); // Usar numberSearchBar en lugar de searchBar
  const rows = document.querySelectorAll("table tr");
  for (let i = 3; i < rows.length; i++) {
    const row = rows[i];
    const columns = row.getElementsByTagName("td");
    const cellText = columns[8].textContent.toLowerCase(); // Compara solo con la segunda columna (N°)
    if (cellText.includes(searchText)) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  }
});

modelSearchBar.addEventListener("input", () => {
  const searchText = modelSearchBar.value.toLowerCase(); // Usar numberSearchBar en lugar de searchBar
  const rows = document.querySelectorAll("table tr");
  for (let i = 3; i < rows.length; i++) {
    const row = rows[i];
    const columns = row.getElementsByTagName("td");
    const cellText = columns[9].textContent.toLowerCase(); // Compara solo con la segunda columna (N°)
    if (cellText.includes(searchText)) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  }
});

regSearchBar.addEventListener("input", () => {
  const searchText = regSearchBar.value.toLowerCase(); // Usar numberSearchBar en lugar de searchBar
  const rows = document.querySelectorAll("table tr");
  for (let i = 3; i < rows.length; i++) {
    const row = rows[i];
    const columns = row.getElementsByTagName("td");
    const cellText = columns[10].textContent.toLowerCase(); // Compara solo con la segunda columna (N°)
    if (cellText.includes(searchText)) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  }
});

docSearchBar.addEventListener("input", () => {
  const searchText = docSearchBar.value.toLowerCase(); // Usar numberSearchBar en lugar de searchBar
  const rows = document.querySelectorAll("table tr");
  for (let i = 3; i < rows.length; i++) {
    const row = rows[i];
    const columns = row.getElementsByTagName("td");
    const cellText = columns[11].textContent.toLowerCase(); // Compara solo con la segunda columna (N°)
    if (cellText.includes(searchText)) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  }
});

nameSearchBar.addEventListener("input", () => {
  const searchText = nameSearchBar.value.toLowerCase(); // Usar numberSearchBar en lugar de searchBar
  const rows = document.querySelectorAll("table tr");
  for (let i = 3; i < rows.length; i++) {
    const row = rows[i];
    const columns = row.getElementsByTagName("td");
    const cellText = columns[12].textContent.toLowerCase(); // Compara solo con la segunda columna (N°)
    if (cellText.includes(searchText)) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  }
});

phoneSearchBar.addEventListener("input", () => {
  const searchText = phoneSearchBar.value.toLowerCase(); // Usar numberSearchBar en lugar de searchBar
  const rows = document.querySelectorAll("table tr");
  for (let i = 3; i < rows.length; i++) {
    const row = rows[i];
    const columns = row.getElementsByTagName("td");
    const cellText = columns[13].textContent.toLowerCase(); // Compara solo con la segunda columna (N°)
    if (cellText.includes(searchText)) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  }
});

adressSearchBar.addEventListener("input", () => {
  const searchText = adressSearchBar.value.toLowerCase(); // Usar numberSearchBar en lugar de searchBar
  const rows = document.querySelectorAll("table tr");
  for (let i = 3; i < rows.length; i++) {
    const row = rows[i];
    const columns = row.getElementsByTagName("td");
    const cellText = columns[14].textContent.toLowerCase(); // Compara solo con la segunda columna (N°)
    if (cellText.includes(searchText)) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  }
});