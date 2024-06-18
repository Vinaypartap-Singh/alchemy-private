import { Slider } from "@/components/ui/slider";
import Image from "next/image";

export default function ProjectInfo() {
  const howToGet = [
    {
      title: "Distrubution",
    },
    {
      title: "Marketing Services",
    },
    {
      title: "Community Events",
    },
    {
      title: "48 build & market change",
    },
    {
      title: "Youth Entrepreneurship program",
    },
  ];

  return (
    <section className="text-white body-font">
      <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col">
        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
          <Image
            className="object-cover object-center rounded w-full h-full"
            alt="Project Image"
            src={"/placeholder.png"}
            width={800}
            height={800}
          />
        </div>
        <div className="p-10 px-16 lg:flex-grow md:w-1/2 lg:pr-24 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          <h1 className="dark:text-white title-font sm:text-4xl text-3xl mb-4 font-medium text-white">
            Project: Alchemy State
          </h1>
          <p className="leading-relaxed">
            <span className="font-bold">Mission:</span> Create a conscious
            thriving & entrepreneurial collective of new-gen builders, artits,
            creators.
          </p>
          <div>
            <p className="my-6">
              <span className="font-bold"> Milestone #1</span> - Make 2500 SOL
              through a collective project
            </p>
            <Slider
              className="bg-white text-yellow-500"
              defaultValue={[33]}
              max={100}
              step={1}
            />
          </div>

          <div className="mt-6 space-y-4">
            <p>
              <span className="font-bold"> Reward: </span> - Get land for
              alchemy community
            </p>
            <p>2500 SOL = 518775$ CAD</p>
            <p>50% for the community</p>
          </div>

          <div>
            <h3 className="font-bold text-2xl mt-4">How?</h3>
            <p className="mt-2 font-bold">Service/Products are collective</p>

            <ul>
              {howToGet.map((data, index) => {
                return (
                  <li className="list-decimal mt-2" key={index}>
                    {data.title}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
