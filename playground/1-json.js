const fs = require('fs');

// const book = {
//     title : "Ego is the enemy",
//     author : "Ryan Holiday"
// }
// console.log(book)
// const bookJSON = JSON.stringify(book);
// console.log(bookJSON)
// console.log(JSON.parse(bookJSON))

// fs.writeFileSync("1-JSON.json", bookJSON)
// const dataBuffer = fs.readFileSync("1-json.json")
// console.log(dataBuffer)
// const dataJSON = dataBuffer.toString()
// console.log(dataJSON)
// const data = JSON.parse(dataJSON)
// console.log(data)

const bufferData = fs.readFileSync('1-JSON.json');
const stringData = bufferData.toString();
const JSONData = JSON.parse(stringData);
console.log(JSONData)
JSONData["name"] = "Sarath Raja";
JSONData["age"] = 25;
console.log(JSONData)
const modifiedStringData = JSON.stringify(JSONData);
fs.writeFileSync("1-JSON.json", modifiedStringData)