export const ApiService = {
  get(path) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(
          fetch(`/mock/${path}.json`).then((response) => {
            const contentType = response.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
              throw new TypeError("Oops, we haven't got JSON!");
            }
            return response.json();
          })
        );
      }, 2000);
    });
  },
};
