const numberInput = document.getElementById("fine_number");

// NO PERMITE QUE SE LE ASINGE UN NUMERO NEGATIVO NI EL CERO COMO NUMERO DE MULTA
numberInput.addEventListener("input", () => {
    if (numberInput.value <= 0) {
        numberInput.value = 1
    }
})