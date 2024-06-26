document.getElementById('submit').addEventListener('click', () => {
    const questionName = document.getElementById('questionName').value;
    const description = document.getElementById('description').value;
    const code = document.getElementById('code').value;
  
    chrome.runtime.sendMessage({
      action: 'submitCode',
      questionName,
      description,
      code
    });
  });