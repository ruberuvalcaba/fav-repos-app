import * as types from './repoTypes'
import API from '../api'
import { Repo } from '../types'

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

  return {
    addRepo,
    getReposList,
    removeRepo,
  }
}
