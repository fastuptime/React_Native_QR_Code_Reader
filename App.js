import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import * as Linking from "expo-linking";

const QRCodeScanner = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    Alert.alert(
      "QR Kodu Okundu",
      `İçerik: ${data}`,
      [
        { text: "Tarayıcı da Aç", onPress: () => Linking.openURL(data) },
        { text: "İptal", onPress: () => setScanned(false) },
      ],
      { cancelable: false },
    );
  };

  if (hasPermission === null) {
    return <Text>İzin isteniyor</Text>;
  }
  if (hasPermission === false) {
    return <Text>Erişim reddedildi</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
  },
});

export default QRCodeScanner;
