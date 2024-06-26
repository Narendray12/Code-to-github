importScripts('config.js');
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'submitCode') {
    submitToGitHub(request.questionName, request.description, request.code)
      .then(() => {
        sendResponse({ success: true });
      })
      .catch(error => {
        sendResponse({ success: false, error: error.message });
      });
    return true;
  }
});
  
  async function submitToGitHub(questionName, description, code) {
    const { GITHUB_TOKEN, REPO_OWNER, REPO_NAME } = CONFIG;
    const path = `Solutions/${questionName}.txt`
    const url = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${path}`;
  
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: `Add ${questionName}`,
        content: btoa(`// ${description}\n\n${code}`),
      }),
    });
  
    if (response.ok) {
      console.log('File created successfully');
    } else {
      console.error('Error creating file:', await response.text());
    }
  }