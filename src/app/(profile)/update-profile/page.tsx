"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import dynamic from "next/dynamic";
import { db, storage } from "../../../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const JodiatEditor = dynamic(() => import("jodit-react"), { ssr: false });

export default function UpdateProfile() {
  const user = useUser();
  const router = useRouter();
  const fullName = user.user?.fullName;
  const userEmail = user.user?.emailAddresses[0].emailAddress;
  const userPhoneNumber = user.user?.phoneNumbers[0].phoneNumber;
  const currentUserId = user.user?.id;
  const [content, setContent] = useState("");
  const [shortIntroduction, setShortIntroduction] = useState("");
  const [uploading, setUploading] = useState(false);
  const [socialMedia, setSocialMediaLinks] = useState({
    facebook: "",
    instagram: "",
    twitter: "",
    github: "",
  });
  const [moodboardImages, setMoodboardImages] = useState({
    image1: null,
    image2: null,
    image3: null,
    image4: null,
    image5: null,
  });

  const handleSocialMediaChange = (e: any, platform: any) => {
    setSocialMediaLinks((prev) => ({
      ...prev,
      [platform]: e.target.value,
    }));
  };

  const handleImageChange = (e: any, imageKey: any) => {
    setMoodboardImages((prev) => ({
      ...prev,
      [imageKey]: e.target.files[0],
    }));
  };

  const uploadImages = async () => {
    const imageUploadPromises = Object.keys(moodboardImages).map(
      async (key) => {
        const imageFile = moodboardImages[key];
        if (imageFile) {
          const imageRef = ref(storage, `images/${imageFile.name}`);
          await uploadBytes(imageRef, imageFile);
          const downloadURL = await getDownloadURL(imageRef);
          return downloadURL;
        }
        return null;
      },
    );

    return Promise.all(imageUploadPromises);
  };

  const handleSubmit = async () => {
    setUploading(true);
    try {
      const imageUrls = await uploadImages();
      const userId = currentUserId; // Replace with actual user ID
      await setDoc(doc(db, "profiles", userId), {
        shortIntroduction,
        content,
        socialMedia,
        moodboardImages: imageUrls.filter((url) => url !== null),
        userId: userId,
        fullName: fullName,
        userEmail: userEmail,
        userPhoneNumber: userPhoneNumber,
        updatedTime: serverTimestamp(),
      });
    } catch (error) {
      console.error("Error uploading images: ", error);
    } finally {
      setUploading(false);
      alert("Profile Updated");
      router.push("/profile");
    }
  };

  return (
    <div className="bg-black text-white">
      <div className="max-w-4xl m-auto py-10 min-h-screen h-full">
        <h1 className="text-4xl">
          Profile --
          <span className="text-sm">Finish Setting-up your profile</span>
        </h1>

        <div className="m-auto mt-10 shadow-sm px-4 bg-white py-8 rounded-md space-y-6">
          <input
            onChange={(e) => setShortIntroduction(e.target.value)}
            className="p-3 rounded-lg w-full border text-black"
            placeholder="A short Introduction"
            value={shortIntroduction}
            required
          />
          <div>
            <JodiatEditor
              value="Your thoughts and brief introduction"
              onChange={(newContent) => setContent(newContent)}
            />
          </div>

          <h6>Social Media URL&apos;s</h6>

          <input
            className="p-3 rounded-lg w-full md:w-[48%] mr-2 border text-black"
            placeholder="Facebook"
            type="url"
            value={socialMedia.facebook}
            onChange={(e) => handleSocialMediaChange(e, "facebook")}
          />

          <input
            className="p-3 rounded-lg w-full md:w-[48%] border text-black"
            placeholder="Instagram"
            type="url"
            value={socialMedia.instagram}
            onChange={(e) => handleSocialMediaChange(e, "instagram")}
          />

          <input
            className="p-3 rounded-lg w-full mr-2 md:w-[48%] border text-black"
            placeholder="Github"
            type="url"
            value={socialMedia.github}
            onChange={(e) => handleSocialMediaChange(e, "github")}
          />

          <input
            className="p-3 rounded-lg w-full md:w-[48%] border text-black"
            placeholder="Twitter"
            type="url"
            value={socialMedia.twitter}
            onChange={(e) => handleSocialMediaChange(e, "twitter")}
          />

          <div className="space-y-4">
            <h6>Any 5 Moodboard Images</h6>

            {["image1", "image2", "image3", "image4", "image5"].map(
              (imageKey, index) => (
                <input
                  key={index}
                  type="file"
                  className="p-3 rounded-lg mr-2 w-full md:w-[48%] border text-black"
                  placeholder="Moodboard Image"
                  accept="image/png, image/gif, image/jpeg"
                  onChange={(e) => handleImageChange(e, imageKey)}
                  required
                />
              ),
            )}
          </div>

          <Button
            className="bg-red-600"
            onClick={handleSubmit}
            disabled={uploading}
          >
            {uploading ? "Uploading..." : "Upload Now"}
          </Button>
        </div>
      </div>
    </div>
  );
}
