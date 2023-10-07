import { AnimatedSprite, BaseTexture, Spritesheet } from 'pixi.js';
import chicken from '../../assets/Characters/Chicken/chicken.json';

const spritesheet = new Spritesheet(BaseTexture.from(chicken.meta.image), chicken);
await spritesheet.parse();

class Chicken {
  body: AnimatedSprite;
  private randomMovementRange = 20;

  public async spawn() {
    // Create the SpriteSheet from data and image

    // Generate all the Textures asynchronously

    // spritesheet is ready to use!
    const anim = new AnimatedSprite(spritesheet.animations.chicken);
    anim.animationSpeed = 0.2;
    anim.scale.set(3);
    anim.play();

    this.body = anim;
    return this;
  }

  public move() {
    this.body.position.x += (0.5 - Math.random()) * this.randomMovementRange;
    this.body.position.y += (0.5 - Math.random()) * this.randomMovementRange;
    this.body.rotation -= 0.01 * 10;
  }
}

export default Chicken;
