import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Allows customizing built-in components, e.g. to add styling.
    // h1: ({ children }) => (
    //   <h1 className="font-bold text-2xl mb-2">{children}</h1>
    // ),

    // h2: ({ children }) => (
    //   <h2 className="font-bold text-xl mb-2">{children}</h2>
    // ),

    // h3: ({ children }) => (
    //   <h3 className="font-bold text-lg mb-2">{children}</h3>
    // ),

    // p: ({ children }) => <p className="mb-2">{children}</p>,

    ...components,
  };
}
