import {
  ConnectWallet,
  embeddedWallet,
  smartWallet,
  ThirdwebProvider,
  useAddress,
  useContract,
  useDisconnect,
  useNFT,
  useNFTBalance,
  useTokenBalance,
  Web3Button,
} from "@thirdweb-dev/react-native";
import React from "react";
import { Button, Image, StyleSheet, Text, useColorScheme, View } from "react-native";
import Loading from "./components/Loading";
import { ACCOUNT_FACTORY_CONTRACT_ADDRESS, NFT_CONTRACT_ADDRESS, TOKEN_CONTRACT_ADDRESS } from "./shared/constants";

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
  nftImage: {
    width: 200, 
    height: 200,
    margin: 5
  }
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
  const disconnect = useDisconnect();
  const {  
    data,
    error,
    isLoading,
    contract
  } = useContract(NFT_CONTRACT_ADDRESS);
  const { 
    contract: tokenContract
  } = useContract(TOKEN_CONTRACT_ADDRESS);
  const { data: nft } = useNFT(contract, 0);
  const {
    data: tokenBalance
  } = useTokenBalance(tokenContract, address);
  const {
    data: nftBalance
  } = useNFTBalance(contract, address, 0)
 
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {!address? (
            <View style={styles.view}>
              <ConnectWallet buttonTitle="Sign In"/>
            </View>
          ) : (
            <View style={styles.view}>
              {nft != undefined && (
                <Image 
                  source={{
                    uri: nft.metadata.image,
                  }} 
                  style={styles.nftImage}
                />
              )}
              <Web3Button
                contractAddress={NFT_CONTRACT_ADDRESS}
                action={(contract) => contract.erc1155.claim(0, 1)}
              >
                Claim NFT
              </Web3Button>
              <Web3Button
                contractAddress={TOKEN_CONTRACT_ADDRESS}
                action={(contract) => contract.erc20.claim(10)}
              >
                Claim Test Token
              </Web3Button>
              <ConnectWallet />
              <Text>
                Your NFT Balance:
              </Text>
              {nftBalance != undefined && (
                <Text>
                  {nftBalance?.toString()}
                </Text>
              )}
              <Text>
                Your ERC20 Token:
              </Text>
              {tokenBalance != undefined && (
                <Text>
                  {tokenBalance.displayValue}
                </Text>
              )}
              <Button
                title="Sign Out"
                onPress={disconnect}
              />
            </View>
          )}
        </>
      )}
    </>
  );
};

export default App;
