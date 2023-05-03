export const clientUtils = {
  fetching: {
    async post<T>(url: string, body: T) {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...body }),
      });

      return await response.json();
    },
  },
};