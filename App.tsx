import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer, useIsFocused } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddStreak from "./components/AddStreak"
import Settings from './components/Settings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Streak from './components/Streak';
import { useEffect, useState } from "react";
import type { RootStackParamList } from './types'

const nativeStackNavigator = createNativeStackNavigator<RootStackParamList>();

	const getAllStreaks = async () => {
		const keys = await AsyncStorage.getAllKeys()
		const streaks = keys.map(item => {
			return <Streak date={item} key={item}></Streak>
		})
		return keys
	}

	
	export const Home = () => {
		const isFocused = useIsFocused();
		const [localfoo, setlocalfoo] = useState("LOADING")

		
		useEffect(() => {
			const setData = async () => {
				const ret = await AsyncStorage.getItem("foo")
				if (typeof ret === 'string') setlocalfoo(ret)
			}
			setData()
		}, [isFocused])
	
	return (
		<View style={styles.container}>

      <Text>App.tsx sorry my bad!</Text>
			{<Streak date={localfoo}></Streak>}
							<Button
					title="log all keys"
					onPress={async () => {
						console.log(await AsyncStorage.getAllKeys())
						const temp = 'foo'
						console.log(`the value for ${temp} is:`,await AsyncStorage.getItem(temp))
					}}
				/>
      <StatusBar style="auto" />
    </View>

	)
}  



export default function App(): JSX.Element {
  return (		
		<NavigationContainer>
      <nativeStackNavigator.Navigator initialRouteName="Home">
				<nativeStackNavigator.Screen
					name="Home"
					component={Home}
					options={({navigation}) => ({
            headerRight: () => <Button title="Add Streak" onPress={(): void => navigation.navigate('AddStreak')} />,
          })}
				/>
        <nativeStackNavigator.Screen
          name="AddStreak"
          component={AddStreak}
          options={{ title: 'Add a Streak' }}
        />
        <nativeStackNavigator.Screen name="Settings" component={Settings} />
      </nativeStackNavigator.Navigator>
    </NavigationContainer>
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
