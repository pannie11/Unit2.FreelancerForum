/* State */
// Here, we define variables for the data that our program needs to remember.
// We call this data "state" because it represents the state of our program.

// TODO: initialize an array of possible names and an array of possible occupations
const names = ['Lawrence', 'Edith', 'Barbara', 'Ralph', 'Alicia', 'Luke', 'Darragh', 'Raees', 'Sidney', 'Francesco']
const occupations = ['market trader', 'builder', 'park ranger', 'builder', 'flying instructor', 'dancer', 'chauffeur', 'chimney sweep', 'copywriter', 'cleaner']

// TODO: initialize an array of at least two freelancers with names, occupations, and starting prices
const freelancers = [
    { name: 'Alicia', price: 70, occupation: 'dancer' },
    { name: 'Ralph', price: 74, occupation: 'chimney sweep' }
]

// TODO: Write a function to set an interval to add a freelancer and rerender every few seconds
const addFreelancer = setInterval(generateFreelancer, 1000);

const table = document.querySelector('table'); //<table> on the html file

const data = Object.keys(freelancers[0]) //getting the key names of the first object from our freelancers array as table headers. this returns them in an array

const thead = table.createTHead(); //createTHead returns the table head element associated with the given table

const tbody = table.createTBody();

const averagePrice = document.querySelector('span');

//----------------------------------------------------------------

/**
 * Update the DOM to reflect the current state.
 * The term "render" is often used to describe this process.
    * Basically it's showing the output in the browser.
 */

// TODO: The initial array of freelancers is rendered onto the page
// using the DOM interface for table - HTMLTableElement
//generating a table head for our table
function generateTableHead(data) {

    //adding a row to our THead (this makes the tr element, which becomes thead's child element)
    const row = thead.insertRow()

    //populating the table head (THead) by creating each th element manually and appending a text node to each of them
    for (let element of data) { // element (key name) of the data array (console.log(data))
        const th = document.createElement('th');
        const key = document.createTextNode(element);

        //for each th element we are appending a text node (which means we are displaying a text in each th)
        th.appendChild(key);

        //appending the th element to tr, so th becomes tr's child
        row.appendChild(th)
    }
    thead.appendChild(row)
}
generateTableHead(data)

// actually rendering the table
render()
function render() {
    const tableStuff = freelancers.map((freelancer) => {
        const row = table.insertRow();

        for (key in freelancer) {

            //creating a new cell for the row
            const cell = row.insertCell();
            const cellText = document.createTextNode(freelancer[key]) //using bracket notation to get the property value of the key

            // inserting text into the cell
            cell.appendChild(cellText)
        }
        return row;
    })
    tbody.replaceChildren(...tableStuff) // only works with replaceChildren, not sure why
    // other methods seem to add the entire existing array
}

// TODO: Write a function that updates the DOM to reflect the average starting price
function avgStartingPrice(arr) {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i].price
    }
    const avg = sum / arr.length

    const avgP = document.createTextNode(avg)
    averagePrice.replaceChildren(avgP)
}

// TODO: Write a function that generates a freelancer with a random name, occupation, and starting price. Push this returned object into the freelancers array
function generateFreelancer() {
    const startingPrice = function getPrice(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    const name = names[Math.floor(Math.random() * names.length)]
    const occupation = occupations[Math.floor(Math.random() * occupations.length)]

    freelancers.push({ name, price: startingPrice(40, 100), occupation });
    render();

    // you can remove this if you want to test more
    if (freelancers.length === 10) {
        clearInterval(addFreelancer) //stopping the interval. it has to have an argument to stop something
    }

    avgStartingPrice(freelancers)
}












