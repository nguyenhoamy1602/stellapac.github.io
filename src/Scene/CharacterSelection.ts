import * as PIXI from 'pixi.js';
import PlanetarySelectionScene from './PlatenarySelection';

// Define the character selection scene class
class CharacterSelectionScene {
  private app: PIXI.Application;
  private container: PIXI.Container;
  private characters: PIXI.Sprite[];
  private selectedCharacterIndex: number;
  private defaultScale = 20;

  constructor(app: PIXI.Application) {
    this.app = app;
    this.container = new PIXI.Container();
    this.characters = [];
    this.selectedCharacterIndex = 0;
  }

  // Load the necessary assets for the scene
  public async load(): Promise<void> {
    await this.loadCharacters();
  }

  // Create the scene elements
  public create(): void {
    this.createBackground();
    this.createTitle();
    this.createCharacters();
    this.createConfirmButton();
  }

  // Load the character sprites
  private async loadCharacters(): Promise<void> {
    const characterTextures = [
      'assets/Characters/basic/tile000.png',
      'assets/Characters/basic/tile001.png',
      'assets/Characters/basic/tile002.png',
    ];

    this.characters = characterTextures.map((texture, index) => {
      const character = new PIXI.Sprite(PIXI.Texture.from(texture));
      character.on('click', () => {
        this.selectCharacter(index);
      });
      character.eventMode = 'static';
      return character;
    });
  }

  // Create the background
  private createBackground(): void {
    const background = new PIXI.Graphics();
    background.beginFill(0x000000);
    background.drawRect(0, 0, this.app.screen.width, this.app.screen.height);
    background.endFill();
    this.container.addChild(background);
  }

  // Create the title
  private createTitle(): void {
    const title = new PIXI.Text('Select Your Character', {
      fontFamily: 'Arial',
      fontSize: 48,
      fill: 0xffffff,
      align: 'center',
    });
    title.anchor.set(0.5);
    title.position.set(this.app.screen.width / 2, 100);
    this.container.addChild(title);
  }

  // Create the character sprites
  private createCharacters(): void {
    this.characters.forEach((character, index) => {
      character.position.set((this.app.screen.width / 4) * (index + 1), this.app.screen.height / 2);
      character.anchor.set(0.5);
      character.scale.set(this.defaultScale);
      this.container.addChild(character);
    });
    this.selectCharacter(this.selectedCharacterIndex);
  }

  private createConfirmButton(): void {
    const button = new PIXI.Text('Confirm', {
      fontFamily: 'Arial',
      fontSize: 48,
      fill: 0xffffff,
      align: 'center',
    });
    button.anchor.set(0.5);
    button.position.set(this.app.screen.width / 2, this.app.screen.height - 100);
    button.eventMode = 'static';
    button.on('click', () => {
      this.container.destroy();
      this.app.stage.removeChildren();
      this.app.stage.addChild(new PlanetarySelectionScene(this.app).getContainerAndInitialize());
    });
    this.container.addChild(button);
  }

  // Select a character
  private selectCharacter(index: number): void {
    if (index < 0 || index >= this.characters.length) {
      return;
    }
    this.characters[this.selectedCharacterIndex].scale.set(this.defaultScale);
    this.selectedCharacterIndex = index;
    this.characters[this.selectedCharacterIndex].scale.set(this.defaultScale * 1.2);
  }

  // Get the scene container
  public getContainer(): PIXI.Container {
    return this.container;
  }
}

export default CharacterSelectionScene;
