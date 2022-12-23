import { StyleSheet, View, Button, Text } from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack'
import type { RootStackParamList } from '../types'
import React from 'react'



export type StreakPageNavigation = StackNavigationProp<RootStackParamList>

type StreakPageProps = {
  navigation: StreakPageNavigation;
}

export default function StreakPage( { navigation }: StreakPageProps ): JSX.Element {

  return (
    <View style={styles.container}>
			<Text>You are editing</Text>
			<Button title="Save" onPress={(): void => navigation.navigate('Home')} />
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