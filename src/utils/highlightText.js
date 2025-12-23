export function highlightKeywords(text, matched = [], missing = []) {
  let highlighted = text;

  matched.forEach((word) => {
    const regex = new RegExp(`\\b${word}\\b`, "gi");
    highlighted = highlighted.replace(
      regex,
      `<span class="bg-green-200 dark:bg-green-700 px-1 rounded">${word}</span>`
    );
  });

  missing.forEach((word) => {
    const regex = new RegExp(`\\b${word}\\b`, "gi");
    highlighted = highlighted.replace(
      regex,
      `<span class="bg-red-200 dark:bg-red-700 px-1 rounded">${word}</span>`
    );
  });

  return highlighted;
}
