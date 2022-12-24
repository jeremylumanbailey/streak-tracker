import { GestureResponderEvent, StyleSheet } from 'react-native'
import { streakType } from '../types'
import { Card, Title, Paragraph } from 'react-native-paper'
import { useEffect, useState } from 'react'
import { secondsdBetweenDate } from '../utils'

type redirectFunc = (event: GestureResponderEvent) => void

export default function StreakItem( { streakData, func }: { streakData: streakType, func:redirectFunc },  ): JSX.Element {
	const [streakDate, setStreakDate ] = useState<number>(secondsdBetweenDate(streakData))

	useEffect(() => {
		const intervalId = setInterval(() => {  //assign interval to a variable to clear it.
			setStreakDate(secondsdBetweenDate(streakData))
		}, 1000)
		return () => clearInterval(intervalId) //This is important
	}, [streakData])

  return (
		<Card 
		style={styles.card}
		onPress={func}
		>
				<Card.Content>
					<Title>{streakData.streakTitle}</Title>
					<Paragraph>You have been {streakData.streakTitle} free for {streakDate} seconds</Paragraph>
				</Card.Content>
		</Card>
  )
}

const styles = StyleSheet.create({
  card: {
		marginBottom: '2%',
		marginTop: '5%'
	},
})