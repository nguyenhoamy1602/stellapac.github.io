import * as PIXI from 'pixi.js';
import { ActionMenu, Character, Chicken, Clock, Crop } from '../Elements';

class PlayfieldScene {
  private app: PIXI.Application;
  private container: PIXI.Container = new PIXI.Container();
  private chickens: Chicken[] = [];
  private crops: Crop[] = [];
  private player: Character;
  private planetary: any; // TODO: define planetary type

  private clock = new Clock();
  private sinceLastEvent = 0;

  constructor({ app, player, planetary }: { app: PIXI.Application; player: Character; planetary: any }) {
    this.app = app;
    this.player = player;
    this.planetary = planetary;

    this.app.stage.on('click', () => {
      console.log('click');
    });
    this.app.stage.eventMode = 'static';
  }

  public async initialize() {
    this.spawnPlayer();
    await this.spawnChickens();
    await this.spawnCrops('Corn', 0.1);
    this.container.addChild(this.clock.container);
  }

  private async spawnChickens(count = 7) {
    for (let i = 0; i < count; i++) {
      const chicken = await new Chicken().spawn();
      this.chickens.push(chicken);
      this.centerContainer(chicken.body);
      this.container.addChild(chicken.body);
    }
  }

  private centerContainer(container: PIXI.Container) {
    container.position.set(this.app.screen.width / 2, this.app.screen.height / 2);
  }

  private moveChickens(delta: number) {
    this.chickens.forEach((chicken) => chicken.move(delta));
  }

  private spawnPlayer() {
    this.player.setScale(2);
    this.centerContainer(this.player.container);
    this.container.addChild(this.player.container);
    console.log({ player: this.player, container: this.container });
    this.player.container.on('click', () => {
      const actionMenu = new ActionMenu([
        {
          text: 'Grow corn',
          callback: () => {
            console.log('grow corn');
            this.spawnCrops('Corn', 0.1);
          },
        },
        {
          text: 'Grow peas',
          callback: () => {
            console.log('grow peas');
            this.spawnCrops('Peas', 0.05);
          },
        },
        {
          text: 'Grow wheat',
          callback: () => {
            console.log('grow wheat');
            this.spawnCrops('Wheat', 0.05);
          },
        },

        {
          text: 'Spawn chicken',
          callback: () => {
            console.log('spawn chicken');
            this.spawnChickens(7);
          },
        },
      ]);
      actionMenu.position.set(this.player.position.x, this.player.position.y);
      this.player.container.addChild(actionMenu);
    });
  }

  private async spawnCrops(name: string, animationSpeed: number, count = 100) {
    this.crops.forEach((crop) => crop.container.destroy());
    const spacing = 50;
    const columns = 20;
    const initialX = 100;
    const initialY = 100;
    for (let i = 0; i < count; i++) {
      const crop = new Crop(name, animationSpeed);
      await crop.load();
      crop.setScale(3);
      crop.container.position.x = initialX + (i % columns) * spacing;
      crop.container.position.y = initialY + Math.floor(i / columns) * spacing;
      this.crops.push(crop);
      this.container.addChild(crop.container);
    }
  }

  public render(delta: number) {
    this.sinceLastEvent += delta;
    this.moveChickens(delta);
    this.clock.render(delta);
    // this.checkEvent();
  }

  private checkEvent() {
    if (this.sinceLastEvent > 5 * 60) {
      console.log('event');
      this.pause();
      const actionMenu = new ActionMenu([
        { text: 'Attack', callback: () => console.log('attack') },
        { text: 'Defend', callback: () => console.log('defend') },
        { text: 'Run', callback: () => console.log('run') },
        {
          text: 'Spawn chicken',
          callback: () => {
            console.log('spawn chicken');
            this.spawnChickens(7);
            this.resume();
            actionMenu.destroy();
          },
        },
      ]);
      this.centerContainer(actionMenu);
      this.container.addChild(actionMenu);
      this.sinceLastEvent = 0;
    }
  }

  private pause() {
    this.app.ticker.stop();
  }

  private resume() {
    this.app.ticker.start();
  }

  public getContainer() {
    return this.container;
  }

  public show() {
    this.container.visible = true;
  }

  public hide() {
    this.container.visible = false;
  }

  public isVisible() {
    return this.container.visible;
  }

  public onKeyDown(e: KeyboardEvent) {
    switch (e.keyCode) {
      case 87:
      case 38:
        this.player.moveUp(10);
        break;
      case 83:
      case 40:
        this.player.moveDown(10);
        break;
      case 65:
      case 37:
        this.player.moveLeft(10);
        break;
      case 68:
      case 39:
        this.player.moveRight(10);
        break;
    }
  }
}

export default PlayfieldScene;
