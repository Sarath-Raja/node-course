const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(a<0 || b<0)
                reject("Numbers must be +ve");
            resolve(a+b)
        }, 2000)
    })
}


// Using Promise Chaining
// const doWork = () => {
//     add(1, 9).then((sum) => {
//         console.log(sum)
//         return add(sum, 10);
//     }).then((sum2)=>{
//         console.log(sum2)
//         return add(sum2, 10);
//     }).then((sum3) => {
//         console.log(sum3)
//     }).catch((err) => {
//         console.log(err)
//     })
// }

// Using async await
const doWork = async () => {
    const sum1 = await add(1, 9);
    console.log(sum1);
    const sum2 = await add(sum1, 10);
    console.log(sum2)
    const sum3 = await add(sum2, 10);
    console.log(sum3)
}

doWork();