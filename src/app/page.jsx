import Hero from "@/components/Custom/Hero";
import Image from "next/image";
import BlogCard from "./(blogs)/discover/_components/blogCard";

export default function Home() {
    return (
        <div className="bg-black">
          <Hero />
          <div className="max-w-6xl m-auto">
            <BlogCard />
          </div>
        </div>
    );
}
