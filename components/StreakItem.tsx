import { StyleSheet } from 'react-native'
import { streakType } from '../types'
import { Card, Title, Paragraph } from 'react-native-paper'

export default function StreakItem( {streakData}: { streakData: streakType },  ): JSX.Element {
  return (
		<Card 
		style={styles.card}
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