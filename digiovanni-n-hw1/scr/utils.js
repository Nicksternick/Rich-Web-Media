export const randomElement = (array) =>
{
	return array[(Math.random() * array.length) | 0]
}