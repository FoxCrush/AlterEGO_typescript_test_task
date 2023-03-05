export const fetchInitialPosts = (): Promise<Response> => {
  return fetch("https://jsonplaceholder.typicode.com/posts/1/comments");
};
export const fetchAdditionalPosts = (page: number): Promise<Response> => {
  return fetch(`https://jsonplaceholder.typicode.com/posts/${page}/comments`);
};
