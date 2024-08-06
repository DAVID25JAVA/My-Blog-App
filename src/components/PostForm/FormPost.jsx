import React, { useState, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import databaseService from "../../appwrite/DatabaseService";
import Button from "../Button";
import Input from "../Input";
import RTE from "../RTE";
import Select from "../Select";
import { FadeLoader } from 'react-spinners';

function FormPost({ post }) {
  const [loader, setLoader] = useState(false);
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.$id || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    setLoader(true);
    try {
      let file = null;
      if (data.image && data.image[0]) {
        file = await databaseService.fileUpload(data.image[0]);
        if (!file) {
          throw new Error("File upload failed");
        }
      }

      if (post) {
        if (file && post.featuredImage) {
          await databaseService.deleteFile(post.featuredImage);
        }

        const dbPost = await databaseService.updatePost(post.$id, {
          ...data,
          featuredImage: file ? file.$id : post.featuredImage,
        });

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      } else {
        if (file) {
          const fileId = file.$id;
          data.featuredImage = fileId;
          const dbPost = await databaseService.createPost({
            ...data,
            userId: userData.$id,
          });

          if (dbPost) {
            navigate(`/post/${dbPost.$id}`);
          }
        }
      }
    } catch (error) {
      console.error("Error in form submission:", error);
    } finally {
      setLoader(false);
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-col lg:flex-row flex-wrap">
      {loader && <div className="w-full flex justify-center mb-4"><FadeLoader color="#36d7b7" /></div>}
      {!loader && (
        <>
          <div className="lg:w-2/3 w-full px-2 mb-4 lg:mb-0">
            <Input
              label="Title :"
              placeholder="Title"
              className="mb-4"
              {...register("title", { required: true })}
            />
            <Input
              label="Slug :"
              placeholder="Slug"
              className="mb-4"
              {...register("slug", { required: true })}
              onInput={(e) => {
                setValue("slug", slugTransform(e.currentTarget.value), {
                  shouldValidate: true,
                });
              }}
            />
            <RTE
              label="Content :"
              name="content"
              control={control}
              defaultValue={getValues("content")}
            />
          </div>
          <div className="lg:w-1/3 w-full px-2">
            <Input
              label="Featured Image :"
              type="file"
              className="mb-4"
              accept="image/png, image/jpg, image/jpeg, image/gif"
              {...register("image", { required: !post })}
            />
            {post && (
              <div className="w-full mb-4">
                <img
                  src={databaseService.getFilePreview(post.featuredImage)}
                  alt={post.title}
                  className="rounded-lg w-full object-cover"
                />
              </div>
            )}
            <Select
              options={["active", "inactive"]}
              label="Status"
              className="mb-4"
              {...register("status", { required: true })}
            />
            <Button
              type="submit"
              bgColor={post ? "bg-green-500" : undefined}
              className="w-full"
            >
              {post ? "Update" : "Submit"}
            </Button>
          </div>
        </>
      )}
    </form>
  );
}

export default FormPost;
