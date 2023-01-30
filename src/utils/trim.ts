/**
 * Очистка из начала и конца строки заданных символов
 * @param inputString - входная строка
 * @param pattern - символы, требующие удаления
 */
export function trim(inputString: string, pattern = ' '): string {
  if (pattern === '') {
    return inputString.trim();
  }

  const regex = new RegExp(pattern, 'gi');
  const result: string = inputString.replace(regex, '');

  return result;
}
