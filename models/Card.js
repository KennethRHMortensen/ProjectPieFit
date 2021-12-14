"use strict";

module.exports = class Card {
  constructor(workouttype, exercise, reps) {
    (this.workouttype = workouttype),
      (this.exercise = exercise),
      (this.reps = reps);
  }

  toString() {
    return `<tr><th><td>${this.workouttype}</td></th></tr> + '\n' + 
    <tr><td>${this.exercise}</td></tr>
    <td>${this.reps}</td>`;
  }
};
