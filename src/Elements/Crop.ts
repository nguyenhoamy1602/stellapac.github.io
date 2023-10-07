import { AnimatedSprite, BaseTexture, Container, Spritesheet } from 'pixi.js';

/**
 * Animated crop class
 */
class Crop {
  /** Path to the crop spritesheet */
  public name: string;

  /** The animation speed of the crop */
  private animationSpeed;

  /** The position of the crop */
  public position: { x: number; y: number } = { x: 0, y: 0 };

  /** The animation of the crop */
  public animation: AnimatedSprite;

  /** The container of the crop */
  public container = new Container();

  constructor(name: string, animationSpeed = 0.01) {
    this.name = name;
    this.animationSpeed = animationSpeed;
  }

  /**
   * Load the crop spritesheet
   * @returns {Promise<void>}
   */
  async load() {
    const metadata = await import(`../../assets/Crops/${this.name}/${this.name.toLowerCase()}.json`);
    const spritesheet = new Spritesheet(BaseTexture.from(metadata.meta.image), metadata);
    await spritesheet.parse();
    const anim = new AnimatedSprite(spritesheet.animations.grow);
    anim.animationSpeed = this.animationSpeed;
    anim.anchor.set(0.5);
    anim.play();
    anim.loop = false;
    this.animation = anim;
    this.container.addChild(this.animation);
  }

  /**
   * Set the scale of the crop
   * @param {number} scale
   */
  public setScale(scale: number) {
    this.animation.scale.set(scale);
  }
}

export default Crop;
