import { Navigation } from 'react-native-navigation'
import Icon from 'react-native-vector-icons/AntDesign';

export const goInitializing = () => Navigation.setRoot({
    root: {
        stack: {
          id: 'Initializing Screen',
          children: [
            {
              component: {
                name: 'Initializing Screen',
                options: {
                  topBar: {
                    visible: false,
                    drawBehind: true,
                  }
                }
              }
            },
        ],
        }
      }
});

export const goHome = async () => {
  const homeIcon = await Icon.getImageSource('home', 30);
  const areaChartIcon = await Icon.getImageSource('linechart', 30);
  const profileIcon = await Icon.getImageSource('profile', 30);
  return Navigation.setRoot({
    root: {
      bottomTabs: {
        id: 'BottomTabsId',
        children: [
          {
            stack: {
              id: "Home Stack",
              options: {
                topBar: {
                  visible: false,
                  drawBehind: true,
                }
              },
              children: [
                {
                  component: {
                    name: 'Home Screen',
                    options: {
                      bottomTab: {
                        fontSize: 10,
                        selectedFontSize: 12,
                        text: 'Home',
                        icon: homeIcon,
                        selectedIconColor: '#FF4A3F'
                      }
                    }
                  }
                }
              ]
            }
          },
          {
            component: {
              name: 'Home Screen',
              options: {
                bottomTab: {
                  text: 'Manage',
                  fontSize: 10,
                  selectedFontSize: 12,
                  icon: areaChartIcon,
                  selectedIconColor: '#FF4A3F'
                }
              }
            },
          },
          {
            component: {
              name: 'Home Screen',
              options: {
                bottomTab: {
                  text: 'Profile',
                  fontSize: 10,
                  selectedFontSize: 12,
                  icon: profileIcon,
                  selectedIconColor: '#FF4A3F'
                },
                topBar: {
                  visible: false
                }
              }
            },
          },
        ],
      }
    }
  });
}

// export const goHome = () => ;