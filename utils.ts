import AsyncStorage from '@react-native-async-storage/async-storage'
import { MAIN_STREAK_OBJECT_KEY }  from './globalConstants'
import { streakType } from './types'
import { Alert } from 'react-native'



export const initializeMainStreakObject = async (streak: streakType[]): Promise<void> => await AsyncStorage.setItem(MAIN_STREAK_OBJECT_KEY, JSON.stringify(streak))

const mainStreakObjectExist = async (): Promise<boolean> => {
	if (await AsyncStorage.getItem(MAIN_STREAK_OBJECT_KEY) === null) return false
	return true
}

const getMainStreakObject = async (): Promise<string> => {
	const response = await AsyncStorage.getItem(MAIN_STREAK_OBJECT_KEY)
	if (typeof response === 'string') return response
	throw 'Main Streak object is broken'
}

const convertMainStreakObjectStringToArray = (arrayAsString: string): streakType[] => {
	return JSON.parse(arrayAsString)
}

const updateStreaks = async (StreakArray: streakType[]): Promise<void> => {
	await AsyncStorage.setItem(MAIN_STREAK_OBJECT_KEY, JSON.stringify(StreakArray))
}

const isDuplicateStreak = (currentStreaks: streakType[], newStreak: streakType): boolean => {
	return currentStreaks.some(streakInArray => {
		if( streakInArray.streakTitle === newStreak.streakTitle ) return true
	})
}

export const createStreak = async (streak: streakType): Promise<void> => {
	if (await mainStreakObjectExist() === false) return await initializeMainStreakObject([streak])
	const mainStreakObject = await getMainStreakObject()
	const mainStreakArray = convertMainStreakObjectStringToArray(mainStreakObject)
	if(isDuplicateStreak(mainStreakArray, streak) === true) return Alert.alert('The Streak title is already being used by another streak') 
	mainStreakArray.push(streak)
	await updateStreaks(mainStreakArray)
}

export const getAllStreaks = async (): Promise<streakType[] | null> => {
	if (await mainStreakObjectExist() === false) return null
		const mainStreakObject = await getMainStreakObject()
		return convertMainStreakObjectStringToArray(mainStreakObject)
}

export const getSpecificStreak = async (streakTitle: string): Promise<streakType | null> => {
	const allStreaks = await getAllStreaks()
	if(allStreaks === null) return null
	const specificStreak = allStreaks.find(streak => streak.streakTitle === streakTitle)
	if(specificStreak === undefined) return null
	return specificStreak
}

export const deleteSpecificStreak = async (streakTitle: string) => {
	const allStreaks = await getAllStreaks()
	if(allStreaks === null) return
	const arrayWithoutSpecificStreak = allStreaks.filter(streak => streak.streakTitle !== streakTitle)
	await updateStreaks(arrayWithoutSpecificStreak)
}

//export const epochToDate = (streak: streakType) => {
//	const date = new Date(0) // The 0 there is the key, which sets the date to the epoch
//	date.setUTCSeconds(streak.epochTime)
//	return date
//}

export const secondsSinceStreakStart = (streak: streakType) => {
	const dif = Math.abs(new Date().getTime() - streak.epochTime)
	return Math.floor(dif / 1000)
}

// eslint-disable-next-line no-console
export const logMainObjectKey = async (): Promise<void> => console.log(await AsyncStorage.getItem(MAIN_STREAK_OBJECT_KEY))
export const deleteEverything = async (): Promise<void> => await AsyncStorage.clear()
