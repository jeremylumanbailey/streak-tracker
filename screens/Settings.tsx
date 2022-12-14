import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View, Text } from 'react-native'

export default function Settings(): JSX.Element {
  return (
    <View style={styles.container}>
			<Text>This is Settings.tsx</Text>
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})