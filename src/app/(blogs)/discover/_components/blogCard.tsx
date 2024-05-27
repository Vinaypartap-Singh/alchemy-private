"use client";

import { collection, getDocs } from "firebase/firestore";
import { ArrowRight, Eye, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { db } from "../../../../../firebase";

export default function BlogCard() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "posts"));
        const blogsList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBlogs(blogsList);
      } catch (error) {
        console.log("Error fetching blogs", error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <section className="text-gray-400 body-font">
      <div className="container py-6 mx-auto">
        <div className="flex flex-wrap -m-4">
          {blogs?.map((blog, index) => (
            <div className="p-4 w-full md:w-1/2 lg:w-1/3" key={index}>
              <div className="h-full border-2 border-gray-800 rounded-lg overflow-hidden">
                <Image
                  className="lg:h-48 md:h-36 w-full object-cover object-center"
                  src={blog?.featuredImage || "/blogDummy.png"}
                  alt="blog"
                  height={400}
                  width={400}
                />
                <div className="p-6">
                  <h2 className="tracking-widest text-xs title-font font-medium text-gray-500 mb-1">
                    CATEGORY
                  </h2>
                  <h1 className="title-font text-lg font-medium text-white mb-3">
                    {blog?.title}
                  </h1>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: blog?.content.substring(0, 100),
                    }}
                  ></p>
                  <div className="flex items-center flex-wrap ">
                    <Link
                      href={`/discover/${blog?.id}`}
                      className="text-red-400 inline-flex items-center md:mb-2 lg:mb-0"
                    >
                      Learn More
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                    <span className="text-gray-500 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-800">
                      <Eye className="w-4 h-4 mr-2" />
                      1.2K
                    </span>
                    <span className="text-gray-500 inline-flex items-center leading-none text-sm">
                      <MessageCircle className="w-4 h-4 mr-2" />6
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
