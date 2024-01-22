const { Octokit } = require('@octokit/core');
const octokit = new Octokit({ auth: '<<<Token PAT here>>>' });

async function forkRepos(organization) {
  try {
    const repos = await octokit.request(`GET /orgs/${organization}/repos`);
    
    for (const repo of repos.data) {
      await octokit.request('POST /repos/:owner/:repo/forks', {
        owner: organization,
        repo: repo.name,
      });

      console.log(`Forked ${repo.name}`);
    }
  } catch (error) {
    console.error(`Erro ao realizar fork: ${error.message}`);
  }
}

const organization = '<<<orgName here>>>';
forkRepos(organization);
