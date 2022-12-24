import { StyleSheet, View, Button, Text } from 'react-native'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import type { RootStackParamList, streakType } from '../types'
import React, { useEffect, useState } from 'react'
import { deleteSpecificStreak, epochToDate } from '../utils'
import { Alert } from 'react-native'


type ProfileProps = NativeStackScreenProps<RootStackParamList, 'StreakPage'>

//type StreakPageProps = {
//  navigation: ProfileProps;
//	route: streakType
//}

export default function StreakPage( { route, navigation }: ProfileProps ): JSX.Element {
	const { streakPageData } = route.params
	const [streakDate, setStreakDate ] = useState<number>(0)

	const handlePress = async () =>{
		Alert.alert(
			"Delete Streak",
			`Are you sure you want to delete ${streakPageData.streakTitle}?`,
			[
				{
					text: "Cancel",
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
			<Text>{`You are editing ${streakPageData.streakTitle}.
			The date you started this streak is ${streakDate}`}</Text>
			<Button title="Save/Back to home" onPress={(): void => navigation.navigate('Home')} />
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