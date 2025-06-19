// Websafe token encoder
export const webSafeBtoA = (tokenOriginal: string): string => {
  // Replaces '+' with '-',
  // Replaces '/' with '_',
  // Replaces '=' at the end with ''.

  const tokenWebSafe = btoa(tokenOriginal).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "")

  return tokenWebSafe
}
