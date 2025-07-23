document.addEventListener('DOMContentLoaded', () => {
  const chatbotToggle = document.getElementById('chatbotToggle');
  const chatbotWindow = document.getElementById('chatbotWindow');
  const chatbotClose = document.getElementById('chatbotClose');
  const chatInput = document.getElementById('chatInput');
  const sendBtn = document.getElementById('sendBtn');
  const chatbotBody = document.getElementById('chatbotBody');

  chatbotToggle.addEventListener('click', () => {
    chatbotWindow.style.display = 'flex';
  });

  chatbotClose.addEventListener('click', () => {
    chatbotWindow.style.display = 'none';
  });

  sendBtn.addEventListener('click', sendMessage);
  chatInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') sendMessage();
  });

  function sendMessage() {
    const message = chatInput.value.trim();
    if (message === '') return;

    appendMessage('user', message);
    chatInput.value = '';

    // Fetch from local server
    fetch('http://localhost:3000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
    })
        .then((res) => res.json())
        .then((data) => {
        appendMessage('bot', data.reply);
        })
        .catch((err) => {
        appendMessage('bot', "Oops! I couldn't reach the server.");
        console.error(err);
        });
    }

  function appendMessage(sender, text) {
    const wrapper = document.createElement('div');
    wrapper.className = `flex ${sender === 'user' ? 'justify-end' : ''}`;

    const bubble = document.createElement('div');
    bubble.className = `
        px-4 py-2 rounded-2xl shadow max-w-[80%] text-sm font-sora
        ${sender === 'user'
        ? 'bg-gradient-to-br from-green-400 to-blue-400 text-black rounded-br-none'
        : text.toLowerCase().includes("oops")
            ? 'bg-red-400/20 text-red-100 rounded-bl-none'
            : 'bg-white/10 text-white rounded-bl-none'}
    `.trim().replace(/\s+/g, ' '); // Cleans up excess whitespace

    bubble.textContent = text;
    wrapper.appendChild(bubble);
    chatbotBody.appendChild(wrapper);
    chatbotBody.scrollTop = chatbotBody.scrollHeight;
  }

  console.log("Script loaded successfully!");
});
