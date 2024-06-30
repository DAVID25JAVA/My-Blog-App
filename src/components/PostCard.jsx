import React from "react";
import databaseService from "../appwrite/DatabaseService";
import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredImage }) {
  return (
    <>
      <Link to={`/post/${$id}`}>
      <div className='container bg-gray-100 rounded-xl p-4'>
      <div className='container justify-center mb-4 '>
        <img src={databaseService.getFilePreview(featuredImage)} alt={title}
            className="rounded-xl"
        />
        </div>
            <h2
            className='text-xl font-bold  '
            >{title}</h2>
        </div>
      </Link>
    </>
  );
}

export default PostCard;
