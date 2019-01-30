import { Navigation } from "react-native-navigation";
import Initializing from "./screens/Initializing";
import Home from "./screens/Home";
import createEventScreen from "./screens/createEventScreen";
import addToStory from "./screens/addToStory";
import conductPollScreen from "./screens/conductPollScreen";
import videoModalScreen from "./screens/videoModalScreen";
import analyticsScreen from "./screens/analyticsScreen";
import eventDetail from "./screens/eventDetail";
import profileScreen from "./screens/profileScreen";

Navigation.registerComponent(`Initializing Screen`, () => Initializing);
Navigation.registerComponent(`Home Screen`, () => Home);
Navigation.registerComponent(`Create Event Screen`, () => createEventScreen);
Navigation.registerComponent(`Add To Story Screen`, () => addToStory);
Navigation.registerComponent(`Conduct Poll Screen`, () => conductPollScreen);
Navigation.registerComponent(`Video Modal Screen`, () => videoModalScreen);
Navigation.registerComponent(`Analytics Screen`, () => analyticsScreen);
Navigation.registerComponent(`Event Detail Screen`, () => eventDetail);
Navigation.registerComponent(`Profile Screen`, () => profileScreen);
// Navigation.registerComponent(`Post Video Screen`, () => postVideoScreen);

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      component: {
        name: "Initializing Screen"
      }
    }
  });
});