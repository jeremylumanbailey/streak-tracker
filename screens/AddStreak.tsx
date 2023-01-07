import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View, Button, Text, TextInput } from 'react-native'
import { useState } from "react"
import { StackNavigationProp } from '@react-navigation/stack'
import type { RootStackParamList, streakType } from '../types'
import { createStreak, deleteEverything, streakTitleNotEmpty } from '../utils'
import React from 'react'

type AddStreakNavigationProp = StackNavigationProp<RootStackParamList>

export default function AddStreak( { navigation }: {navigation :AddStreakNavigationProp } ): JSX.Element {
	const [ streakTitle, setStreakTitle ] = useState("")
	const handlePress = async (): Promise<void> => {
		const newStreak: streakType = {
			streakTitle,
			epochTime: Date.now()
		}
		if(streakTitleNotEmpty(newStreak)) {
			await createStreak(newStreak)
			navigation.navigate('StreakPage', {streakPageData: newStreak})
		}
	}

  return (
    <View style={styles.container}>
			<View>
				<Text 
				style={styles.text}
				numberOfLines={1} 
				adjustsFontSizeToFit={true}
				>
					Add your streak title below! 
				</Text>
			</View>
			<TextInput
				style={styles.input}
				onChangeText={setStreakTitle}
				placeholder={"Add Streak Title"}
				defaultValue={streakTitle}
			/>
			<View style={styles.buttonContainer}>
				<Button
					title="Add Streak"
					onPress={handlePress}
				/>
				<Button title="back to home" onPress={(): void => navigation.navigate('Home')} />
			</View>

      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
	buttonContainer: {
		margin: '10%',
		width: '100%',
		flexDirection: 'row',
		justifyContent:"space-evenly",
		alignItems: 'center',
	},
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
		textAlign: 'center'
  },
	text: {
		fontSize: 50,
		width: '100%',
		margin: '5%',
		fontWeight: 'bold'
	},
	input: {
		fontSize: 25
	}
})