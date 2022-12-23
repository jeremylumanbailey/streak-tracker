import { StyleSheet, View, Button, Text } from 'react-native'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import type { RootStackParamList } from '../types'
import React from 'react'
import { deleteSpecificStreak } from '../utils'
import { Alert } from 'react-native'


type ProfileProps = NativeStackScreenProps<RootStackParamList, 'StreakPage'>

//type StreakPageProps = {
//  navigation: ProfileProps;
//	route: streakType
//}

export default function StreakPage( { route, navigation }: ProfileProps ): JSX.Element {
	const { streakPageData } = route.params
	const handlePress = async () =>{
		Alert.alert(
			"Delete Streak",
			`Are you sure you want to delete ${streakPageData.streakTitle}?`,
			[
				{
					text: "Cancel",
					//onPress: () => console.log('cancelled'),
					style: "cancel"
				},
				{ text: "OK", onPress: async () => {
					await deleteSpecificStreak(streakPageData.streakTitle)
					navigation.navigate('Home')
				}}
			]
		)
	}
  return (
    <View style={styles.container}>
			<Text>You are editing {streakPageData.streakTitle}</Text>
			<Button title="Save" onPress={(): void => navigation.navigate('Home')} />
			<Button title="Delete" onPress={handlePress} />
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