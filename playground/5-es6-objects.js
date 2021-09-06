const name = "sarath";
const userAge = 25;
const person = {
    name,
    age: 25,
    location: 'Nellore'
}
//console.log(person)

const product = {
    label: "red notebook",
    price: 100, 
    stock: 230,
    salePrice: undefined
}
const {label, price, rating=5} = product
// console.log(label)
// console.log(price)
// console.log(rating)

const transaction = (type, { label, stock = 0 } = {}) => {
    console.log(type, label, stock);
}

transaction('order', product)
transaction('order', )