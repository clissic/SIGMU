const elementId = document.getElementsByClassName("classValue")

for (let i = 0; i < elementId.length; i++) {
    const keyId = elementId[i].getAttribute("title")
    elementId[i].addEventListener("click", () => {
        Swal.fire(`El ID de la multa es: <strong>${keyId}</strong>`)
    })
}

