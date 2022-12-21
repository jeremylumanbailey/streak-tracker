import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Button, Text, TextInput } from 'react-native';
import { useState } from "react";
import { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../types'
import { createStreak, deleteEverything, logMainObjectKey } from '../utils'
import React from 'react';



type AddStreakNavigationProp = StackNavigationProp<RootStackParamList>;

type AddStreakProps = {
  navigation: AddStreakNavigationProp;
};

export default function AddStreak( { navigation }: AddStreakProps ): JSX.Element {
	const [ streakTitle, setStreakTitle ] = useState("");	
	const handlePress = async (): Promise<void> => {
		await createStreak({streakTitle, epochTime: Date.now()})
		await logMainObjectKey()
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
				<Button title="delete everything" onPress={deleteEverything} />

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