'use strict';

module.exports = class Card {
    constructor(workouttype, exercise, reps) {
        this.workouttype = workouttype,
        this.exercise = exercise,
        this.reps = reps
    }

    toString() {
        return `<tr><td>${this.workouttype}</td><td>${this.exercise}</td><td>${this.reps}</td></tr>`;
    }
};

module.exports = class User {
    constructor(name, email, phone) {
        this.name = name,
        this.email = email,
        this.phone = phone
    }

    toString() {
        return `<tr><td>${this.name}</td><td>${this.email}</td><td>${this.phone}</td></tr>`;
    }
};
// 'use strict';

// module.exports = class User {
//     constructor(name, email, phone) {
//         this.name = name,
//         this.email = email,
//         this.phone = phone
//     }

//     toString() {
//         return `<tr><td>${this.name}</td><td>${this.email}</td><td>${this.phone}</td></tr>`;
//     }
// };