import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { NavigationContainer, useIsFocused } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AddStreak from "./screens/AddStreak"
import Settings from './screens/Settings'
import StreakItem from './screens/StreakItem'
import { useEffect, useState } from "react"
import type { RootStackParamList, streakType } from './types'
import { getAllStreaks } from './utils'
import StreakPage from './screens/StreakPage'
import { StackNavigationProp } from '@react-navigation/stack'
import { Surface } from 'react-native-paper'

import { IconButton } from 'react-native-paper'

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
			const addButtonSize = 45
			const buttonBackGroundColor = '#2096F3'
			if(streakArr.length > 0) {
				return (		
					<View style={styles.fullPage}>
						<ScrollView style={styles.almostFullWidth}>					
							{streakArr.map(streak => {
								return (
									<StreakItem 
										streakData={streak} 
										key={streak.epochTime}
										func={() => navigation.navigate("StreakPage", {streakPageData: streak})}
									></StreakItem>)})}
							</ScrollView>
							<IconButton
								icon="plus"
								containerColor={buttonBackGroundColor}
								iconColor={'white'}
								size={addButtonSize}
								onPress={(): void => navigation.navigate('AddStreak')}
								style={styles.addButton}
							/>
					</View>
					)
			} 
			return (
				<View style={styles.fullPage}>
					<Surface style={styles.surface} elevation={4}>
						<Text numberOfLines={2} adjustsFontSizeToFit={true} style={styles.centerText}>No streaks currently active. {"\n"}
						Hit the Add button to start some new streaks!</Text>
					</Surface>
					<IconButton
						icon="plus"
						containerColor={buttonBackGroundColor}
						iconColor={'white'}
						size={addButtonSize}
						onPress={(): void => navigation.navigate('AddStreak')}
						style={styles.addButton}
					/>
				</View>
				
			)
		}

	return (
			<View style={styles.container}>
			{retStreaks(localStreaks)}
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
					options={{
						title: 'Home',headerShown: false
					}}
					//options={({ navigation }: {navigation: HomeNavigationProp }) => ({
          //  headerRight: () => <Button title="Add Streak" onPress={(): void => navigation.navigate('AddStreak')} />,
          //})}
				/>
        <nativeStackNavigator.Screen
          name="AddStreak"
          component={AddStreak}
          options={{ title: 'Add a Streak', headerShown: false }}
        />
				<nativeStackNavigator.Screen
          name="StreakPage"
          component={StreakPage}
          options={{ title: 'Streak', headerShown: false }}
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
	almostFullWidth: {
		width: '93%',
		display: 'flex',
	},
	fullPage: {
		marginTop: '25%',
		width: '100%',
		height: '100%',
		display: 'flex',
    alignItems: 'center',
	},
	streakItem: {
		marginBottom: '400px'
	},
	surface: {
		height: '100%',
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
	},
	centerText: {
		fontSize: 30,
		textAlign: 'center',
		fontWeight: 'bold',
	},
	addButton: {
		elevation: 3, // works on android
		position: 'absolute',
		bottom: '7%',
		right: '5%',
	}
})



