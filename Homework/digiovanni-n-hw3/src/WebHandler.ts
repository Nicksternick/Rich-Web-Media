// ===== | Variables | =====
const xhr:XMLHttpRequest = new XMLHttpRequest;

// ===== | Methods | =====

const queryAPI = (url:string, 
    callbackStart: ((this: XMLHttpRequest, ev: ProgressEvent<EventTarget>) => any) = () => {console.log('Start')},
    callbackLoad: ((this: XMLHttpRequest, ev: ProgressEvent<EventTarget>) => any) = () => {console.log('Load')},
    callbackEnd: ((this: XMLHttpRequest, ev: ProgressEvent<EventTarget>) => any) = () => {console.log('End')},
    callbackProgress: ((this: XMLHttpRequest, ev: ProgressEvent<EventTarget>) => any) = () => {console.log('Progress')},
    callbackError: ((this: XMLHttpRequest, ev: ProgressEvent<EventTarget>) => any) = () => {console.log('Error')},
    callbackTimeout: ((this: XMLHttpRequest, ev: ProgressEvent<EventTarget>) => any) = () => {console.log('Timeout')},
    callbackAbort: ((this: XMLHttpRequest, ev: ProgressEvent<EventTarget>) => any) = () => {console.log('Abort')}) => {
    
    xhr.onloadstart = callbackStart;
    xhr.onload = callbackLoad;
    xhr.onloadend = callbackEnd;

    xhr.onprogress = callbackProgress;

    xhr.ontimeout = callbackTimeout;

    xhr.onabort = callbackAbort;
    
    xhr.onerror = callbackError;

    xhr.open('Get', url);
    xhr.send();
}