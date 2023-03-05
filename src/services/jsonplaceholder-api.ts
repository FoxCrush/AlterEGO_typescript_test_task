export const fetchInitialPosts = (): Promise<Response> => {
  return fetch("https://jsonplaceholder.typicode.com/posts");
};
