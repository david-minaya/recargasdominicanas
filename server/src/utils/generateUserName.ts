export function generateUserName(name: string, id: number, position: number) {

  const words = name.split(' ');
  const code = id.toString().padStart(2, '0').slice(-2);

  if (words.length === 1) {

    return `${words[0]}${code}${position}`.toLowerCase();

  } else if (words.length > 1) {

    const [firstWord, ...otherWords] = words;
    const firstWordAbbr = firstWord.substring(0, 3);
    const otherWordsJoined = otherWords.join('');

    return `${firstWordAbbr}${otherWordsJoined}${code}${position}`.toLowerCase();
  }
}
