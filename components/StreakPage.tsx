import { StyleSheet, View, Button, Text } from 'react-native'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import type { RootStackParamList } from '../types'
import React, { useEffect, useState } from 'react'
import { deleteSpecificStreak } from '../utils'
import { secondsSinceStreakStart, timeLeft, timeLeftType } from '../timeUtils'
import { Alert } from 'react-native'


type ProfileProps = NativeStackScreenProps<RootStackParamList, 'StreakPage'>

//type StreakPageProps = {
//  navigation: ProfileProps;
//	route: streakType
//}

export default function StreakPage( { route, navigation }: ProfileProps ): JSX.Element {
	const { streakPageData } = route.params
	const [streakDate, setStreakDate ] = useState<timeLeftType>(timeLeft(streakPageData))

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

	useEffect(() => {
		const intervalId = setInterval(() => {  //assign interval to a variable to clear it.
			setStreakDate(timeLeft(streakPageData))
		}, 1000)
		return () => clearInterval(intervalId) //This is important
	}, [streakPageData])
 
	
  return (
    <View style={styles.container}>
			<Text>{`You are editing ${streakPageData.streakTitle}.
			You have had your streak for  ${streakDate.days} days ${streakDate.hours} hours, ${streakDate.minutes} minutes and ${streakDate.seconds} seconds`}</Text>
			<View style={styles.actionButtons}>
					<Button title="Save/Back to home" onPress={(): void => navigation.navigate('Home')} />
					<Button title="Delete" onPress={handlePress} />
			</View>
    </View>
  )
}

const styles = StyleSheet.create({
	actionButtons: {
		flexDirection: 'row',
		justifyContent:"space-evenly",
		alignItems: 'center',
		width: '100%'		
	},
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})