import Header from "@/components/Custom/Header";
import BlogCard from "./_components/blogCard";

export default function Discover() {
  return (
    <div className="bg-black text-white">
      <Header />

      <div className="py-12">
        <h1 className="text-4xl text-center">Alchemy Community Posts</h1>
      </div>

      <div className="max-w-6xl m-auto">
        <BlogCard />
      </div>
    </div>
  );
}
