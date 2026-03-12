const n = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", r = n + "0123456789", e = (t) => t[Math.floor(Math.random() * t.length)], o = () => e(n) + Array.from({ length: 21 }, () => e(r)).join(""), a = (t) => {
  if (!/^[a-zA-Z][a-zA-Z0-9]{21}$/.test(t))
    throw new Error(`Не валидный id: ${t}`);
  return t;
};
function s(t) {
  return arguments.length === 0 ? o() : a(t);
}
export {
  s as MyID,
  s as default
};
