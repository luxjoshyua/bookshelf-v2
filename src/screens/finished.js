// export * from './finished.final'

<<<<<<< HEAD
function FinishedScreen({user}) {
  return (
    <ListItemList
      user={user}
      filterListItems={li => Boolean(li.finishDate)}
      noListItems={
        <p>
          Hey there! This is where books will go when you've finished reading
          them. Get started by heading over to{' '}
          <Link to="/discover">the Discover page</Link> to add books to your
          list.
        </p>
      }
      noFilteredListItems={
        <p>
          Looks like you've got some reading to do! Check them out in your{' '}
          <Link to="/list">reading list</Link> or{' '}
          <Link to="/discover">discover more</Link>.
        </p>
      }
    />
  )
}

export {FinishedScreen}
=======
export * from './finished.exercise'
>>>>>>> 546257ba3f76fa91b42bf52212d713ab8259f8b3
