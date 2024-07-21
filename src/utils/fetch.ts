export const fetchResolver = async <Response>(
  input: string | URL | globalThis.Request,
  init?: RequestInit,
  resolveWith: 'json' | 'text' = 'json'
) => {
  const res = await fetch(input, init).then((res) => res[resolveWith]());

  return res as Response;
};
