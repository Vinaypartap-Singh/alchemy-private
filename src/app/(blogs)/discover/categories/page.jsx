import Header from "@/components/Custom/Header";
import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";

export default function Categories() {
  const blogsCategories = [
    {
      title: "Technology",
    },
    {
      title: "Technology",
    },
    {
      title: "Technology",
    },
    {
      title: "Technology",
    },
    {
      title: "Technology",
    },
    {
      title: "Technology",
    },
    {
      title: "Technology",
    },
  ];
  return (
    <div className="bg-black text-white">
      <Header />
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">
            {blogsCategories.map((data, index) => {
              return (
                <div className="lg:w-1/4 md:w-1/2 p-4 w-full" key={index}>
                  <a className="block relative h-48 rounded overflow-hidden">
                    <img
                      alt="ecommerce"
                      className="object-cover object-center w-full h-full block"
                      src="https://dummyimage.com/420x260"
                    />
                  </a>
                  <div className="mt-4">
                    <h2 className="title-font text-white text-lg font-medium">
                      The Catalyzer
                    </h2>
                    <Button variant={"link"} className="text-red-500 p-0">
                      View Now <MoveRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
