import { StyleSheet, View, Button, Text } from 'react-native'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import type { RootStackParamList } from '../types'
import React, { useEffect, useState } from 'react'
import { deleteSpecificStreak } from '../utils'
import { timeLeft, timeLeftType } from '../timeUtils'
import { Alert } from 'react-native'
import TimeTile from './components/timeTile'


type ProfileProps = NativeStackScreenProps<RootStackParamList, 'StreakPage'>

export default function StreakPage( { route, navigation }: ProfileProps ): JSX.Element {
	const { streakPageData } = route.params
	const [streakDate, setStreakDate ] = useState<timeLeftType>(timeLeft(streakPageData))

	const handleDeletePress = async () =>{
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
			<View style={styles.content}>
				<View>
					<View style={styles.textContent}>
						<Text style={styles.text}>{`You are editing ${streakPageData.streakTitle}.`}</Text>
					</View>
					<View style={styles.allTiles}>
								<TimeTile streakDate={streakDate} timeKey='seconds'></TimeTile>
								<TimeTile streakDate={streakDate} timeKey='hours'></TimeTile>
								<TimeTile streakDate={streakDate} timeKey='minutes'></TimeTile>
								<TimeTile streakDate={streakDate} timeKey='days'></TimeTile>
					</View>
				</View>
				

			</View>
			<View style={styles.actionButtons}>
					<Button title="Back to home" onPress={(): void => navigation.navigate('Home')} />
					<Button title="Delete" onPress={handleDeletePress} />
			</View>
    </View>
  )
}

const styles = StyleSheet.create({
	container: {
		margin: 0,
    height: '100%',
		width: '100%',
  },
	content: {
		flex:1,
		alignItems: 'center',
		flexDirection: 'column',
		
	},
	actionButtons: {
		flex: 1,
		flexDirection: 'row',
		justifyContent:"space-evenly",
		alignItems: 'center',
	},
	allTiles:{
		width: '100%',
		flex: 1,
		flexDirection: 'row',
	},
	timeContainer:{
		flex: 1,
		flexDirection: 'column',
	},
	surface: {
		flex: 1,
		textAlign: 'center',
		textAlignVertical: 'center',
		alignItems: 'center',
    justifyContent: 'center',
	},
	textContent: {
		flex: 1,
    justifyContent: 'center',
	},
	text: {
		textAlign: 'center'
	}
})