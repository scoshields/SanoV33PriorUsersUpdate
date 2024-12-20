export function insertTextAtCursor(
  textarea: HTMLTextAreaElement | null,
  text: string
): string | undefined {
  if (!textarea) return undefined;

  const startPos = textarea.selectionStart;
  const endPos = textarea.selectionEnd;
  const textBefore = textarea.value.substring(0, startPos);
  const textAfter = textarea.value.substring(endPos);

  // Add a newline before the text if we're not at the start of a line
  const prefix = startPos > 0 && !textBefore.endsWith('\n') ? '\n' : '';
  
  // Add a newline after if there isn't one
  const suffix = !textAfter.startsWith('\n') ? '\n' : '';

  // Add [+] prefix to mark added text
  const markedText = `[+] ${text}`;
  const newText = textBefore + prefix + markedText + suffix + textAfter;
  textarea.value = newText;

  // Set cursor position after inserted text
  const newPosition = startPos + prefix.length + markedText.length + suffix.length;
  textarea.selectionStart = newPosition;
  textarea.selectionEnd = newPosition;

  // Trigger change event
  const event = new Event('change', { bubbles: true });
  textarea.dispatchEvent(event);
  
  return newText;
}