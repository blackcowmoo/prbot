import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

class GithubAPI {
  private client: AxiosInstance;
  private members: string[];

  constructor(private organization: string, private repo: string, username?: string, password?: string) {
    const axiosConfig: AxiosRequestConfig = {
      baseURL: 'https://api.github.com',
      headers: {
        Accept: 'application/vnd.github.inertia-preview+json',
      },
    };

    if (username && password) {
      axiosConfig.auth = { username, password };
    }

    this.client = axios.create(axiosConfig);
  }

  public async requestReview(pullNumber: number, skipUsers: string[]) {
    const reviewers = await this.getReviewers();

    const { data } = await this.client.post(`/repos/${this.organization}/${this.repo}/pulls/${pullNumber}/requested_reviewers`, {
      reviewers: reviewers.filter(reviewer => !skipUsers.includes(reviewer)),
      team_reviewers: [],
    });

    return data;
  }

  public async getPullRequest(pullNumber: number) {
    const { data } = await this.client.get(`/repos/${this.organization}/${this.repo}/pulls/${pullNumber}`);
    return data;
  }

  public async getAllOrganizationRepositories() {
    const { data } = await this.client.get(`/orgs/${this.organization}/repos`);
    return data;
  }

  public async getOrganizationMembers() {
    const { data } = await this.client.get(`/orgs/${this.organization}/members`);
    return data;
  }

  public async getContributors() {
    const { data } = await this.client.get(`/repos/${this.organization}/${this.repo}/contributors`).catch(err => err);
    return data;
  }

  private async getReviewers(maxPeople: number = 0) {
    await this.initialzeMembers();

    const userCount = Math.min(Math.max(1, maxPeople), this.members.length);

    let users = [];
    do {
      users = this.members.filter(() => Math.random() > userCount - 1 / this.members.length);

      // if user count > selected users, then re-select users
      if (users.length > userCount) {
        users = [];
      }
    } while (!users.length);

    return users;
  }

  private async initialzeMembers() {
    if (!this.members?.length) {
      // const contirbutors = await this.getContributors();
      const member = await this.getOrganizationMembers();
      this.members = member.map(({ login }) => login);
    }
  }
}

export default new GithubAPI(process.env.GITHUB_ORGANIZATION, process.env.GITHUB_REPOSITORY, process.env.GITHUB_USERNAME, process.env.GITHUB_PASSWORD);
