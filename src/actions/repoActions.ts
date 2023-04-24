import * as types from './repoTypes'
import API from '../api'
import { Repo, SortOrder } from '../types'

export default (dispatch: any) => {
  const getReposList = async () => {
    try {
      const results = await API.getReposList()

      dispatch({
        type: types.GET_REPO_LIST_SUCCESS,
        value: results,
      })
      return results
    } catch (error) {
      dispatch({ type: types.GET_REPO_LIST_FAILURE, error })
      throw error
    }
  }
  const addRepo = async (payload: Repo) => {
    try {
      const response = await API.addRepo(payload)
      if (response?.id) {
        dispatch({
          type: types.ADD_REPO_SUCCESS,
          value: response,
        })
      }
      return response
    } catch (error) {
      dispatch({ type: types.ADD_REPO_FAILURE, error })
      throw error
    }
  }
  const removeRepo = async (id: string) => {
    try {
      const response = await API.removeRepo(id)
      if (response?.status === 200) {
        dispatch({
          type: types.REMOVE_REPO_SUCCESS,
          value: id,
        })
      }
      return response
    } catch (error) {
      dispatch({ type: types.REMOVE_REPO_FAILURE, error })
      throw error
    }
  }
  const sortData = (data: Repo[], sortKey: keyof Repo, sortOrder: SortOrder) => {
    const sortedData = [...data].sort((a: Repo, b: Repo) => {
      const aValue = (a[sortKey] || 0) as any // 0 because stars count = 0 are not saved to DB
      const bValue = (b[sortKey] || 0) as any

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
      } else {
        return sortOrder === 'asc' ? aValue - bValue : bValue - aValue
      }
    })

    dispatch({
      type: types.SORT_REPO_LIST_COMPLETED,
      value: sortedData,
    })
  }

  return {
    addRepo,
    getReposList,
    removeRepo,
    sortData,
  }
}
