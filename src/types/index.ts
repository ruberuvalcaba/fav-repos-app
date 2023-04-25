export interface RepoPayload {
  id: string
  name: string
  full_name: string
  description: string | null
  language: string | null
  stargazers_count: number
  url: string
  created_at: Date
}
export interface Repo {
  id: string
  name?: string
  fullName: string
  description?: string | null
  language: string | null
  stargazersCount: number
  url: string
  createdAt: Date
}
export interface GenericResponse {
  status: number
  statusText: string
  type: string
}
export interface State {
  reposList: Repo[]
}
export interface Dispatch {
  type: string
  value?: any
  error?: string
}

export type SortOrder = 'asc' | 'desc'

export type AlerBarStatus = 'error' | 'info' | 'warning' | 'success' | 'loading'
