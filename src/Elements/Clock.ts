import * as PIXI from 'pixi.js';

class Clock {
  private createdAt: Date = new Date();
  public timePassed: number = 0;
  private month: number = 0;
  private year: number = 0;

  private monthText: PIXI.Text;
  private yearText: PIXI.Text;

  public container: PIXI.Container = new PIXI.Container();

  constructor() {
    this.container.position.set(0, 0);

    this.month = this.createdAt.getMonth() + 1;
    this.year = this.createdAt.getFullYear();

    this.monthText = new PIXI.Text(`Month: ${this.month}`, { fill: 'white' });
    this.yearText = new PIXI.Text(`Year: ${this.year}`, { fill: 'white' });

    this.monthText.position.set(150, 0);
    this.yearText.position.set(300, 0);

    this.container.addChild(this.monthText);
    this.container.addChild(this.yearText);
  }

  public render(timePassed: number) {
    this.timePassed += timePassed;

    const now = new Date();
    now.setDate(this.createdAt.getDate() + (this.timePassed / 60) * 50);
    this.month = now.getMonth() + 1;
    this.year = now.getFullYear();

    this.monthText.text = `Month: ${this.month}`;
    this.yearText.text = `Year: ${this.year}`;
  }
}

export default Clock;
