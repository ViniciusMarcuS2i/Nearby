import { Text, View } from "react-native";
import { styles } from "./styles";
import { IconProps } from "@tabler/icons-react-native";
import { colors } from "@/styles/colors";

interface StepProps {
  title: string;
  description: string;
  icon: React.ComponentType<IconProps>;
}

function Step({ description, title, icon: Icon }: StepProps) {
  return (
    <View style={styles.container}>
      <View style={styles.details}>
        <Icon size={32} color={colors.red.base} />
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  );
}

export default Step;
