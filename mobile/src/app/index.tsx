import { Button } from "@/components/button";
import Steps from "@/components/steps";
import Welcome from "@/components/welcome";
import { View } from "react-native";
import { router } from "expo-router";

function Home() {
  const handleGoToHome = () => {
    router.navigate("/home");
  };

  return (
    <View style={{ flex: 1, padding: 40, gap: 40 }}>
      <Welcome />
      <Steps />
      <Button onPress={handleGoToHome}>
        <Button.Title>Começar</Button.Title>
      </Button>
    </View>
  );
}

export default Home;
