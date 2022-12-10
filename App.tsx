import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddStreak from "./components/AddStreak"
import Settings from './components/Settings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Streak from './components/Streak';
import { useEffect, useState } from "react";

const Stack = createNativeStackNavigator();

	const getAllStreaks = async () => {
		const keys = await AsyncStorage.getAllKeys()
		const streaks = keys.map(item => {
			return <Streak date={item} key={item}></Streak>
		})
		return keys
	}

	
	export const Home = () => {
		const [localfoo, setlocalfoo] = useState("not foo")

		
		useEffect(() => {
			const setData = async () => {
				const ret = await AsyncStorage.getItem("foo")
				if (typeof ret === 'string') setlocalfoo(ret)
				return 'dang'
			}
			setData()
		}, [localfoo])
	
	return (
		<View style={styles.container}>

      <Text>App.tsx sorry my bad!</Text>
			{<Streak date={localfoo}></Streak>}
							<Button
					title="show keys"
					onPress={async () => console.log(await AsyncStorage.getAllKeys())}
				/>
			{<Text>should be here: </Text>}

      <StatusBar style="auto" />
    </View>

	)
}  



export default function App(): JSX.Element {
  return (		
		<NavigationContainer>

      <Stack.Navigator>
				<Stack.Screen
					name="Home"
					component={Home}
					options={({navigation}) => ({
            headerRight: () => <Button title="Add Streak" onPress={(): void => navigation.navigate('AddStreak')} />,
          })}
				/>
        <Stack.Screen
          name="AddStreak"
          component={AddStreak}
          options={{ title: 'Add a Streak' }}
        />
        <Stack.Screen name="Settings" component={Settings} />
      </Stack.Navigator>
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
