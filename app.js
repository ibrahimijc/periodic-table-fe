

window.addEventListener('DOMContentLoaded', async (event) => {

    let ptElements = await getPeriodicTableData();
    let INVISIBLE_BOX = true;
    function createPeriodicTable() {
        let elementNumber = 0;
        let periodicTable = document.querySelector(".periodicTable");
        let table = document.createElement("table");

        for (let i = 0; i < 7; i++) {

            let row = document.createElement('tr');

            for (let j = 0; j < 18; j++) {
                let box;
                if (i == 0 && (j > 0 && j < 17))
                    box = createElementBox(123, 12, 123, "", INVISIBLE_BOX);
                else if ((i == 1 || i == 2) && (j > 1 && j < 12))
                    box = createElementBox(123, 12, 123, "", INVISIBLE_BOX);
                else {
                    let { name, symbol, number } = { ...ptElements[elementNumber] }
                    let bgColor = ptElements[elementNumber]['cpk-hex']
                    box = createElementBox(number, symbol, name, bgColor, !INVISIBLE_BOX);
                    elementNumber++;

                    if (elementNumber == 57)
                        elementNumber = 71;
                    if (elementNumber == 89)
                        elementNumber = 103
                }

                row.appendChild(box);
            }
            table.appendChild(row);
        }

        table.appendChild(returnEmptyRow())
        table.appendChild(returnEmptyRow())

        elementNumber = 57;
        for (let k = 0; k < 2; k++) {
            let secondTableRow = document.createElement('tr');

            for (let q = 0; q < 14; q++) {
                let { name, symbol, number } = { ...ptElements[elementNumber] }
                let bgColor = ptElements[elementNumber]['cpk-hex']
                secondTableBox = createElementBox(number, symbol, name, bgColor, !INVISIBLE_BOX);
                secondTableRow.appendChild(secondTableBox)

                elementNumber++;
                if (elementNumber == 70)
                    elementNumber = 89
            }
            table.appendChild(secondTableRow);
        }

        periodicTable.appendChild(table);
    }

    function createElementBox(atomicNumber, symbol, name, bgColor, isInvisible) {
        let box = document.createElement('td');

        if (isInvisible) {
            box.className = "invisibleBox";
            return box;
        }

        box.innerHTML = `<sup>${atomicNumber}</sup> <br> ${symbol} <br> <sub>${name}</sub>`
        console.log(`${atomicNumber}  ${bgColor}`);
        box.style.backgroundColor = `#${bgColor}`
        return box;
    }

    function returnEmptyRow() {
        return document.createElement('br');
    }

    async function getPeriodicTableData() {
        try {
            let result = await axios.get('https://periodictableapiv1.herokuapp.com/');
            return result.data;
        } catch (e) {
            console.log('unable to get data');
        }
    }

    createPeriodicTable();
});


