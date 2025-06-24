export const kodeUnikEmai = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(5, 2);
};
