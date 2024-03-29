export const colors = {
    primary: "#FFCA0F",
    primaryLight: "#FCD754",
    primaryDark: '#463806',
    black: "#000000",
    white: "#ffffff",
    gray50: "#f6f6f6",
    gray100: "#ececec",
    gray200: "#dadada",
    gray300: "#c1c1c1",
    gray400: "#979797",
    gray500: "#6d6d6d",
    gray600: "#444444",
    red400: "#f83535",
    warning: "#FF5050",
    warningTrans: "#FF505033",
    like: "#FF002E",
  } as const;
  
  export type ColorKeys = keyof typeof colors;
  export type Color = (typeof colors)[ColorKeys];
  export const mapColors = <T>(cb: (color: Color) => T) =>
    Object.fromEntries(
      Object.entries(colors).map(([key, value]) => [key, cb(value)] as const),
    ) as Record<ColorKeys, T>;