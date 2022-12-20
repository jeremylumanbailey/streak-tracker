import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Button, Text, TextInput } from 'react-native';
import { createStreak } from '../utils';
import { useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../types'


type AddStreakNavigationProp = StackNavigationProp<RootStackParamList>;

type AddStreakProps = {
  navigation: AddStreakNavigationProp;
};

export default function AddStreak( { navigation }: AddStreakProps ): JSX.Element {
	const [ streakTitle, setStreakTitle ] = useState("");

		
	const handlePress = async (): Promise<void> => {
		if (await AsyncStorage.getItem(streakTitle) !== null) {
			console.error('key already in use')
			throw 'key already in use'
		}
		await AsyncStorage.setItem(streakTitle, Date.now().toString())
	}

  return (
    <View style={styles.container}>
			<TextInput
        onChangeText={setStreakTitle}
        placeholder={"Add Streak Title"}
				defaultValue={streakTitle}
      />
				<Button
					title="Add Streak"
					onPress={handlePress}
				/>
				<Button title="back to home" onPress={(): void => navigation.navigate('Home')} />
				<Button title="delete everything" onPress={async (): Promise<void> => await AsyncStorage.clear()} />

      <Text>This is AddStreak.tsx hold up</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});