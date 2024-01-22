const { Octokit } = require('@octokit/core');
const octokit = new Octokit({ auth: '<<<Token PAT here>>>' });

async function deleteForks(username) {
  try {
    const forks = await octokit.request('GET /user/repos', { affiliation: 'owner' });

    for (const fork of forks.data) {
      if (fork.fork) {
        await octokit.request('DELETE /repos/:owner/:repo', {
          owner: username,
          repo: fork.name,
        });

        console.log(`Fork ${fork.name} excluído`);
      }
    }
  } catch (error) {
    console.error(`Erro ao excluir forks: ${error.message}`);
  }
}

const seuUsername = '<<<username github here>>>';
deleteForks(seuUsername);
