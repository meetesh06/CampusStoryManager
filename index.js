import {Platform, AppState} from 'react-native';
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
import StoryScreen from "./screens/StoryScreen";
import SessionStore from './SessionStore';
import NavigationComponents from './NavigationComponents';

this.state = {
  appState : AppState.currentState,
};

Navigation.registerComponent(`Initializing Screen`, () => Initializing);
Navigation.registerComponent(`Home Screen`, () => Home);
Navigation.registerComponent(`homeTopBar`, () => NavigationComponents.HOME_TOP_BAR);
Navigation.registerComponent(`storyTopBar`, () => NavigationComponents.STORY_TOP_BAR);
Navigation.registerComponent(`home.ArchiveIcon`, () => NavigationComponents.ARCHIVE_ICON);
Navigation.registerComponent(`home.CreateEventIcon`, () => NavigationComponents.CREATE_EVENT_ICON);
Navigation.registerComponent(`story.HelpIcon`, () => NavigationComponents.HELP_STORY_ICON);
Navigation.registerComponent(`story.DoneIcon`, () => NavigationComponents.DONE_STORY_ICON);
Navigation.registerComponent(`Create Event Screen`, () => createEventScreen);
Navigation.registerComponent(`Add To Story Screen`, () => addToStory);
Navigation.registerComponent(`Conduct Poll Screen`, () => conductPollScreen);
Navigation.registerComponent(`Video Modal Screen`, () => videoModalScreen);
Navigation.registerComponent(`Analytics Screen`, () => analyticsScreen);
Navigation.registerComponent(`Event Detail Screen`, () => eventDetail);
Navigation.registerComponent(`Profile Screen`, () => profileScreen);
Navigation.registerComponent(`Story Screen`, () => StoryScreen);

init = () =>{
  Navigation.setRoot({
    root: {
      component: {
        name: "Initializing Screen"
      }
    }
  });
}

Navigation.events().registerAppLaunchedListener(async () => {
  AppState.addEventListener('change', this.onAppStateChanged);
  const store = new SessionStore();
  // this.checkCodePushUpdate();
  await store.getValueBulk();
  this.init();
});

onAppStateChanged = (nextAppState) => {
  if (this.state.appState.match(/inactive|background/) && nextAppState === 'active'){
    console.log('Background - Forground');
  } else if(nextAppState === 'background') {
    console.log('Background');
    // if(Platform.OS === 'android') this.submission();
  } else if(nextAppState === 'active'){
    console.log('Forground');
  } else if(nextAppState === 'inactive'){
    console.log('Inactive');
    // if(Platform.OS === 'ios') this.submission();
  }
  this.state.appState = nextAppState;
};