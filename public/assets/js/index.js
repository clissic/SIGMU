console.log("Hello world!")

const allFines = [{fine_number: 1}, {fine_number: 2}, {fine_number: 3}, {fine_number: 4},{fine_number: 5} ]

function getCarFineNumber() {
    if (allFines.length === 0) {
        return 1;
    } else {
        const lastFine = allFines[allFines.length - 1];
        return lastFine.fine_number !== undefined ? lastFine.fine_number + 1 : 1;
    }
}

console.log(getCarFineNumber())