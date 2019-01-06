import { Navigation } from "react-native-navigation";
import Initializing from "./screens/Initializing";
import Home from "./screens/Home";
import createEventScreen from "./screens/createEventScreen";
import createPostScreen from "./screens/createPostScreen";
import conductPollScreen from "./screens/conductPollScreen";
import postVideoScreen from "./screens/postVideoScreen";

Navigation.registerComponent(`Initializing Screen`, () => Initializing);
Navigation.registerComponent(`Home Screen`, () => Home);
Navigation.registerComponent(`Create Event Screen`, () => createEventScreen);
Navigation.registerComponent(`Create Post Screen`, () => createPostScreen);
Navigation.registerComponent(`Conduct Poll Screen`, () => conductPollScreen);
Navigation.registerComponent(`Post Video Screen`, () => postVideoScreen);

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      component: {
        name: "Initializing Screen"
      }
    }
  });
});