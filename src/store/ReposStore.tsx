import React, { useReducer } from 'react'
import * as types from '../actions/actionTypes'
import { useRepoActions } from '../actions'
import { Repo, State, Dispatch, GenericResponse, SortOrder } from '../types'

interface ProviderProps {
  children: JSX.Element
}

const initialState = {
  reposList: [],
} as State

const contextIntialState = {
  actions: {
    addRepo: (params: Repo): Promise<Repo> => {
      return
    },
    getReposList: (): Promise<Repo> => {
      return
    },
    removeRepo: (id: string): Promise<GenericResponse> => {
      return
    },
    sortData: (data: Repo[], sortKey: keyof Repo, sortOrder: SortOrder) => {},
  },
  state: initialState,
}

const RepoContext = React.createContext(contextIntialState)
const { Provider } = RepoContext

const reducer = (state: State, action: Dispatch) => {
  switch (action.type) {
    case types.GET_REPO_LIST_SUCCESS: {
      return {
        ...state,
        reposList: action.value,
      }
    }
    case types.ADD_REPO_SUCCESS: {
      const { reposList } = state
      return {
        ...state,
        reposList: [...reposList, action.value],
      }
    }
    case types.REMOVE_REPO_SUCCESS: {
      return {
        ...state,
        reposList: state.reposList.filter((repo: Repo) => repo.id !== action.value),
      }
    }
    case types.SORT_REPO_LIST_COMPLETED: {
      return {
        ...state,
        reposList: action.value,
      }
    }
    case types.GET_REPO_LIST_FAILURE:
    case types.ADD_REPO_FAILURE:
    case types.REMOVE_REPO_FAILURE:
      return {
        ...state,
        error: action.error,
      }
    default:
      return { ...state }
  }
}

const RepoProvider = ({ children }: ProviderProps): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const actions = useRepoActions(dispatch)

  return <Provider value={{ state, actions }}>{children}</Provider>
}

export { RepoProvider, RepoContext }
