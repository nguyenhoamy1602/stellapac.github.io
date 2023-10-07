import BaseSelectionScene from './BaseSelection';
import store from '../store';
import PlanetarySelectionScene from './PlanetarySelection';

// Define the character selection scene class
class CharacterSelectionScene extends BaseSelectionScene {
  textures = [
    '../../assets/Characters/Andrew JackSUN/andrew_jacksun.json',
    '../../assets/Characters/George Washingstar/george_washingstar.json',
    '../../assets/Characters/ZZorge III/zzorge_iii.json',
  ];
  title = 'Select Your Character';

  async onComplete(): Promise<void> {
    super.onComplete();
    store.characterScene.getContainer().destroy();
    const planetaryScene = new PlanetarySelectionScene(this.app);
    await planetaryScene.initialize();
    this.app.stage.addChild(planetaryScene.getContainer());
    store.planetaryScene = planetaryScene;
  }
}

export default CharacterSelectionScene;
