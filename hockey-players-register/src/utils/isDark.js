export function isDark(color) {
  if (!color) return false;
  const hex = color.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // luminance (perceptual brightness)
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness < 128; // pod 128 je tmavá
}
