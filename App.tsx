import * as React from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import { SplashScreen } from "expo";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import BottomTabNavigator from "./navigation/BottomTabNavigator";
import useLinking from "./navigation/useLinking";
import HomeScreen, { HomeScreenParamList } from "./screens/HomeScreen";
import DetailScreen, { DetailsScreenParamList } from "./screens/DetailScreen";
import AddQuestionScreen from "./screens/AddQuestionScreen";
import { Colors } from "./constants/Colors";
import { Screens } from "./constants/Screens";

export type RootStackParamList = {
  [Screens.list]: HomeScreenParamList;
  [Screens.details]: DetailsScreenParamList;
  [Screens.add]: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [initialNavigationState, setInitialNavigationState] = React.useState();
  const containerRef = React.useRef();
  const { getInitialState } = useLinking(containerRef);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHide();

        // Load our initial navigation state
        setInitialNavigationState(await getInitialState());

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
              name={Screens.list}
              component={HomeScreen}
              initialParams={{ reload: false }}
              options={{
                title: "Questions List",
              }}
            />
            <Stack.Screen name={Screens.details} component={DetailScreen} />
            <Stack.Screen name={Screens.add} component={AddQuestionScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
