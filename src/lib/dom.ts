export const $ = <T extends Element = Element>(selector: string, root: ParentNode = document) => {
  const el = root.querySelector<T>(selector);
  if (!el) throw new Error(`Missing element: ${selector}`);
  return el;
};
