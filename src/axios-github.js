// @ts-check
const axios = require('axios').default;
const os = require('os');

// Вариант 1
(async () => {
    const type = '--full';

    try {        
        const messages = await repos('sindresorhus', type === '--full');
        console.log(messages);
    } catch (err) {
        console.error(err);
    }
})();

// Вариант 2
// repos('sindresorhus').then(console.log);

async function repos(user, showFullData) {
    const { data } = await axios({
        method: 'get',
        url: `https://api.github.com/users/${user}/repos`,
        responseType: 'json',
    });

    const messageHandler = showFullData === true ? githubReposFullName : githubReposName;
    const messages = (data || []).map(messageHandler);

    return messages.join(os.EOL);
}

function githubReposName(repoData) {
    return ` N: ${repoData.name}❗ `;
}

function githubReposFullName(repoData) {
    return ` N: ${repoData.name}, F:  ${repoData.fork}, L:  ${repoData.language} ❗ `;
}
