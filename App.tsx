import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native'
import { NavigationContainer, useIsFocused } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AddStreak from "./components/AddStreak"
import Settings from './components/Settings'
import AsyncStorage from '@react-native-async-storage/async-storage'
import StreakItem from './components/StreakItem'
import { useEffect, useState } from "react"
import type { RootStackParamList, streakType } from './types'
import { getAllStreaks } from './utils'
import StreakPage from './components/StreakPage'
import { StackNavigationProp } from '@react-navigation/stack'

const nativeStackNavigator = createNativeStackNavigator<RootStackParamList>()


type HomeNavigationProp = StackNavigationProp<RootStackParamList>
	
	export const Home = ( { navigation }: {navigation: HomeNavigationProp }) => {
		const isFocused = useIsFocused()
		const [localStreaks, setLocalStreaks ] = useState<streakType[]>([])
		
		useEffect(() => {
			const localGetStreaks = async () => {
				const keys = await getAllStreaks()
				if(keys === null) return setLocalStreaks([])
				const streaks = keys.map(item => item)
				return setLocalStreaks(streaks)
			}
			localGetStreaks()
		}, [isFocused])

	
		const retStreaks = (streakArr: streakType[]) => {
			if(streakArr.length > 0) {
				return streakArr.map(streak => {
					return (
						<StreakItem 
							streakData={streak} 
							key={streak.epochTime}
							func={() => navigation.navigate("StreakPage", {streakPageData: streak})}
						></StreakItem>)})
			} 
			return <Text>You don't have any streaks yet! Time to add some. </Text>
		}

	return (
			<View style={styles.container}>
		<ScrollView style={styles.fullWidth}>
			{retStreaks(localStreaks)}
			</ScrollView>
			<Button
				title="log all keys"
				onPress={async () => {
					// eslint-disable-next-line no-console
					console.log(await AsyncStorage.getAllKeys())
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
					options={({ navigation }: {navigation: HomeNavigationProp }) => ({
            headerRight: () => <Button title="Add Streak" onPress={(): void => navigation.navigate('AddStreak')} />,
          })}
				/>
        <nativeStackNavigator.Screen
          name="AddStreak"
          component={AddStreak}
          options={{ title: 'Add a Streak' }}
        />
				<nativeStackNavigator.Screen
          name="StreakPage"
          component={StreakPage}
        />
        <nativeStackNavigator.Screen name="Settings" component={Settings} />
      </nativeStackNavigator.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
		height: '100%',
		width: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
	fullWidth: {
		width: '93%',
		display: 'flex',
	},
	streakItem: {
		marginBottom: '400px'
	}
})



