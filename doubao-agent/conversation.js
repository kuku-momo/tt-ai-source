function conversationUrl(value) {
  try {
    const url = new URL(String(value || '').trim());
    if (url.protocol !== 'https:' || !/^(www\.)?doubao\.com$/.test(url.hostname) || url.port || url.username || url.password
      || !/^\/chat\/[a-zA-Z0-9_-]+\/?$/.test(url.pathname)) return '';
    return `https://www.doubao.com${url.pathname.replace(/\/$/, '')}`;
  } catch { return ''; }
}
const isTemporaryConversation = value => /\/chat\/local_[a-zA-Z0-9_-]+$/.test(conversationUrl(value));
const isAssignedConversation = value => /\/chat\/\d+$/.test(conversationUrl(value));

function isConversationLoading(value) {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && /^(www\.)?doubao\.com$/.test(url.hostname)
      && !url.port && !url.username && !url.password && /^\/chat\/?$/.test(url.pathname);
  } catch { return false; }
}

// Only the observed local_<id> -> numeric server ID promotion is eligible for
// rebinding, and only after the caller verifies the submitted message remains
// visible. A different stable ID is always a different conversation.
function createConversationGuard(initialUrl = '', { now = Date.now, graceMs = 16000 } = {}) {
  let boundUrl = conversationUrl(initialUrl), waitingSince = null;
  const wait = () => {
    if (waitingSince === null) waitingSince = now();
    return { state: now() - waitingSince >= graceMs ? 'mismatch' : 'waiting', url: boundUrl };
  };
  return {
    get url() { return boundUrl; },
    needsEvidence(value) {
      return isTemporaryConversation(boundUrl) && isAssignedConversation(value);
    },
    observe(value, sameTask = false) {
      const current = conversationUrl(value);
      if (!current) return isConversationLoading(value) ? wait() : { state: 'mismatch', url: boundUrl };
      if (!boundUrl) {
        boundUrl = current; waitingSince = null;
        return { state: isTemporaryConversation(current) ? 'waiting' : 'ready', url: boundUrl, changed: true };
      }
      if (current === boundUrl) {
        waitingSince = null;
        // Doubao may keep a live task on its local_<id> URL even after the
        // result is complete. An exact URL match is still the task-owned page,
        // so it is safe to inspect and retrieve its video without waiting for
        // a numeric conversation ID.
        return { state: 'ready', url: boundUrl };
      }
      if (isTemporaryConversation(boundUrl) && isAssignedConversation(current)) {
        if (!sameTask) return wait();
        const previousUrl = boundUrl;
        boundUrl = current; waitingSince = null;
        return { state: 'ready', changed: true, promoted: true, previousUrl, url: boundUrl };
      }
      return { state: 'mismatch', url: boundUrl };
    }
  };
}

module.exports = { conversationUrl, isTemporaryConversation, createConversationGuard };
