import useFetch from "../../service/useFetch";

function CatFactList() {
  const { data, loading, error } = useFetch('https://catfact.ninja/facts?limit=10');

  let message = 'There are no result for your request'

  if (loading) message = '...Loading';
  if (error) message = `Error ${error}`;
  if (!data || !data.length) return <div>{message}</div>;
  console.log(data)

  return (
    <div>
      <h1>Cat advices</h1>
      {data.map((advice, i) => (
        <div key={i} style={{ border: '1px solid black', marginBottom: '.5rem', padding: '0 .5rem' }}>
          <p>Title: {advice.fact}</p>
          <p>Length: {advice.length}</p>
        </div>
      ))}
    </div>
  );
}

export default CatFactList;
