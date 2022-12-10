import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Button, Text, TextInput } from 'react-native';
import { createStreak } from '../utils';
import { useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AddStreak(): JSX.Element {
	const [ streakTitle, setStreakTitle ] = useState("Edit Streak Title");

		
	const handlePress = async (): Promise<void> => {
		await AsyncStorage.setItem(streakTitle, )
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