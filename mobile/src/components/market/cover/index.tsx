import { ImageBackground, View } from "react-native";
import { styles } from "./styles";
import { Button } from "@/components/button";
import { router } from "expo-router";
import { IconArrowNarrowLeft } from "@tabler/icons-react-native";

type Props = {
  uri: string;
};

export function Cover({ uri }: Props) {
  return (
    <ImageBackground source={{ uri }} style={styles.container}>
      <View style={styles.header}>
        <Button onPress={() => router.back()} style={{ width: 40, height: 40 }}>
          <Button.Icon icon={IconArrowNarrowLeft} />
        </Button>
      </View>
    </ImageBackground>
  );
}
