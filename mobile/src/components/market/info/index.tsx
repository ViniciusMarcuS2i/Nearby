import { IconProps, Icon } from "@tabler/icons-react-native";
import { Text, View } from "react-native";

import { colors } from "@/styles/colors";
import { styles } from "./styles";

type Props = {
  description: string;
  icon: React.ComponentType<IconProps>;
};

export function MarketInfo({ description, icon: Icon }: Props) {
  return (
    <View style={styles.container}>
      <Icon size={16} color={colors.gray[400]} />
      <Text style={styles.text}>{description}</Text>
    </View>
  );
}
