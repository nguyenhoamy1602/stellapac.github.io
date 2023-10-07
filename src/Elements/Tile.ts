import { Sprite } from 'pixi.js';

const sprite = Sprite.from('../../assets/Tilesets/Tilled Dirt/tile000.png');

class Tile {
  body: Sprite;

  constructor() {
    this.body = sprite;
  }
}

export default Tile;
