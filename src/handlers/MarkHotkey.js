import onKeyDown from './onKeyDown';

export default MarkHotkey = (options) => {
  const { type, key } = options;
  return {
    onKeyDown(event, change) {
      if (!event.ctrlKey || event.key != key) return;
      event.preventDefault();
      change.toggleMark(type)
      return true
    },
  };
}
