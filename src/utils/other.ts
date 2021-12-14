export function encode(data: object) {
  return Object.keys(data)
    .map(
      (key) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(
          data[key as keyof typeof data]
        )}`
    )
    .join("&");
}