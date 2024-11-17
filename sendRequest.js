const fetch = require('node-fetch');

async function sendChatRequest(userInput) {
  const response = await fetch('http://localhost:3000/api/startChat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userInput }),
  });

  const data = await response.json();
  console.log('Response:', data);
}

const userInput = "0.1 sol to 6W9gDQZ1YGjndekagDAyPVfEmyJbg9EH2UaVHSyANmrK";
sendChatRequest(userInput).catch(console.error);