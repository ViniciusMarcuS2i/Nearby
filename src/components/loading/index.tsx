import { ActivityIndicator, View } from "react-native";
import { styles } from "./styles";

function Loading() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={"large"} />
    </View>
  );
}

export default Loading;
