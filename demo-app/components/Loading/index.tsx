import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

/**
 * Loaing Component
 * @returns 
 */
const Loading = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator 
        animating={true} 
        color={MD2Colors.red800} 
      />
    </View>
  );
}

export default Loading;