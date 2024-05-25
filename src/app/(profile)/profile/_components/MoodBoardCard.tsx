import Image from "next/image";

export default function MoodboardCard({ data }: any) {
  const moodboardImages = data.moodboardImages;
  return (
    <div className="w-full relative">
      <div className="flex h-1/2">
        <div className="w-1/2 p-2">
          <Image
            width={400}
            height={400}
            className="h-[200px] max-w-full object-cover rounded-lg"
            src={moodboardImages[0]}
            alt="Moodboard Image"
          />
        </div>
        <div className="w-1/2 p-2">
          <Image
            width={400}
            height={400}
            className="h-[200px] max-w-full object-cover rounded-lg"
            src={moodboardImages[1]}
            alt="Moodboard Image"
          />
        </div>
      </div>

      <div className="flex h-1/2">
        <div className="w-1/2 p-2">
          <Image
            width={400}
            height={400}
            className="h-[200px] max-w-full object-cover rounded-lg"
            src={moodboardImages[2]}
            alt="Moodboard Image"
          />
        </div>
        <div className="w-1/2 p-2">
          <Image
            width={400}
            height={400}
            className="h-[200px] max-w-full object-cover rounded-lg"
            src={moodboardImages[3]}
            alt="Moodboard Image"
          />
        </div>
      </div>
      <div className="w-1/2 p-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Image
          width={400}
          height={400}
          className="hh-[200px] max-w-full object-cover rounded-lg"
          src={moodboardImages[4]}
          alt="Moodboard Image"
        />
      </div>
    </div>
  );
}
