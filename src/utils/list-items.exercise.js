<<<<<<< HEAD
import {useQuery, useMutation} from 'react-query'
import {client} from './api-client'
import {queryCache} from 'react-query'
import {setQueryDataForBook} from './books'

function useListItems(user) {
  const {data: listItems} = useQuery({
    queryKey: 'list-items',
    queryFn: () =>
      client(`list-items`, {token: user.token}).then(data => data.listItems),
    config: {
      onSuccess(listItems) {
        for (const listItem of listItems) {
          setQueryDataForBook(listItem.book)
        }
      },
    },
  })
  return listItems ?? []
}

function useListItem(user, bookId) {
  // pass the user here because we pass into useListItems func above
  const listItems = useListItems(user)
=======
import {useQuery, useMutation, queryCache} from 'react-query'
import {useClient} from 'context/auth-context'
import {setQueryDataForBook} from './books'
import {client} from './api-client'

function useListItems() {
  const client = useClient()

  const {data} = useQuery({
    queryKey: 'list-items',
    queryFn: () => client(`list-items`).then(data => data.listItems),
    onSuccess: async listItems => {
      for (const listItem of listItems) {
        setQueryDataForBook(listItem.book)
      }
    },
  })

  return data ?? []
}

function useListItem(bookId) {
  const listItems = useListItems()
>>>>>>> 546257ba3f76fa91b42bf52212d713ab8259f8b3
  return listItems.find(li => li.bookId === bookId) ?? null
}

const defaultMutationOptions = {
<<<<<<< HEAD
  onSettled: () => queryCache.invalidateQueries('list-items'),
}

function useUpdateListItem(user, options) {
=======
  onError: (err, variables, recover) =>
    typeof recover === 'function' ? recover() : null,
  onSettled: () => queryCache.invalidateQueries('list-items'),
}

function useUpdateListItem(options) {
  const client = useClient()

>>>>>>> 546257ba3f76fa91b42bf52212d713ab8259f8b3
  return useMutation(
    updates =>
      client(`list-items/${updates.id}`, {
        method: 'PUT',
        data: updates,
<<<<<<< HEAD
        token: user.token,
      }),
    {...defaultMutationOptions, ...options},
  )
}

function useRemoveListItem(user, options) {
  return useMutation(
    ({id}) => client(`list-items/${id}`, {method: 'DELETE', token: user.token}),
    {...defaultMutationOptions, ...options},
  )
}

function useCreateListItem(user, options) {
  return useMutation(
    ({bookId}) => client(`list-items`, {data: {bookId}, token: user.token}),
    {...defaultMutationOptions, ...options},
  )
}

export {
  useListItems,
  useListItem,
=======
      }),
    {
      onMutate(newItem) {
        const previousItems = queryCache.getQueryData('list-items')

        queryCache.setQueryData('list-items', old => {
          return old.map(item => {
            return item.id === newItem.id ? {...item, ...newItem} : item
          })
        })

        return () => queryCache.setQueryData('list-items', previousItems)
      },
      ...defaultMutationOptions,
      ...options,
    },
  )
}

function useRemoveListItem(options) {
  const client = useClient()

  return useMutation(({id}) => client(`list-items/${id}`, {method: 'DELETE'}), {
    onMutate(removedItem) {
      const previousItems = queryCache.getQueryData('list-items')

      queryCache.setQueryData('list-items', old => {
        return old.filter(item => item.id !== removedItem.id)
      })

      return () => queryCache.setQueryData('list-items', previousItems)
    },
    ...defaultMutationOptions,
    ...options,
  })
}

function useCreateListItem(options) {
  const client = useClient()

  return useMutation(({bookId}) => client(`list-items`, {data: {bookId}}), {
    ...defaultMutationOptions,
    ...options,
  })
}

export {
  useListItem,
  useListItems,
>>>>>>> 546257ba3f76fa91b42bf52212d713ab8259f8b3
  useUpdateListItem,
  useRemoveListItem,
  useCreateListItem,
}
