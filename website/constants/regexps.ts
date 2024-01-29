const regexps = {
  empty: /\s*\S+.*/,
  phone: /^\d{10,}$/,
  id: /^(\d{9}|\d{11})$/,
  email: /^\S+@\w+\.\w+$/,
  contact: /^(\d{10,}|\S+@\w+\.\w+)$/
};

export { regexps };
