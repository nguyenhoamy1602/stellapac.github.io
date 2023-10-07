import CharacterSelectionScene from './Scene/CharacterSelection';
import PlanetarySelectionScene from './Scene/PlanetarySelection';
import PlayfieldScene from './Scene/Playfield';

interface Store {
  characterScene: CharacterSelectionScene;
  planetaryScene: PlanetarySelectionScene;
  playfieldScene: PlayfieldScene;
}

const store: Store = {} as Store;

export default store;
