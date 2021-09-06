// const doTaskPromise = new Promise((resolve, reject) => {
//     setTimeout(()=>{
//         //reject('error');
//         resolve([1,2,3])
//     })
// })

// doTaskPromise.then((data)=>{
//     console.log(data)
// }).catch((error)=>{
//     console.log(error)
// })

const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(a + b)
        }, 2000)
    })
}

// Nested Promises

// add(1, 2).then((sum) => {
//     console.log(sum)
//     add(sum, 5).then((result) => {
//         console.log(result)
//     }).catch((e) => { 
//         console.log(e)
//     })
// }).catch((e) => {
//     console.log(e)
// })

// Promise Chaining

add(1,2).then((sum) => {
    console.log(sum);
    return add(sum, 5)
}).then((result) => {
    console.log(result)
}).catch((e) => {
    console.log(e)
})