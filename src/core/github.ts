import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

class GithubAPI {
  private client: AxiosInstance;
  constructor(username?: string, password?: string) {
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

  public async getAllOrganizationRepositories(org: string) {
    const { data } = await this.client.get(`/orgs/${org}/repos`);
    return data;
  }

  public async getCollaborators(org: string, project: string) {
    const { data } = await this.client.get(`/repos/${org}/${project}/contributors`).catch(err => err);
    return data;
  }
}

export default new GithubAPI(process.env.GITHUB_USERNAME, process.env.GITHUB_PASSWORD);
