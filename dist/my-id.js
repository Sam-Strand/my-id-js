const e = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", r = e + "0123456789", s = (t) => {
  const n = new Uint32Array(1);
  return crypto.getRandomValues(n), t[n[0] % t.length];
}, u = () => s(e) + Array.from({ length: 21 }, () => s(r)).join(""), a = (t) => {
  if (!/^[a-zA-Z][a-zA-Z0-9]{21}$/.test(t))
    throw new Error(`Не валидный id: ${t}`);
  return t;
}, h = async (t) => {
  const c = new TextEncoder().encode(t), i = await crypto.subtle.digest("SHA-256", c), o = new Uint8Array(i), d = e[o[0] % e.length], g = Array.from({ length: 21 }, (y, l) => r[o[l + 1] % r.length]).join("");
  return a(d + g);
};
function f(t) {
  return arguments.length === 0 ? u() : a(t);
}
f.derive = h;
export {
  f as MyID,
  f as default
};
