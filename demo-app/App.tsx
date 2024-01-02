import {
  ConnectWallet,
  embeddedWallet,
  smartWallet,
  ThirdwebProvider
} from "@thirdweb-dev/react-native";
import React from "react";
import { StyleSheet, Text, useColorScheme, View } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { ACCOUNT_FACTORY_CONTRACT_ADDRESS } from "./shared/constants";

// スマートウォレット用の設定
const smartWalletConfig = {
  factoryAddress: ACCOUNT_FACTORY_CONTRACT_ADDRESS,
  gasless: true
}

/**
 * App Component
 * @returns 
 */
const App = () => {
  return (
    <ThirdwebProvider
      activeChain="mumbai"
      clientId={process.env.EXPO_PUBLIC_TW_CLIENT_ID}
      supportedWallets={[
        smartWallet(embeddedWallet({
          auth: {
            options: ["email", "google", "facebook", "apple"],
            redirectUrl: "rnstarter://",
          },
        }), smartWalletConfig),
      ]}
    >
      <AppInner />
    </ThirdwebProvider>
  );
};

/**
 * AppInner Component
 * @returns 
 */
const AppInner = () => {
  const isDarkMode = useColorScheme() === "dark";

  const textStyles = {
    color: isDarkMode ? Colors.white : Colors.black,
    ...styles.heading,
  };

  return (
    <View style={styles.view}>
      <Text style={textStyles}>Web3 Mobile Demo App</Text>
      <ConnectWallet />
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default App;
