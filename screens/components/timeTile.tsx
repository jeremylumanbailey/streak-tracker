import { Surface } from 'react-native-paper'
import { StyleSheet ,Text } from 'react-native'
import { timeLeftType } from '../../timeUtils'

type timeKeyEnum = 'days' | 'hours' | 'minutes' | 'seconds'

export default function TimeTile( { timeKey, streakDate }: {streakDate: timeLeftType, timeKey: timeKeyEnum} ): JSX.Element {
	return (
	<Surface style={styles.surface} elevation={5}>
		<Text>{streakDate[timeKey]}</Text>
		<Text>{timeKey}</Text>
	</Surface>
	)
}

const styles = StyleSheet.create({
	surface: {
		flex: 1,
		textAlign: 'center',
		textAlignVertical: 'center',
		alignItems: 'center',
    justifyContent: 'center',
	}
})