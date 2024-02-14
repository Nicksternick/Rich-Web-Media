// Returns a random color
export const getRandomColor = () => {
    // Return a random number from 0 to 255
    const getByte = () => {
        return 55 + Math.round(Math.random() * 200);
    }

    return `rgba(${getByte()},${getByte()},${getByte()},.8)`;
}

// Return a random integer from min to max
export const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}