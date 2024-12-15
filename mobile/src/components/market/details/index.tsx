import { Text, View } from "react-native";
import { styles } from "./styles";
import { MarketInfo } from "../info";
import { IconMapPin, IconPhone, IconTicket } from "@tabler/icons-react-native";

export interface PropsDetails {
  name: string;
  description: string;
  address: string;
  phone: string;
  coupons: string;
  rules: {
    id: string;
    description: string;
  }[];
}
[];

interface Props {
  data: PropsDetails;
}

export function MarketDetails({ data }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{data.name}</Text>
      <Text style={styles.description}>{data.description}</Text>

      <View style={styles.group}>
        <Text style={styles.titile}>Informações</Text>

        <MarketInfo
          icon={IconTicket}
          description={`${data.coupons} cupons disponíveis`}
        />
        <MarketInfo icon={IconMapPin} description={data.address} />
        <MarketInfo icon={IconPhone} description={data.phone} />
      </View>
      <View style={styles.group}>
        <Text style={styles.titile}>Regulamento</Text>
        {data.rules.map((item) => (
          <Text key={item.id} style={styles.rule}>
            {`\u2022 ${item.description}`}
          </Text>
        ))}
      </View>
    </View>
  );
}
