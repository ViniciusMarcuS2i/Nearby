import Steps from "@/components/steps";
import Welcome from "@/components/welcome";
import { View } from "react-native";

function Home() {
  return (
    <View style={{ flex: 1, padding: 40, gap: 40 }}>
      <Welcome />
      <Steps />
    </View>
  );
}

export default Home;
