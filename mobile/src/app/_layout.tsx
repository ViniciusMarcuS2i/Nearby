import { Stack } from "expo-router";
import { colors } from "@/styles/colors";

import {
  useFonts,
  Rubik_600SemiBold,
  Rubik_400Regular,
  Rubik_500Medium,
  Rubik_700Bold,
} from "@expo-google-fonts/rubik";
import { ActivityIndicator, View } from "react-native";
import Loading from "@/components/loading";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";

function Layout() {
  const [fontsLoaded] = useFonts({
    Rubik_600SemiBold,
    Rubik_400Regular,
    Rubik_500Medium,
    Rubik_700Bold,
  });

  if (!fontsLoaded) {
    return <Loading />;
  }

  return (
    <>
      <StatusBar translucent style="dark" />
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: colors.gray[100] },
          }}
        >
          <Stack.Screen name="index" />
          <Stack.Screen name="home" />
        </Stack>
      </GestureHandlerRootView>
    </>
  );
}

export default Layout;
