export default function SearchedUsers({user}) {
  console.log(user)
  return (
    <>
      <div className="SearchedUser">
        {user.displayName}
      </div>
    </>
  )
}
