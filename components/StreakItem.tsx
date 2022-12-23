import { GestureResponderEvent, StyleSheet } from 'react-native'
import { streakType } from '../types'
import { Card, Title, Paragraph } from 'react-native-paper'

type redirectFunc = (event: GestureResponderEvent) => void

export default function StreakItem( { streakData, func }: { streakData: streakType, func:redirectFunc },  ): JSX.Element {
  return (
		<Card 
		style={styles.card}
		onPress={func}
		>
				<Card.Content>
					<Title>{streakData.streakTitle}</Title>
					<Paragraph>Time since streak started: {streakData.epochTime}</Paragraph>
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