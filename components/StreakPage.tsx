import { StyleSheet, View, Button, Text } from 'react-native'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import type { RootStackParamList } from '../types'
import React, { useEffect, useState } from 'react'
import { deleteSpecificStreak } from '../utils'
import { timeLeft, timeLeftType } from '../timeUtils'
import { Alert } from 'react-native'
import { Surface } from 'react-native-paper'


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
 
	const elevationShadow = 5
  return (
    <View style={styles.container}>
			<View style={styles.content}>
				<View style={styles.verticalCenterItems}>
					<View style={styles.textContent}>
						<Text>{`You are editing ${streakPageData.streakTitle}.`}</Text>
					</View>
					<View style={styles.allTiles}>
						<View>
							<View style={styles.timeContainer}>
								<Surface style={styles.surface} elevation={elevationShadow}>
									<Text>{streakDate.seconds}</Text>
									<Text>seconds</Text>
								</Surface>
							</View>
							<View style={styles.timeContainer}>
								<Surface style={styles.surface} elevation={elevationShadow}>
									<Text>{streakDate.hours}</Text>
									<Text>hours</Text>
								</Surface>
							</View>
						</View>

						<View> 
							<View style={styles.timeContainer}>
								<Surface style={styles.surface} elevation={elevationShadow}>
									<Text>{streakDate.minutes}</Text>
									<Text>minutes</Text>
								</Surface>
							</View>

							<View style={styles.timeContainer}>
								<Surface style={styles.surface} elevation={elevationShadow}>
									<Text>{streakDate.days}</Text>
									<Text>days</Text>
								</Surface>
							</View>
						</View>
						
					</View>

				</View>
				

			</View>
			<View style={styles.actionButtons}>
					<Button title="Save/Back to home" onPress={(): void => navigation.navigate('Home')} />
					<Button title="Delete" onPress={handlePress} />
			</View>
    </View>
  )
}

const styles = StyleSheet.create({
	container: {
		margin: 0,
    height: '100%',
		width: '100%',
    backgroundColor: 'red',
  },
	content: {
		backgroundColor: 'green',
		flex:1,
		alignItems: 'center',
		flexDirection: 'row',
	},
	verticalCenterItems: {

	},
	actionButtons: {
		flex: 1,
		flexDirection: 'row',
		justifyContent:"space-evenly",
		alignItems: 'center',
		backgroundColor: 'blue'
	},
	allTiles:{
		width: '100%',
		flex: 1,
		flexDirection: 'row',
	},
	timeContainer:{
		flex: 1,
		flexDirection: 'column',
		//height: '25%'
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
	}
})