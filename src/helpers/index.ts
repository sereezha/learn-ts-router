const getIdFromUrl = (url: string) => url.split("/").slice(-1);

const getUrlParam = (searchParams: URLSearchParams, name: string) => {
  return searchParams.get(name)?.toString();
};

export { getIdFromUrl, getUrlParam };
