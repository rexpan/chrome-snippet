(() => {
// http://responsivevoice.org/text-to-speech-languages/
const voice = 
    "Vietnamese Male"
    // "US English Female"
;

console.clear();
if (typeof responsiveVoice == "undefined") 
    loadScript('https://code.responsivevoice.org/responsivevoice.js', setTimeout(main, 1000));
else main();

function main() {
    const text = `
        ${
            $(".reader_content_wrapper .reader_head").text()}
        }
        ${
            $(".reader_content_wrapper .text_body").text()
        }`;
        
    responsiveVoice.speak(text, voice, {rate: 1.5});
}

function loadScript(url, callback)
{
    // Adding the script tag to the head as suggested before
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;

    // Then bind the event to the callback function.
    // There are several events for cross browser compatibility.
    script.onreadystatechange = callback;
    script.onload = callback;

    // Fire the loading
    head.appendChild(script);
}
})();
