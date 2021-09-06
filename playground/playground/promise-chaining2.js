require("../src/db/mongoose")
const Task = require("../src/models/task")

// Task.findByIdAndDelete("6027f310666b7b1f8470b1f9").then((deletedItem) => {
//     console.log(deletedItem)
//     return Task.countDocuments({completed: false});
// }).then((count) => {
//     console.log(count)
// }).catch(e=>console.log(e))

const deleteAndCount = async (id) => {
    await Task.findByIdAndDelete(id);
    const count = await Task.countDocuments({completed: false});
    return count;
}

deleteAndCount("6027f29542515423907f5189").then((count) => {
    console.log(count)
}).catch((e) => { 
    console.log(e)
})