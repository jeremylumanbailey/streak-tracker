export type RootStackParamList = {
  Home: undefined, // undefined because you aren't passing any params to the home screen
  AddStreak: undefined,
	StreakPage: undefined,
	Settings: undefined,
}

export type streakType = {
	streakTitle: string
	epochTime: number
}