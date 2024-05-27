"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../../../../../firebase";
import { collection, addDoc, doc, serverTimestamp } from "firebase/firestore";
import { Chonburi } from "next/font/google";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const JodiatEditor = dynamic(() => import("jodit-react"), { ssr: false });

export default function UpdateProfile() {
  const user = useUser();
  const router = useRouter();
  const [content, setContent] = useState("");
  const [blogTitle, setBlogTitle] = useState("");
  const [featuredImage, setFeaturedImage] = useState<null | any>(null);
  const [imageURL, setImageURL] = useState<null | any>(null);
  const [uploading, setUploading] = useState(false);
  const fullName = user.user?.fullName;
  const userEmail = user.user?.emailAddresses[0].emailAddress;
  const userPhoneNumber = user.user?.phoneNumbers[0].phoneNumber;
  const currentUserId = user.user?.id;
  const userProfileImage = user.user?.imageUrl;

  const userInfo = {
    fullName: fullName,
    userEmail: userEmail,
    userPhoneNumber: userPhoneNumber,
    userId: currentUserId,
    profileImage: userProfileImage,
  };

  const handleImageChange = (e: any) => {
    if (e.target.files && e.target.files[0]) {
      setFeaturedImage(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!featuredImage) {
      alert("Please choose a featured image");
    } else {
      setUploading(true);
      const storageRef = ref(storage, `blogImages/${featuredImage.name}`);
      try {
        await uploadBytes(storageRef, featuredImage);
        const downloadURL = await getDownloadURL(storageRef);
        setImageURL(downloadURL);
        await publishBlog(downloadURL);
        setUploading(false);
      } catch (error) {
        console.log(error);
        setUploading(false);
      } // steps to uplaod
      //1. Image Ref 2.get uploadBytes 3.getDownloadURL
    }
  };

  const publishBlog = async (image: any) => {
    if (blogTitle == "" || content == "" || featuredImage == null) {
      alert("Please fill all the information related to blogs");
    } else {
      const blogPost = {
        title: blogTitle,
        content: content,
        featuredImage: image,
        userinfo: userInfo,
        publishedAt: serverTimestamp(),
      };
      try {
        const docRef = await addDoc(collection(db, "posts"), blogPost);
        alert("Blog Added");
        router.push("/");
      } catch (error) {
        console.log("Error uploading blog", error);
      }
    }
  };

  return (
    <div className="bg-black text-white">
      {user.isLoaded ? (
        <div className="max-w-4xl m-auto py-10 min-h-screen h-full">
          <h1 className="text-4xl">
            Blog --{" "}
            <span className="text-sm">Share your thoughts with others</span>
          </h1>

          <div className="m-auto mt-10 shadow-sm px-4 bg-white py-8 rounded-md space-y-6">
            <h6 className="text-black">Choose Blog Featured Image</h6>
            <input
              className="p-3 rounded-lg w-full mr-2 md:w-[48%] border text-black"
              placeholder="Choose Featured Image"
              type="file"
              onChange={handleImageChange}
              required
            />
            <input
              className="p-3 rounded-lg w-full border text-black"
              placeholder="Blog Title"
              onChange={(e) => setBlogTitle(e.target.value)}
              required
            />
            <div className="text-black">
              <JodiatEditor
                value="Your thoughts and brief introduction"
                onChange={(newContent) => setContent(newContent)}
              />
            </div>

            <Button
              className="bg-red-600"
              onClick={handleUpload}
              disabled={uploading}
            >
              {uploading ? "Uploading..." : "Publish Blog"}
            </Button>
          </div>
        </div>
      ) : (
        <div className="min-h-screen h-full flex items-center justify-center">
          <div role="status">
            <svg
              aria-hidden="true"
              className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-red-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}
    </div>
  );
}
