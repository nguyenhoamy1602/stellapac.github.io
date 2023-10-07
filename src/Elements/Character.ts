import { AnimatedSprite, BaseTexture, Spritesheet } from 'pixi.js';
import basic from '../../assets/Characters/Basic/basic.json';

const spritesheet = new Spritesheet(BaseTexture.from(basic.meta.image), basic);
await spritesheet.parse();

class Character {
  body: AnimatedSprite;
  private randomMovementRange = 20;

  public async spawn() {
    // Create the SpriteSheet from data and image

    // Generate all the Textures asynchronously

    // spritesheet is ready to use!
    const anim = new AnimatedSprite(spritesheet.animations.basic);
    anim.animationSpeed = 0.2;
    anim.scale.set(3);
    anim.play();

    this.body = anim;
    return this;
  }

  moveUp(pixels: number) {
    this.body.position.y -= pixels;
  }

  moveDown(pixels: number) {
    this.body.position.y += pixels;
  }

  moveLeft(pixels: number) {
    this.body.position.x -= pixels;
  }

  moveRight(pixels: number) {
    this.body.position.x += pixels;
  }
}

export default Character;
