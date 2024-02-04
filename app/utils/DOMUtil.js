/* Convert toLowerCase() and supp all accents */
export function LowerCase(str) {
  return str.toLowerCase();
}
export function NormalizeString(str) {
  return LowerCase(str)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
};

/* DOM setAttribute */
export function SetAtt(parent = document, type, params) {
  return parent.setAttribute(type, params);
}

/* Convert first letter toUpperCase() */
export function UpperFirstCase(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
