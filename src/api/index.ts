import { Octokit } from 'octokit'
import { Repo, GenericResponse } from '../types'

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

      return response
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
    async addRepo(repoPayload: Repo): Promise<GenericResponse> {
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
