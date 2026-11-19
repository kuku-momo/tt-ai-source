// Executed in the Doubao page. A task-specific end marker is required; text
// remaining unchanged for a few seconds is not evidence of completion.
function readStoryboardReply(root, { marker, prompt }) {
  if (!marker) return '';
  const candidates = [...root.querySelectorAll('div,article,section,pre')].filter(element => {
    if (element.closest('[contenteditable="true"],textarea,input,nav,aside')) return false;
    return element.getClientRects().length > 0;
  }).map(element => (element.innerText || '').trim()).filter(text => {
    if (!text.endsWith(marker) || text === prompt || (prompt && text.includes(prompt))) return false;
    // Keep even a malformed answer: parsing happens locally on the server,
    // where the original response remains available for review.
    return text.slice(0, -marker.length).trim().length > 0;
  }).sort((a, b) => a.length - b.length);
  return candidates[0] ? candidates[0].slice(0, -marker.length).trim() : '';
}
module.exports = { readStoryboardReply };
