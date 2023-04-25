import { Octokit } from 'octokit'
import { Repo, GenericResponse } from '../types'

const api = async ({
  isSearch = false,
  subRoute = '',
  variables,
  method,
  body,
}: {
  isSearch?: boolean
  subRoute?: string
  variables?: { q: string }
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  body?: any
}): Promise<any> => {
  try {
    if (isSearch) {
      const apiUrl = 'GET /search/repositories'
      const octokit = new Octokit({
        auth: process.env.GITHUB_TOKEN,
      })
      const result = await octokit.request(apiUrl, {
        ...variables,
      })
      return result.data
    } else {
      const apiUrl = `http://localhost:8080/${subRoute}`

      const fetchOptions = {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }
      if (method === 'GET' || method === 'DELETE') {
        delete fetchOptions.body
      }
      const response = await fetch(apiUrl, fetchOptions)

      return method !== 'DELETE' && subRoute !== 'health' ? response.json() : response
    }
  } catch (error) {
    console.error('ERROR:', error)
    return Error(`${error.code} ${error.message}`)
  }
}

const API = (() => {
  return {
    async healthCheck(): Promise<any> {
      const response = await api({
        method: 'GET',
        subRoute: 'health',
      })
      return response
    },
    async searchAll(searchTerm: string): Promise<any> {
      const response = await api({
        isSearch: true,
        variables: {
          q: searchTerm,
        },
      })
      return response?.items
    },
    async getReposList(): Promise<Repo> {
      const response = await api({
        method: 'GET',
        subRoute: 'repo/',
      })

      return response.repos
    },
    async addRepo(repoPayload: Repo): Promise<Repo> {
      const response = await api({
        method: 'POST',
        subRoute: 'repo/',
        body: repoPayload,
      })

      return response
    },
    async removeRepo(id: string): Promise<GenericResponse> {
      const response = await api({
        method: 'DELETE',
        subRoute: `repo/${id}`,
      })
      return response
    },
  }
})()

export default API
