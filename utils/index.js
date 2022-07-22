export const fetcher = (...args) => fetch(...args).then((res) => res.json());

export const capitalizeSlug = (slug) => {
  const title = slug?.replace(/-/g, ' ').replace(/[^\w-]+/g, ' ');
  return title
    ?.split(' ')
    .map((element) => {
      return element.charAt(0).toUpperCase() + element.substring(1).toLowerCase();
    })
    .join(' ');
};
