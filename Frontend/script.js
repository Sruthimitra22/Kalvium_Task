document.addEventListener('DOMContentLoaded', () => {
    const runButton = document.getElementById('run-button');
    const languageSelect = document.getElementById('language-select');
    const codeInput = document.getElementById('code-input');
    const outputText = document.getElementById('output-text');
    const errorDiv = document.getElementById('error');

    runButton.addEventListener('click', async () => {
        const language = languageSelect.value;
        const code = codeInput.value;

        try {
            const response = await axios.post('http://localhost:3000/api/execute/', {
                language,
                code,
                input: ''
            });

            outputText.textContent = response.data.output;
            errorDiv.textContent = response.data.error || '';
        } catch (error) {
            console.error('Error:', error.message);
            errorDiv.textContent = 'Error occurred while running code.';
        }
    });
});
