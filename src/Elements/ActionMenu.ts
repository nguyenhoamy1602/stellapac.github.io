import * as PIXI from 'pixi.js';

interface MenuItem {
  text: string;
  callback: () => void;
}

class ActionMenu extends PIXI.Container {
  private background: PIXI.Graphics;
  private items: PIXI.Text[];

  constructor(items: MenuItem[]) {
    super();

    this.items = items.map((item) => {
      const text = new PIXI.Text(item.text, {
        fontSize: 16,
        fill: 0xffffff,
      });
      text.eventMode = 'static';
      text.on('pointerdown', () => {
        console.log(`Clicked ${item}`);
        item.callback();
        this.destroy();
      });
      return text;
    });

    this.background = new PIXI.Graphics();
    this.background.beginFill(0x000000, 0.8);
    this.background.drawRect(0, 0, 100, this.items.length * 20 + 10);
    this.background.endFill();
    this.addChild(this.background);

    this.items.forEach((item, index) => {
      item.position.set(5, index * 20 + 5);
      this.addChild(item);
    });
  }
}

export default ActionMenu;
