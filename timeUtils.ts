// Function utilities used for date and time stuff
import type { streakType } from "./types"

export type timeLeftType = {
	days: number,
	hours: number,
	minutes: number,
	seconds: number
}

export const secondsSinceStreakStart = (streak: streakType) => {
	const dif = Math.abs(new Date().getTime() - streak.epochTime)
	return Math.floor(dif / 1000)
}

export const highestTime = (time: timeLeftType): string => {
	if(time.days > 0) return time.days + ' day(s)'
	if(time.hours > 0) return time.hours + ' hour(s)'
	if(time.minutes > 0) return time.minutes + ' minute(s)'
	return time.seconds + ' second(s)'
}

export const timeLeft = (streak: streakType): timeLeftType => {
	let delta = secondsSinceStreakStart(streak)

	// calculate (and subtract) whole days
	const days = Math.floor(delta / 86400)
	delta -= days * 86400

	// calculate (and subtract) whole hours
	const hours = Math.floor(delta / 3600) % 24
	delta -= hours * 3600

	// calculate (and subtract) whole minutes
	const minutes = Math.floor(delta / 60) % 60
	delta -= minutes * 60

	// what's left is seconds
	const seconds = delta % 60  // in theory the modulus is not required

	return { days, hours, minutes, seconds}
}