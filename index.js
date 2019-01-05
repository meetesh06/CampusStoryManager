import { Navigation } from "react-native-navigation";
import Initializing from "./screens/Initializing";
import Home from "./screens/Home";
import createEventScreen from "./screens/createEventScreen";

Navigation.registerComponent(`Initializing Screen`, () => Initializing);
Navigation.registerComponent(`Home Screen`, () => Home);
Navigation.registerComponent(`Create Event Screen`, () => createEventScreen);

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      component: {
        name: "Initializing Screen"
      }
    }
  });
});