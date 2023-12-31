document.addEventListener("DOMContentLoaded", async () => {
    const filterBtn = document.getElementById("filterBtn");
  
    filterBtn.addEventListener("click", async () => {
      // Inptus de los filtros
      const first_name =
        document.getElementsByName("first_name")[0].value || "";
      const last_name = document.getElementsByName("last_name")[0].value || "";
      const rank =
        document.getElementsByName("rank")[0].value || "";
      const email =
        document.getElementsByName("email")[0].value || "";
      const role =
        document.getElementsByName("role")[0].value || "";
      const fines =
        document.getElementsByName("fines")[0].value || "";
  
      location.href = `/index/users/allUsers?first_name=${first_name}&last_name=${last_name}&rank=${rank}&email=${email}&role=${role}&fines=${fines}`;
    });
  });