// setTimeout(()=>{
//     console.log("2 seconds are up")
// }, 2000)


// const names = ['Andrew', 'Jen', 'Jess'];
// const shortNames = names.filter((name)=>{
//     return name.length <= 4
// });
// console.log(shortNames)


// const geocode = (address, callback) => {
//     setTimeout(()=>{
//         const data = {
//             latitude: 0,
//             longitude: 0
//         }
//         callback(data)
//     }, 2000)
// }

// const data = geocode('Los angeles', (data)=>{
//     console.log(data)
// })


//
// Goal: Mess around with the callback pattern
//
// 1. Define an add function that accepts the correct arguments
// 2. Use setTimeout to simulate a 2 second delay
// 3. After 2 seconds are up, call the callback function with the sum
// 4. Test your work!

// const add = (num1, num2, callback) => {
//     setTimeout(() => {
//         const result = num1+num2;
//         callback(result)
//     }, 2000);
// }

// add(1, 4, (sum) => {
//     console.log(sum) // Should print: 5
// })


const doTaskCallback = (callback) => {
    setTimeout(()=>{
        //callback('Error', undefined)
        callback(undefined, [1,2,3])
    },2000)
}

doTaskCallback((err, data)=>{
    if(err)
        return console.log(err)
    console.log(data)
})