export default function MdxLayout({ children }: { children: React.ReactNode }) {
  // Create any shared layout or styles here
  return <div className="p-4 prose max-w-none">{children}</div>;
}
