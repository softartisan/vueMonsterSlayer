new Vue({
  el: '#app',
  data: {
    playerHealth: 100,
    monsterHealth: 100,
    gameIsRunning: false,
    turns: []
  },
  methods: {
    startGame: function() {
      this.gameIsRunning = true;
      this.turns = [];
    },
    attack: function() {
      this.attackPlayer(5, 12);
      this.checkIfWin();
      if(this.gameIsRunning){
      this.attackMonster(3, 10);
      this.checkIfWin();
      }
    },
    specialAttack: function() {
      this.attackMonster(10, 20);
      this.checkIfWin();
    },
    heal: function() {
      
      if(this.playerHealth <= 90){
        this.playerHealth += 10;
        this.turns.unshift({
          isPlayer: true,
          text: 'Player heals herself for 10'
        })
      }else{
        this.playerHealth = 100;
      }
      this.attackPlayer(5, 12);
    },
    giveUp: function() {

    },
    attackMonster: function(min, max) {
      const damage = this.calculateDamage(min, max);
      this.monsterHealth -= damage;
      this.turns.unshift({
        isPlayer: true,
        text: 'Player hits monster for ' + damage
      })
    },
    attackPlayer: function(min, max) {
      const damage = this.calculateDamage(min, max);
      this.playerHealth -= damage;
      this.turns.unshift({
        isPlayer: false,
        text: 'Monster hits player for ' + damage
      })
    },
    checkIfWin: function() {
      if (this.monsterHealth <= 0){
        this.gameIsRunning = false;
        if (confirm('Ganaste!, pelear otra vez?')){
          this.startGame();
        }else{
          this.gameIsRunning = false;
        }
        this.resetHealth();
        this.turns = [];
      }
      if(this.playerHealth <= 0){
        if (confirm('Perdiste... Pelear otra vez?')){
          this.startGame();
        }else{
          this.gameIsRunning = false;
        }
        this.resetHealth();
        this.turns = [];
      }
    },
    resetHealth: function() {
      this.playerHealth = 100;
      this.monsterHealth = 100;
    },
    calculateDamage: function(min, max) {
      return Math.max(Math.floor(Math.random() * max) + 1, min);
    }
  }
})