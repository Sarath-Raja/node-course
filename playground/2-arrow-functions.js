// const square = function(x){
//     return x*x;
// }

// const square = (x) => {
//     return x*x;
// }

// const square = x => x*x

const event = {
    name : "Birthday Party",
    guestList : ['Andrew', 'Jen', 'Mike'],
    printGuestList(){
        console.log(`Event is ${this.name}`);
        this.guestList.forEach(function (guest) {
            console.log(`${guest} is attending ${this.name}`)
        }, this); // Binding this of printGuestList to the callback function by passing thisArg parameter
    }
}

// const event = {
//     name : "Birthday Party",
//     guestList : ['Andrew', 'Jen', 'Mike'],
//     printGuestList(){
//         console.log(`Event is ${this.name}`);
//         this.guestList.forEach((guest)=>{
//             console.log(`${guest} is attending ${this.name}`)
//         });
//     }
// }
// console.log(square(3))

event.printGuestList();