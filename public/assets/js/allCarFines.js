const statusBtns = document.getElementsByClassName("fineStatusBtn");

for (let i = 0; i < statusBtns.length; i++) {
  const dataId = statusBtns[i].getAttribute("data-id");
  const dataNumber = statusBtns[i].getAttribute("data-number");
  const status = statusBtns[i].getAttribute("data-status");
  statusBtns[i].addEventListener("click", () => {
    if (status === "due") {
      Swal.fire({
        icon: "error",
        title: "IMPAGO",
        text: `La multa N° ${dataNumber} (ID: ${dataId}) no ha sido pagada.`,
      });
    } else if (status === "paid") {
      Swal.fire({
        icon: "success",
        title: "PAGO",
        text: `La multa N° ${dataNumber} (ID: ${dataId}) ya fue pagada.`,
      });
    } else if (status === "dismissed") {
      Swal.fire({
        icon: "info",
        title: "ATENCIÓN",
        text: `La multa N° ${dataNumber} (ID: ${dataId}) fue desestimada.`,
      });
    } else {
      Swal.fire({
        icon: "warning",
        title: "SIN DATOS",
        text: `Se desconoce el estado de la multa N° ${dataNumber} (ID: ${dataId}).`,
      });
    }
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  const filterBtn = document.getElementById("filterBtn");

  filterBtn.addEventListener("click", async () => {
    // Inptus de los filtros
    const fine_number =
      document.getElementsByName("fine_number")[0].value || "";
    const fine_date = document.getElementsByName("fine_date")[0].value || "";
    const fine_article =
      document.getElementsByName("fine_article")[0].value || "";
    const fine_amount =
      document.getElementsByName("fine_amount")[0].value || "";
    const fine_author =
      document.getElementsByName("fine_author")[0].value || "";
    const fine_status =
      document.getElementsByName("fine_status")[0].value || "";
    const car_brand = document.getElementsByName("car_brand")[0].value || "";
    const car_model = document.getElementsByName("car_model")[0].value || "";
    const car_reg_number =
      document.getElementsByName("car_reg_number")[0].value || "";
    const owner_ci = document.getElementsByName("owner_ci")[0].value || "";
    const owner_name = document.getElementsByName("owner_name")[0].value || "";

    location.href = `/index/allCarFines?fine_number=${fine_number}&fine_date=${fine_date}&fine_article=${fine_article}&fine_amount=${fine_amount}&fine_author=${fine_author}&fine_status=${fine_status}&car_brand=${car_brand}&car_model=${car_model}&car_reg_number=${car_reg_number}&owner_ci=${owner_ci}&owner_name=${owner_name}`;
  });
});
