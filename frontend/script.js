const subjectSelect = document.getElementById('subject');
const customSubjectInput = document.getElementById('customSubject');
const questionInput = document.getElementById('question');
const askBtn = document.getElementById('askBtn');
const answerBox = document.getElementById('answerBox');
const answerText = document.getElementById('answerText');

subjectSelect.addEventListener('change', () => {
  if (subjectSelect.value === 'Other') {
    customSubjectInput.classList.remove('hidden');
  } else {
    customSubjectInput.classList.add('hidden');
  }
});

askBtn.addEventListener('click', async () => {
  let subject = subjectSelect.value;
  if (subject === 'Other') {
    subject = customSubjectInput.value.trim();
  }

  const question = questionInput.value.trim();

  if (!subject || !question) {
    alert('Please enter both subject and question!');
    return;
  }

  askBtn.disabled = true;
  askBtn.textContent = 'Thinking...';
  answerBox.classList.add('hidden');

  try {
    const response = await fetch('http://localhost:3000/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question, subject })
    });

    const data = await response.json();

    answerText.innerHTML = marked.parse(data.answer);
    answerBox.classList.remove('hidden');
  } catch (error) {
    alert('Something went wrong. Make sure the server is running!');
    console.error(error);
  } finally {
    askBtn.disabled = false;
    askBtn.textContent = 'Ask AI';
  }
});