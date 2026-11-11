declare module "virtual:previews" {
  const previews: Record<
    string,
    () => Promise<{ default: import("react").ComponentType }>
  >;
  export default previews;
}
