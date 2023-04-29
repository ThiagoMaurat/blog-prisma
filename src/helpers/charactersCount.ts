export function letterCounter(x: string, numberOfChar: number) {
  const numbersCharacters = x.replace(/[^a-zA-Z]/g, "").length;
  if (numbersCharacters > numberOfChar) {
    return x.substring(0, numberOfChar).concat(" ...");
  }
  return x;
}
