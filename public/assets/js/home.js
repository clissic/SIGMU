/* document.addEventListener("DOMContentLoaded", function() {
  var readRoleElement = document.getElementById("readRole");
  
  if (readRoleElement) {
    var role = readRoleElement.textContent.trim();

    // Obtener los elementos <a> y <div> por sus ID
    var createCarFineCard = document.getElementById("createCarFineCard");
    var deleteCarFineCard = document.getElementById("deleteCarFineCard");
    var updateCarFineCard = document.getElementById("updateCarFineCard");
    var createShipFineCard = document.getElementById("createShipFineCard");
    var deleteShipFineCard = document.getElementById("deleteShipFineCard");
    var updateShipFineCard = document.getElementById("updateShipFineCard");
    var createUserCard = document.getElementById("createUserCard");
    var readUserCard = document.getElementById("readUserCard");
    var updateUserCard = document.getElementById("updateUserCard");
    var deleteUserCard = document.getElementById("deleteUserCard");

    // Verificar el valor del rol y agregar la clase "disabled" y eliminar el atributo "href" según las condiciones
    if (role === "consulta") {
      createCarFineCard.classList.add("disabled");
      deleteCarFineCard.classList.add("disabled");
      updateCarFineCard.classList.add("disabled");
      createShipFineCard.classList.add("disabled");
      deleteShipFineCard.classList.add("disabled");
      updateShipFineCard.classList.add("disabled");
      createUserCard.classList.add("disabled");
      readUserCard.classList.add("disabled");
      updateUserCard.classList.add("disabled");
      deleteUserCard.classList.add("disabled");
      
      // Eliminar atributo "href" de los elementos <a> correspondientes
      createCarFineCard.removeAttribute("href");
      deleteCarFineCard.removeAttribute("href");
      updateCarFineCard.removeAttribute("href");
      createShipFineCard.removeAttribute("href");
      deleteShipFineCard.removeAttribute("href");
      updateShipFineCard.removeAttribute("href");
    } else if (role === "user") {
      deleteCarFineCard.classList.add("disabled");
      updateCarFineCard.classList.add("disabled");
      deleteShipFineCard.classList.add("disabled");
      updateShipFineCard.classList.add("disabled");
      createUserCard.classList.add("disabled");
      readUserCard.classList.add("disabled");
      updateUserCard.classList.add("disabled");
      deleteUserCard.classList.add("disabled");
      
      // Eliminar atributo "href" de los elementos <a> correspondientes
      deleteCarFineCard.removeAttribute("href");
      updateCarFineCard.removeAttribute("href");
      deleteShipFineCard.removeAttribute("href");
      updateShipFineCard.removeAttribute("href");
      createUserCard.removeAttribute("href");
      readUserCard.removeAttribute("href");
      updateUserCard.removeAttribute("href");
      deleteUserCard.removeAttribute("href");
    } else if (role === "admin") {
      deleteCarFineCard.classList.add("disabled");
      deleteShipFineCard.classList.add("disabled");
      createUserCard.classList.add("disabled");
      readUserCard.classList.add("disabled");
      updateUserCard.classList.add("disabled");
      deleteUserCard.classList.add("disabled");
      
      // Eliminar atributo "href" de los elementos <a> correspondientes
      deleteCarFineCard.removeAttribute("href");
      deleteShipFineCard.removeAttribute("href");
      createUserCard.removeAttribute("href");
      readUserCard.removeAttribute("href");
      updateUserCard.removeAttribute("href");
      deleteUserCard.removeAttribute("href");
    } else if (role === "contable") {
      createCarFineCard.classList.add("disabled");
      deleteCarFineCard.classList.add("disabled");
      createShipFineCard.classList.add("disabled");
      deleteShipFineCard.classList.add("disabled");
      createUserCard.classList.add("disabled");
      readUserCard.classList.add("disabled");
      updateUserCard.classList.add("disabled");
      deleteUserCard.classList.add("disabled");
      
      // Eliminar atributo "href" de los elementos <a> correspondientes
      createCarFineCard.removeAttribute("href");
      deleteCarFineCard.removeAttribute("href");
      createShipFineCard.removeAttribute("href");
      deleteShipFineCard.removeAttribute("href");
      createUserCard.removeAttribute("href");
      readUserCard.removeAttribute("href");
      updateUserCard.removeAttribute("href");
      deleteUserCard.removeAttribute("href");
    }
    // No se requiere acción para "superAdmin", ya que no se agrega la clase "disabled" ni se elimina el atributo "href".
  }
});
 */