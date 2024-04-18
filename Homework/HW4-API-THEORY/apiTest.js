const url = 'https://restaurants-near-me-usa.p.rapidapi.com/restaurants/location/state/MI/city/West%20Bloomfield/0';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'SIGN-UP-FOR-KEY',
		'X-RapidAPI-Host': 'restaurants-near-me-usa.p.rapidapi.com'
	}
};

const get = async () => {
    try {
        const response = await fetch(url, options);
        const result = await response.text();
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}

get();