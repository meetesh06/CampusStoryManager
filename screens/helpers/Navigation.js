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
                        iconColor: '#c0c0c0',
                        textColor: '#c0c0c0',
                        selectedIconColor: '#555'
                      },
                      topBar: {
                        visible: false,
                        drawBehind: true,
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
                  iconColor: '#c0c0c0',
                  textColor: '#c0c0c0',
                  selectedIconColor: '#555'
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
                  iconColor: '#c0c0c0',
                  textColor: '#c0c0c0',
                  selectedIconColor: '#555'
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