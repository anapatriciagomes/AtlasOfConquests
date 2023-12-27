function VisitedCountries({ loggedIn, loggedUserDetails }) {
  return (
    <div className="mt-[100px]">
      {loggedIn && loggedUserDetails ? (
        loggedUserDetails.visited.map(visited => {
          <div key={visited.id}>
            <p>{visited.country}</p>
          </div>;
        })
      ) : (
        <h1>
          Your list is still empty, click on the map below to add countries.
        </h1>
      )}
    </div>
  );
}

export default VisitedCountries;
