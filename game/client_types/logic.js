/**
 * # Logic type implementation of the game stages
 * Copyright(c) 2019 Alejandro Velasco <javier.velasco@urosario.edu.co>
 * MIT Licensed
 *
 * http://www.nodegame.org
 * ---
 */

"use strict";

var ngc = require('nodegame-client');
var stepRules = ngc.stepRules;
var constants = ngc.constants;
var J = ngc.JSUS;
var counter = 0;

module.exports = function(treatmentName, settings, stager, setup, gameRoom) {

    var node = gameRoom.node;
    var channel =  gameRoom.channel;

    // Must implement the stages here.

    // Increment counter.
    counter = counter ? ++counter : settings.SESSION_ID || 1;

    stager.setOnInit(function() {

      node.on.data('quiz-over', function(msg) {
          // Move client to part2.
          // (async so that it finishes all current step operations).
    });
});

    stager.extendStep('bienvenida', {
        cb: function() {
            console.log('Bienvenida');
        }
    });

    stager.extendStep('instructions', {
        cb: function() {
            console.log('Instructions...');
            node.game.p = Math.random();
        }
    });

    stager.extendStep('tutorial_Training', {
        cb: function() {
            console.log('tutorial_Training...');
            entrenamiento(node.game.p);
        }
    });

    stager.extendStep('puntaje_training', {
        cb: function() {
            console.log('puntaje_training...');
            entrenamiento(node.game.p);
        }
    });

    stager.extendStep('game_training', {
        cb: function() {
            console.log('game_training...');
            perros();
        }
    });

    stager.extendStep('tiempo', {
    cb: function() {
        console.log('tiempo...');
        }
    });

    stager.extendStep('recompensa', {
    cb: function() {
        console.log('recompensa...');
        }
    });

    stager.extendStep('quiz', {
        cb: function() {
            console.log('Quiz...');
        }
    });

    stager.extendStep('training', {
        cb: function() {
            console.log('Training...');
            entrenamiento(node.game.p);
        }
    });

    stager.extendStep('puntaje', {
        cb: function() {
            console.log('Score');
        }
    });

    stager.extendStep('game', {
        cb: function() {
            console.log('\n--------------------------------');
            console.log('Game round: ' + node.player.stage.round);
            perros();
        }
    });

    stager.extendStep('rating', {
        cb: function() {
            console.log('rating...');
        }
    });

    stager.extendStep('demograf', {
      cb: function() {
      console.log('demograf...');
      }
    });

    stager.extendStep('end', {
        cb: function() {
            rands();
            node.game.memory.save(channel.getGameDir() + 'data/data_' +
                                  node.nodename + '.json');

            node.on.data('Recompensa', function(msg) {
              console.log('*************************************');
              console.log('Recompensa:', msg.from, ' ', msg.data);
              console.log('*************************************');
            });
        }
    });

    stager.setOnGameOver(function() {

        // Something to do.

    });

    // Here we group together the definition of the game logic.
    return {
        nodename: 'lgc' + counter,
        // Extracts, and compacts the game plot that we defined above.
        plot: stager.getState(),

    };

    function rands(){

      var players = node.game.pl.id.getAllKeys();

      // var rand1 = 1;
      // var rand2 = 2;
      var rand1 = Math.floor(Math.random()*6) + 26;
      var rand2 = Math.floor(Math.random()*6) + 44;
      node.say('Rondas', players[0], [rand1, rand2]);
    }

    function entrenamiento(p) {
      var players = node.game.pl.id.getAllKeys();

      var as = [];
      var bs = [];
      var cs = [];
      var ds = [];
      var sendt = []
      var sendh = []
      var dict = {};

      for (var i=1; i < 13; i++) {
        as[i - 1] = 'A' + i + '.jpg';
      }

      for (var i=1; i < 13; i++) {
        bs[i - 1] = 'B' + i + '.jpg';
      }

      for (var i=1; i < 13; i++) {
        cs[i - 1] = 'C' + i + '.jpg';
      }

      for (var i=1; i < 13; i++) {
        ds[i - 1] = 'D' + i + '.jpg';
      }

      for(var i = 1; i < 13; i++){
        dict[as[i - 1]] = "A";
      }

      for(var i = 1; i < 13; i++){
        dict[bs[i - 1]] = "B";
      }

      for(var i = 1; i < 13; i++){
        dict[cs[i - 1]] = "C";
      }

      for(var i = 1; i < 13; i++){
        dict[ds[i - 1]] = "D";
      }

      var terrier = as.concat(cs);
      var hound = bs.concat(ds);

      terrier.sort(function(a, b){return 0.5 - Math.random()});
      hound.sort(function(a, b){return 0.5 - Math.random()});

      for(var i = 1; i < 6; i++){
        sendt.push(terrier[i]);
        sendh.push(hound[i]);
      }

      if(p < 0.5){
        node.say('Settings', players[0], [players[0], sendt, dict, 'terrier']);
      } else {
        node.say('Settings', players[0], [players[0], sendh, dict, 'hound']);
      }

    }

    function perros(){

      var players = node.game.pl.id.getAllKeys();

      var as = [];
      var bs = [];
      var cs = [];
      var ds = [];
      var send = []
      var dict = {};

      for (var i=1; i < 13; i++) {
        as[i - 1] = 'A' + i + '.jpg';
      }

      for (var i=1; i < 13; i++) {
        bs[i - 1] = 'B' + i + '.jpg';
      }

      for (var i=1; i < 13; i++) {
        cs[i - 1] = 'C' + i + '.jpg';
      }

      for (var i=1; i < 13; i++) {
        ds[i - 1] = 'D' + i + '.jpg';
      }

      for(var i = 1; i < 13; i++){
        dict[as[i - 1]] = "A";
      }

      for(var i = 1; i < 13; i++){
        dict[bs[i - 1]] = "B";
      }

      for(var i = 1; i < 13; i++){
        dict[cs[i - 1]] = "C";
      }

      for(var i = 1; i < 13; i++){
        dict[ds[i - 1]] = "D";
      }

      var perros = as.concat(bs, cs, ds);

      perros.sort(function(a, b){return 0.5 - Math.random()});

      for(var i = 1; i < 6; i++){
        send.push(perros[i]);
      }
      console.log(send);

      // console.log(perros);

      node.say('Settings', players[0], [players[1], send, dict]);
    }

};
