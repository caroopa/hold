export enum Color {
  Light = '#FFFAF3',
  Dark = '#050000',
}

export function opositeColor(color: Color): Color {
  return color === Color.Light ? Color.Dark : Color.Light;
}
