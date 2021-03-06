import * as React from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import { SplashScreen } from "expo";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen, { HomeScreenParamList } from "screens/HomeScreen";
import DetailScreen, { DetailsScreenParamList } from "screens/DetailScreen";
import AddQuestionScreen from "screens/AddQuestionScreen";
import { Colors } from "constants/Colors";
import { Screens } from "constants/Screens";
import { Provider } from "react-redux";
import store from "store";

export type RootStackParamList = {
  [Screens.List]: HomeScreenParamList;
  [Screens.Details]: DetailsScreenParamList;
  [Screens.Add]: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App(props: { skipLoadingScreen: any; }) {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [initialNavigationState, setInitialNavigationState] = React.useState();
  const containerRef = React.useRef();

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHide();

        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          "nunito-bold": require("./assets/fonts/NunitoSans-Bold.ttf"),
          "nunito-regular": require("./assets/fonts/NunitoSans-Regular.ttf"),
          roboto: require("./assets/fonts/Roboto-Regular.ttf"),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hide();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return null;
  } else {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          {Platform.OS === "ios" && <StatusBar barStyle="default" />}
          <NavigationContainer
            ref={containerRef}
            initialState={initialNavigationState}
          >
            <Stack.Navigator
              screenOptions={{
                headerStyle: {
                  backgroundColor: Colors.appHeaderBackground,
                },
                headerTintColor: Colors.appHeaderText,
                headerTitleStyle: {
                  fontWeight: "bold",
                },
              }}
            >
              <Stack.Screen
                name={Screens.List}
                component={HomeScreen}
                initialParams={{ reload: false }}
                options={{
                  title: "Questions List",
                }}
              />
              <Stack.Screen name={Screens.Details} component={DetailScreen} />
              <Stack.Screen name={Screens.Add} component={AddQuestionScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
