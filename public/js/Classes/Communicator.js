/**
 * Errorhandling for Client Server has its own...
 */
class Communicator {
  constructor(game) {
    this.game = game;
    game.__proto__.overtimeError = (overtime) => {
      // console.log(overtime);
      // console.log(this);
      this.expectedInterval = window.performance.now();
    };
  }
}
