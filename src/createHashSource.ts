// hash path utilities taken from ReactTraining's History package
// https://github.com/ReactTraining/history/blob/master/modules/createHashHistory.js
const hasWindow = (): boolean => {
  return typeof window !== `undefined`
}

const getHashPath = (): string => {
  // Can't use window.location.hash here because it's not
  // consistent across browsers - Firefox will pre-decode it!
  const href = hasWindow() ? window.location.href : ''
  const hashIndex = href.indexOf('#')
  return hashIndex === -1 ? '' : href.substring(hashIndex + 1)
}

const pushHashPath = (path: string) => (window.location.hash = path)

const replaceHashPath = (path: string) => {
  if (hasWindow()) {
    const hashIndex = window.location.href.indexOf('#')

    window.location.replace(
      window.location.href.slice(0, hashIndex >= 0 ? hashIndex : 0) + '#' + path
    )
  }
}

const getState = (path?: string) => {
  const pathname = path ? path : getHashPath()
  return { pathname, search: '' }
}

const resolveInitialState = state => {
  if (state.pathname === '') {
    replaceHashPath('/')
  }
}

const createHashSource = () => {
  let state = getState()

  resolveInitialState(state)

  return {
    get location() {
      return getState()
    },
    addEventListener(name, fn) {
      hasWindow() && window.addEventListener(name, fn)
    },
    removeEventListener(name, fn) {
      hasWindow() && window.removeEventListener(name, fn)
    },
    history: {
      state,
      pushState(stateObj, _, uri) {
        state = getState(uri)
        pushHashPath(uri)
      },
      replaceState(stateObj, _, uri) {
        state = getState(uri)
        replaceHashPath(uri)
      },
    },
  }
}

export default createHashSource
