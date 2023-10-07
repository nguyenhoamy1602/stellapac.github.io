import * as PIXI from 'pixi.js';
import Character from './Elements/Character';
import Chicken from './Elements/Chicken';
import CharacterSelection from './Scene/CharacterSelection';

const app = new PIXI.Application({ background: '#1099bb', resizeTo: window });

const container = new PIXI.Container();

const characterSelection = new CharacterSelection(app);
characterSelection.load();
characterSelection.create();
app.stage.addChild(characterSelection.getContainer());

const chickens: Chicken[] = [];
for (let i = 0; i < 5; i++) {
  const chicken = await new Chicken().spawn();
  chickens.push(chicken);
  container.addChild(chicken.body);
}

const player = await new Character().spawn();
container.addChild(player.body);

// Move container to the center
container.x = app.screen.width / 2;
container.y = app.screen.height / 2;

// Center bunny sprite in local container coordinates
container.pivot.x = container.width / 2;
container.pivot.y = container.height / 2;

// // Listen for animate update
app.ticker.add((delta) => {
  // rotate the container!
  // use delta to create frame-independent transform
  // container.rotation -= 0.01 * delta;
  chickens.forEach((chicken) => chicken.move());
});

const onKeyDown = (e: KeyboardEvent) => {
  // W Key is 87
  // Up arrow is 87
  switch (e.keyCode) {
    case 87:
    case 38:
      player.moveUp(10);
      break;
    case 83:
    case 40:
      player.moveDown(10);
      break;
    case 65:
    case 37:
      player.moveLeft(10);
      break;
    case 68:
    case 39:
      player.moveRight(10);
      break;
  }
};

document.body.appendChild(app.view);
// Add the 'keydown' event listener to our document
document.addEventListener('keydown', onKeyDown);
