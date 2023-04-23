import { Octokit } from 'octokit'

const api = async ({
  endpoint,
  variables,
}: {
  endpoint: string
  variables: { q: string }
}): Promise<any> => {
  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
  })

  try {
    const result = await octokit.request(endpoint, {
      ...variables,
    })
    return result.data
  } catch (error) {
    console.error('ERROR:', error)
    return Error(`${error.code} ${error.message}`)
  }
}

const API = (() => {
  return {
    async searchAll(searchTerm: string): Promise<any> {
      const response = await api({
        endpoint: 'GET /search/repositories',
        variables: {
          q: searchTerm,
        },
      })
      return response?.items
    },
  }
})()

export default API
