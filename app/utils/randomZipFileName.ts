import { zipFileNames } from './config';

export default function randomZipFileName() {
  const names = zipFileNames;
  const randIndex = Math.floor(Math.random() * names.length);
  return names[randIndex];
}
