import useFetch from "./useFetch";

// This is an interface
interface IComments {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

const Comments = () => {
  const url: string = "https://jsonplaceholder.typicode.com/comments";

  const { data, loading, error } = useFetch(url);
  const convertedData: IComments[] = data as IComments[];

  return (
    <>
      <h2>Comments</h2>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {convertedData && (
        <div>
          {convertedData.map((item) => (
            <div key={item.id}>
              <h3>{item.name}</h3>
              <p>{item.email}</p>
              <p>{item.body}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Comments;
