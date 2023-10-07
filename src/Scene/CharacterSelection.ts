import * as PIXI from 'pixi.js';

// Define the character selection scene class
class CharacterSelectionScene {
  private app: PIXI.Application;
  private container: PIXI.Container;
  private characters: PIXI.Sprite[];
  private selectedCharacterIndex: number;

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
    // this.createButtons();
  }

  // Load the character sprites
  private async loadCharacters(): Promise<void> {
    const characterTextures = [
      'assets/Characters/basic/tile000.png',
      'assets/Characters/basic/tile001.png',
      'assets/Characters/basic/tile002.png',
    ];

    this.characters = characterTextures.map((texture) => {
      return new PIXI.Sprite(PIXI.Texture.from(texture));
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
      console.log({ character, index });
      character.anchor.set(0.5);
      character.scale.set(20);
      this.container.addChild(character);
    });
    this.selectCharacter(this.selectedCharacterIndex);
  }

  // Create the buttons

  // Select a character
  private selectCharacter(index: number): void {
    if (index < 0 || index >= this.characters.length) {
      return;
    }
    this.characters[this.selectedCharacterIndex].scale.set(1);
    this.selectedCharacterIndex = index;
    this.characters[this.selectedCharacterIndex].scale.set(1.2);
  }

  // Get the scene container
  public getContainer(): PIXI.Container {
    return this.container;
  }
}

export default CharacterSelectionScene;
