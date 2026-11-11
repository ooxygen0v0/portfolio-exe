const CACHE_MINUTES = 15

function cacheKey(username) {
  return `portfolio-github-${username.toLowerCase()}`
}

function readCache(username) {
  try {
    const raw = sessionStorage.getItem(cacheKey(username))
    if (!raw) return null
    const value = JSON.parse(raw)
    if (Date.now() - value.savedAt > CACHE_MINUTES * 60_000) return null
    return value.data
  } catch {
    return null
  }
}

function saveCache(username, data) {
  try {
    sessionStorage.setItem(cacheKey(username), JSON.stringify({ savedAt: Date.now(), data }))
  } catch {
    // 저장소 사용이 막혀 있어도 API 통신은 정상 동작합니다.
  }
}

async function requestJson(url, signal) {
  const response = await fetch(url, {
    signal,
    headers: { Accept: 'application/vnd.github+json' },
  })

  if (response.status === 404) throw new Error('NOT_FOUND')
  if (response.status === 403 || response.status === 429) throw new Error('RATE_LIMIT')
  if (!response.ok) throw new Error('REQUEST_FAILED')

  return response.json()
}

export async function fetchGithubData(username, signal) {
  const cached = readCache(username)
  if (cached) return cached

  const name = encodeURIComponent(username)
  const profile = await requestJson(`https://api.github.com/users/${name}`, signal)
  const repositories = await requestJson(
    `https://api.github.com/users/${name}/repos?type=owner&sort=updated&direction=desc&per_page=12`,
    signal
  )

  const data = {
    profile: {
      login: profile.login,
      name: profile.name,
      bio: profile.bio,
      avatarUrl: profile.avatar_url,
      htmlUrl: profile.html_url,
      publicRepos: profile.public_repos,
      followers: profile.followers,
    },
    repositories: repositories
      .filter((repo) => !repo.fork && !repo.private)
      .map((repo) => ({
        id: repo.id,
        name: repo.name,
        description: repo.description,
        language: repo.language,
        stars: repo.stargazers_count,
        htmlUrl: repo.html_url,
      })),
  }

  saveCache(username, data)
  return data
}
