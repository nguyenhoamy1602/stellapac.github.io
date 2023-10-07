import * as PIXI from 'pixi.js';
import Character from '../Elements/Character';

// Define the character selection scene class
class BaseSelectionScene {
  /** The PIXI application */
  app: PIXI.Application;

  /** The PIXI container */
  private container: PIXI.Container;

  /** The selection sprites */
  private selections: Character[];

  /** The selected index */
  private selectedIndex: number;

  /** The default scale of the sprites */
  private readonly defaultScale = 5;

  /** The textures of the characters */
  textures: string[] = [];

  /** The title of the scene */
  title: string = '';

  constructor(app: PIXI.Application) {
    this.app = app;
    this.container = new PIXI.Container();
    this.selections = [];
    this.selectedIndex = 1;
  }

  /** Load the necessary assets for the scene */
  public async load(): Promise<void> {
    await this.loadCharacters();
  }

  /** Create the scene */
  public create(): void {
    this.createBackground();
    this.createTitle();
    this.createCharacters();
    this.createConfirmButton();
  }

  /** Load the characters */
  private async loadCharacters(): Promise<void> {
    this.selections = await Promise.all(
      this.textures.map(async (texture, index) => {
        const character = new Character(texture);
        await character.load();
        character.container.on('click', () => {
          this.selectCharacter(index);
        });
        character.container.eventMode = 'static';
        return character;
      }),
    );
  }

  /** Create the background */
  private createBackground(): void {
    const background = new PIXI.Graphics();
    // background.beginFill(0xffffff);
    background.drawRect(0, 0, this.app.screen.width, this.app.screen.height);
    background.endFill();
    this.container.addChild(background);
  }

  /* Create the title */
  private createTitle(): void {
    const pixiTitle = new PIXI.Text(this.title, {
      fontFamily: 'Arial',
      fontSize: 48,
      fill: 0x000000,
      align: 'center',
    });
    pixiTitle.anchor.set(0.5);
    pixiTitle.position.set(this.app.screen.width / 2, 100);
    this.container.addChild(pixiTitle);
  }

  /** Create the characters */
  private createCharacters(): void {
    this.selections.forEach((character, index) => {
      character.setScale(this.defaultScale);
      const characterContainer = character.container;
      characterContainer.position.set((this.app.screen.width / 4) * (index + 1), this.app.screen.height / 2);
      this.container.addChild(characterContainer);
    });
    this.selectCharacter(this.selectedIndex);
  }

  /** Create the confirm button */
  private createConfirmButton(): void {
    const button = new PIXI.Text('Confirm', {
      fontFamily: 'Arial',
      fontSize: 48,
      fill: 0x000000,
      align: 'center',
    });
    button.anchor.set(0.5);
    button.position.set(this.app.screen.width / 2, this.app.screen.height - 100);
    button.eventMode = 'static';
    button.on('click', () => {
      this.onComplete();
    });
    this.container.addChild(button);
  }

  /** On complete */
  onComplete(): void {
    console.log('onComplete');
    this.selections.forEach((character) => {
      character.container.removeAllListeners();
    });
  }

  /** Select a character */
  private selectCharacter(index: number): void {
    if (index < 0 || index >= this.selections.length) {
      return;
    }
    this.selections[this.selectedIndex].setScale(this.defaultScale * 1);
    this.selectedIndex = index;
    this.selections[this.selectedIndex].setScale(this.defaultScale * 1.2);
  }

  /** Get the selected character */
  public getSelected(): Character {
    return this.selections[this.selectedIndex];
  }

  /** Initialize the scene */
  public async initialize(): Promise<PIXI.Container> {
    await this.load();
    this.create();
    return this.container;
  }

  /** Get the container */
  public getContainer(): PIXI.Container {
    return this.container;
  }
}

export default BaseSelectionScene;
