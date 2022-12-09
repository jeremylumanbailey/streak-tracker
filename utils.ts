import AsyncStorage from '@react-native-async-storage/async-storage';

export const setTimeInStorage = async (time: string, key: string): Promise<void> => {
	if (await AsyncStorage.getItem(key) !== null) {
		console.error('key already in use')
		throw 'key already in use'
	}
	await AsyncStorage.setItem(key, time)
}

export const getTimeFromStorage = async (key: string): Promise<string | null> => {
	const time = await AsyncStorage.getItem(key)
	if (time === null) {
		console.error(`Could not find key "${key}" in local storage`)
	}
	return time
}

export const onPressLearnMore = async (): void => {
	const time = new Date()
	//setTimeInStorage(time.getFullYear().toString(), 'foo')
	console.log(await getTimeFromStorage('foo'))
}