// ===== | Methods | =====

const fetchJson = async (url: string) => {
    return fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Network response was not OK. Status: ${response.status}`);
            }
            return response.json();
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
            throw error; // Rethrow the error
        });
}

// ===== | Exports | =====

export { fetchJson }

