// randomElement(array): Returns a random thing from the passed in array
export const randomElement = (array) =>
{
	// Return a random thing within the array bounds
	return array[(Math.random() * array.length) | 0]
}