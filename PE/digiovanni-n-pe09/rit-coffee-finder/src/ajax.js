function downloadFile(url, callbackRef) {
    const xhr = new XMLHttpRequest();
    // 1. set 'onerror' handler
    xhr.onerror = (e) => console.log("error");

    // 2. set 'onload' handler
    xhr.onload = (e) => {
        const headers = e.target.getAllResponseHeaders();
        const jsonString = e.target.response;
        console.log(`Headers = ${headers}`);
        console.log(`JsonString = ${jsonString}`);
        callbackRef(jsonString);
    }; // end xhr.onload

    // 3. open the connection using the HTTP GET method
    xhr.open("GET",url);

    // 4. we could send the request headers here if we wanted to
    // URL that I did not want to type out*

    // 5. Finally, send the request
    xhr.send();
}

export {downloadFile};