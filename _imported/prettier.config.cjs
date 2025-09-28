/** @type {import("prettier").Config} */
module.exports = {
  semi: true, // ; al final de línea
  singleQuote: true, // comillas simples
  trailingComma: 'all', // comas al final en objetos/arrays multi-línea
  printWidth: 100, // ancho razonable para diffs
  tabWidth: 2, // indentación de 2 espacios
  bracketSpacing: true, // espacios en { objetos }
  arrowParens: 'always', // paréntesis en arrow functions (consistencia)
  endOfLine: 'lf', // saltos de línea UNIX (evita diffs en Windows)
};
