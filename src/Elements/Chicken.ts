import { AnimatedSprite, BaseTexture, Spritesheet } from 'pixi.js';
import chicken from '../../assets/Characters/Chicken/chicken.json';

const spritesheet = new Spritesheet(BaseTexture.from(chicken.meta.image), chicken as any);
await spritesheet.parse();

class Chicken {
  body: AnimatedSprite;
  private readonly randomMovementRange = 30;
  private readonly movementInterval = 7;
  private readonly animationSpeed = 0.05;
  timeSinceMoved = 0;

  public async spawn() {
    // Create the SpriteSheet from data and image

    // Generate all the Textures asynchronously

    // spritesheet is ready to use!
    const anim = new AnimatedSprite(spritesheet.animations.chicken);
    anim.animationSpeed = this.animationSpeed;
    anim.scale.set(3);
    anim.play();

    this.body = anim;
    return this;
  }

  public move(delta: number) {
    this.timeSinceMoved += delta;
    if (this.timeSinceMoved < this.movementInterval) {
      return;
    }
    this.body.position.x += (0.5 - Math.random()) * this.randomMovementRange;
    this.body.position.y += (0.5 - Math.random()) * this.randomMovementRange;
    this.timeSinceMoved = 0;
    // this.body.rotation -= 0.01 * 10;
  }
}

export default Chicken;
