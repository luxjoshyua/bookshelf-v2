import {loadDevTools} from './dev-tools/load'
import './bootstrap'
import * as React from 'react'
import {createRoot} from 'react-dom/client'
import {App} from './app'
import {ReactQueryConfigProvider} from 'react-query'

// set up config for react-query
// https://github.com/TanStack/query/blob/2.x/docs/src/pages/docs/api.md#reactqueryconfigprovider
const queryConfig = {
  queries: {
    // global query config here
    useErrorBoundary: true,
    refetchOnWindowFocus: false, // don't refetch data on window refocus
    retry(failureCount, error) {
      // only retry if the error status is 404 or if the failure count is greater than 2
      // return failureCount > 2 || error.status === 404 ? false : true
      if (error.status === 404) return false
      else if (failureCount < 2) return true
      else return false // neither is true so return false
    },
  },
}

// ignore the rootRef in this file. I'm just doing it here to make
// the tests I write to check your work easier.
export const rootRef = {}
loadDevTools(() => {
  const root = createRoot(document.getElementById('root'))
  root.render(
    <ReactQueryConfigProvider config={queryConfig}>
      <App />
    </ReactQueryConfigProvider>,
  )
  rootRef.current = root
})
