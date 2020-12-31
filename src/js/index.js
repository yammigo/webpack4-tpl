console.log(Promise)
let mySet = new Set();
mySet.add(1); // Set(1) {1}
mySet.add(5); // Set(2) {1, 5}
mySet.add(5); // Set(2) {1, 5} 这里体现了值的唯一性
mySet.add("some text");
console.log(mySet)

class Name {
    constructor() {
        this.name = "fanjiantao"
    }
}
console.log(new Name())