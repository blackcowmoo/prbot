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

  public async getPullRequest(pullNumber: number) {
    const { data } = await this.client.get(`/repos/${this.organization}/${this.repo}/pulls/${pullNumber}`);
    return data;
  }

  public async getAllOrganizationRepositories() {
    const { data } = await this.client.get(`/orgs/${this.organization}/repos`);
    return data;
  }

  public async getContributors() {
    const { data } = await this.client.get(`/repos/${this.organization}/${this.repo}/contributors`).catch(err => err);
    return data;
  }

  private async initialzeMembers() {
    if (!this.members?.length) {
      const contirbutors = await this.getContributors();
      console.log(contirbutors);
    }
  }
}

export default new GithubAPI(process.env.GITHUB_ORGANIZATION, process.env.GITHUB_REPOSITORY, process.env.GITHUB_USERNAME, process.env.GITHUB_PASSWORD);
