import Header from "@/components/Custom/Header";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import BlogCard from "../_components/blogCard";

export default function SingleBlogInfo() {
  return (
    <div className="bg-black text-white">
      <Header />

      <div className="max-w-4xl m-auto mt-16">
        <Image
          className="w-full h-full"
          alt="Blog Featured Image"
          src={"/blogDummy.png"}
          width={1000}
          height={1000}
        />

        <h1 className="text-3xl mt-6 leading-10">
          Celebrating Superchain Creativity: Announcing the Winners of "We ❤️The
          Art"
        </h1>

        <div className="mt-6 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Image
                src={"/profile2.png"}
                alt="User Profile Image"
                height={250}
                width={250}
                className="h-10 w-10 rounded-full"
              />
              <h5 className="font-medium">
                Vinaypartap Singh{" "}
                <span className="text-[#5b5b5b] bg-[#131313] p-2 rounded-lg ml-2">
                  May 25, 2024
                </span>
              </h5>
            </div>
            <div>
              <Button className="bg-[#431E1C] text-red-700 hover:bg-[#301412]">
                Author Profile
              </Button>
            </div>
          </div>
        </div>
        {/* blog Content */}

        <div className="mt-6 p-4 flex flex-col gap-6 text-[#959595] text-xl">
          <h1>
            Amidst a whirlwind of creativity, We ❤️The Art has reached its
            conclusion, after seeing 7,000+ submissions seize this OPportunity
            to share their art - we are thrilled to unveil the winners.
          </h1>
          <p>
            The contest witnessed an influx of brilliant onchain creators from
            around the globe, making it one of the largest globally-accessible
            art contests in history. It galvanized the superpower of blockchains
            as a global force, proving that onchain truly is for everyone.
          </p>
          <p>
            We ❤️The Art started as an idea on how the Collective can band
            companies, judges, and artists alike to celebrate with one another.
            Like with the Superchain, we asked: how big can we go if we all go
            together? The initiative led to many first time creators on the
            Superchain where we will continue to prove that this can be a home
            for creators, a place where new people can onboard with low fees and
            welcoming communities, and of course, we will continue to show that
            onchain really is the next online.
          </p>
          <p>
            This contest had limited amounts of winners, but this is just the
            start of our creative journey together, a journey that you can help
            dictate. Optimism is not here to just change lives, it is here to
            upgrade the system, and the Collective will do so by working hand in
            hand with creators who are determined to do so.
          </p>
          <h2>Here is the full winners list.</h2>
          <p>
            As we celebrate the winners, we want to extend our gratitude to
            every creator who participated, shared their genius, and contributed
            to the vibrant tapestry of We ❤️The Art. Your passion, creativity
            and driving force is what drove the success of the contest.
          </p>
          <p>
            Massive shoutout to our amazing Superchain partners Base and Zora,
            co-marketing partners, judges and the community supporting the
            contest.
          </p>
          <p>
            Stay tuned for more highlights, spotlights on the winners, and
            upcoming campaigns. We ❤️The Art may be over, onchain creativity
            will continue to grow and we can’t wait to see what you create!
          </p>
          <h2>Next steps for winners</h2>
          <p>
            Winners will receive an email from{" "}
            <a href="mailto:wlta@optimism.io">wlta@optimism.io</a> with
            instructions about their claiming OP prize. If you want to share
            your WLTA result, check out this template to create your own custom
            design!
          </p>
          <h2>Next steps for loving the art</h2>
          <p>
            We believe that artists have been told what to do for far too long,
            the Optimism Collective seeks to listen. We encourage people to
            explore Optimism Governance and help shape where the Collective goes
            in the realm of art next.
          </p>
          <h2>Participation in Governance</h2>
          <p>
            Good news! If you’ve received OP, you have the opportunity to have a
            voice in the most robust governance system in the ecosystem, and
            take a first step in shaping how the Collective embraces artists. We
            hope you use this as a starter in building the foundation for your
            journey into governance. You can learn more about the Collective’s
            Vision and how to begin participating in governance by delegating
            your OP.
          </p>
          <p className="highlight">
            And, as always,
            <br />
            Stay Optimistic! 🔴✨
          </p>
        </div>
      </div>

      <div className="bg-[#131313] p-6 mt-10">
        <div className="max-w-6xl m-auto">
          <div className="flex justify-between items-center px-6">
            <h4 className="text-[#5c5c5c] text-xl">Related Posts</h4>
            <Button variant={"link"} className="text-red-600">
              View All
            </Button>
          </div>

          <BlogCard />
        </div>
      </div>
    </div>
  );
}
