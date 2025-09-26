const myInfo = new URLSearchParams(window.location.search);

document.querySelector('#results').innerHTML = `
<p>Your name: ${myInfo.get('first')} ${myInfo.get('last')}</p>
<p>Your email is: ${myInfo.get('email')}</p>
<p>Your phone is: ${myInfo.get('phone')}</p>
<p>Your business name: ${myInfo.get('title')}</p>
<p>Timestamp: ${myInfo.get('timestamp')}</p>
`;