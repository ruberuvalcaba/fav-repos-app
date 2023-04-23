export interface Repo {
  id: string
  name: string
  description: string | null
  language: string | null
  stargazers_count: number
  created_at: Date
}
