import store from '../store';
import BaseSelectionScene from './BaseSelection';
import PlayfieldScene from './Playfield';

// Define the character selection scene class
class PlanetarySelectionScene extends BaseSelectionScene {
  textures = [
    '../../assets/Characters/Andrew JackSUN/andrew_jacksun.json',
    '../../assets/Characters/George Washingstar/george_washingstar.json',
    '../../assets/Characters/ZZorge III/zzorge_iii.json',
  ];
  title = 'Select Your Planetary';

  async onComplete(): Promise<void> {
    super.onComplete();
    store.planetaryScene.getContainer().destroy();
    const playfieldScene = new PlayfieldScene({
      app: this.app,
      player: store.characterScene.getSelected(),
      planetary: store.planetaryScene.getSelected(),
    });
    await playfieldScene.initialize();
    this.app.stage.addChild(playfieldScene.getContainer());
    store.playfieldScene = playfieldScene;
    document.addEventListener('keydown', (e) => playfieldScene.onKeyDown(e));
    this.app.ticker.add((delta) => {
      playfieldScene.render(delta);
    });
  }
}

export default PlanetarySelectionScene;
