import {
  ConnectWallet,
  embeddedWallet,
  smartWallet,
  ThirdwebProvider,
  useAddress
} from "@thirdweb-dev/react-native";
import React from "react";
import { StyleSheet, useColorScheme, View } from "react-native";
import { ACCOUNT_FACTORY_CONTRACT_ADDRESS } from "./shared/constants";

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

  const address = useAddress();

  return (
    <>
      {!address? (
        <View style={styles.view}>
          <ConnectWallet buttonTitle="Sign In"/>
        </View>
      ) : (
        <View>
          
        </View>
      )}
    </>
  );
};

export default App;
