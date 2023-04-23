import { Octokit } from 'octokit'
import { Repo } from '../types'

const api = async ({
  isSearch = false,
  apiUrl,
  variables,
  method,
  headers,
  body,
}: {
  isSearch?: boolean
  apiUrl: string
  variables?: { q: string }
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  headers?: any
  body?: any
}): Promise<any> => {
  try {
    if (isSearch) {
      const octokit = new Octokit({
        auth: process.env.GITHUB_TOKEN,
      })
      const result = await octokit.request(apiUrl, {
        ...variables,
      })
      return result.data
    } else {
      const fetchOptions = {
        method,
        headers,
        body: JSON.stringify(body),
      }
      if (method === 'GET') {
        delete fetchOptions.body
      }
      const response = await fetch(apiUrl, fetchOptions)

      return response.json()
    }
  } catch (error) {
    console.error('ERROR:', error)
    return Error(`${error.code} ${error.message}`)
  }
}

const API = (() => {
  return {
    async searchAll(searchTerm: string): Promise<any> {
      const response = await api({
        apiUrl: 'GET /search/repositories',
        isSearch: true,
        variables: {
          q: searchTerm,
        },
      })
      return response?.items
    },
    async getReposList(): Promise<Repo> {
      const response = await api({
        apiUrl: 'http://localhost:8080/repo/',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      return response.repos
    },
    async addRepo(repoPayload: Repo): Promise<Repo> {
      const response = await api({
        apiUrl: 'http://localhost:8080/repo/',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: repoPayload,
      })

      return response
    },
  }
})()

export default API
