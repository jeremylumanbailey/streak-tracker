import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Button, Text, TextInput } from 'react-native';
import { createStreak } from '../utils';
import React from "react";

export default function AddStreak(): JSX.Element {
	const [ streakTitle, setStreakTitle ] = React.useState("Edit Streak Title");
  return (
    <View style={styles.container}>
			<TextInput
        onChangeText={setStreakTitle}
        value={streakTitle}
      />
				<Button
					title="Add Streak"
					onPress={createStreak}
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