import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Button, Text, TextInput } from 'react-native';
import { createStreak } from '../utils';
import { useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AddStreak( { navigation } ): JSX.Element {
	const [ streakTitle, setStreakTitle ] = useState("Edit Streak Title");

		
	const handlePress = async (): Promise<void> => {
		await AsyncStorage.setItem('foo', streakTitle + " value")
		console.log(await AsyncStorage.getAllKeys())
	}

  return (
    <View style={styles.container}>
			<TextInput
        onChangeText={setStreakTitle}
        value={streakTitle}
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