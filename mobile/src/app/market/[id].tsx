import { Button } from "@/components/button";
import Loading from "@/components/loading";
import { MarketCoupon } from "@/components/market/coupon";
import { Cover } from "@/components/market/cover";
import { MarketDetails, PropsDetails } from "@/components/market/details";
import { api } from "@/libs/api";
import { useCameraPermissions, Camera, CameraView } from "expo-camera";
import { Redirect, useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Alert, Modal, ScrollView, StatusBar, Text, View } from "react-native";

interface MarketProps extends PropsDetails {
  cover: string;
}

export default function MarketScreen() {
  const [isCameraModalOpened, setIsCameraModalOpened] = useState(false);
  const [coupon, setCoupon] = useState<string | null>(null);
  const [market, setMarket] = useState<MarketProps>();
  const [couponIsFetching, setCouponIsFetching] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [_, requestPermission] = useCameraPermissions();

  const params = useLocalSearchParams();

  const qrLock = useRef(false);

  async function fetchMarket() {
    try {
      const { data } = await api.get(`/markets/${params.id}`);
      setMarket(data);
      setIsLoading(false);
      console.log(data);
    } catch (error) {
      throw error;
    }
  }

  async function handleOpenCamera() {
    try {
      const { granted } = await requestPermission();
      if (!granted) {
        return Alert.alert("Câmera", "Você precisa habilitar o uso da câmera");
      }
      qrLock.current = false;
      setIsCameraModalOpened(true);
    } catch (error) {
      Alert.alert("Câmera", "Não foi possivel abrir a câmera");
    }
  }

  async function getCoupon(id: string) {
    try {
      setCouponIsFetching(true);
      const { data } = await api.patch("/cupons/" + id);
      Alert.alert("Cupom", data.coupon);
      setCoupon(data.coupon);
    } catch (error) {
      throw error;
    } finally {
      setCouponIsFetching(false);
    }
  }

  function handleUseCoupon(id: string) {
    setIsCameraModalOpened(false);
    Alert.alert(
      "Cupom",
      "Não é possível reutilizar um cupom resgatado. Deseja realmente resgatar o cupom?",
      [
        { style: "cancel", text: "Não" },
        { text: "Sim", onPress: () => getCoupon(id) },
      ]
    );
  }

  useEffect(() => {
    fetchMarket();
  }, [params.id, coupon]);

  if (isLoading) {
    return <Loading />;
  }

  if (!market) {
    return <Redirect href="/home" />;
  }

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" />
      <ScrollView showsHorizontalScrollIndicator={false}>
        <Cover uri={market?.cover} />
        <MarketDetails data={market} />
        {coupon && <MarketCoupon code={coupon} />}
      </ScrollView>
      <View style={{ padding: 32 }}>
        <Button onPress={handleOpenCamera}>
          <Button.Title>Ler QR Code</Button.Title>
        </Button>
      </View>
      <Modal
        style={{ flex: 1 }}
        statusBarTranslucent
        visible={isCameraModalOpened}
      >
        <CameraView
          onBarcodeScanned={({ data }) => {
            if (data && !qrLock.current) {
              qrLock.current = true;
              setTimeout(() => {
                handleUseCoupon(data), 500;
              });
            }
          }}
          facing="back"
          style={{ flex: 1 }}
        />
        <View style={{ position: "absolute", bottom: 32, left: 32, right: 32 }}>
          <Button
            isLoading={couponIsFetching}
            onPress={() => setIsCameraModalOpened(false)}
          >
            <Button.Title>Voltar</Button.Title>
          </Button>
        </View>
      </Modal>
    </View>
  );
}
