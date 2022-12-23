export type RootStackParamList = {
  Home: undefined, // undefined because you aren't passing any params to the home screen
  AddStreak: undefined,
	StreakPage: {streakPageData: streakType },
	Settings: undefined,
}

export type streakType = {
	streakTitle: string
	epochTime: number
}