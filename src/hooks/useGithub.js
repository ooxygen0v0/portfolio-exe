import { useEffect, useState } from 'react'
import { githubUsername } from '../config/github'
import { fetchGithubData } from '../utils/githubApi'

export function useGithub() {
  const username = githubUsername.trim()
  const [state, setState] = useState({
    status: username ? 'loading' : 'unconfigured',
    profile: null,
    repositories: [],
    error: null,
  })

  useEffect(() => {
    if (!username) return undefined

    const controller = new AbortController()

    fetchGithubData(username, controller.signal)
      .then(({ profile, repositories }) => {
        if (!controller.signal.aborted) {
          setState({ status: 'success', profile, repositories, error: null })
        }
      })
      .catch((error) => {
        if (!controller.signal.aborted) {
          setState({ status: 'error', profile: null, repositories: [], error: error.message })
        }
      })

    return () => controller.abort()
  }, [username])

  return state
}
