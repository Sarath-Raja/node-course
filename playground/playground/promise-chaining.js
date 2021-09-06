require("../src/db/mongoose");
const User = require("../src/models/user")

// User.findByIdAndUpdate("6027f01857c0aa1a1c93622b", {age: 26}).then((user) => {
//     console.log(user)
//     return User.countDocuments({age: 26});
// }).then((count) => {
//     console.log(count)
// }).catch((err) => {
//     console.log(err);
// })


const updateAgeAndCount = async (id, age) => {
    const userId = await User.findByIdAndUpdate(id, { age });
    const count = await User.countDocuments({ age });
    return count;
}

updateAgeAndCount("6027f01857c0aa1a1c93622b", 55).then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e);
})