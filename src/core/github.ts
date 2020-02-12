import GitHub from 'github-api';
// const gh = new GitHub();

class GithubAPI {
  private client: GitHub;
  constructor(username?: string, password?: string) {
    if (username && password) {
      this.client = new GitHub({ username, password });
    } else {
      this.client = new GitHub();
    }
  }
}

export default new GithubAPI(process.env.GITHUB_USERNAME, process.env.GITHUB_PASSWORD);
