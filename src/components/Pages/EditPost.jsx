import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import databaseService from "../../appwrite/DatabaseService";
import Container from "../Container";
import FormPost from '../PostForm/FormPost'

function EditPost() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      databaseService.getPost(slug).then((post) => {
        setPost(post);
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  return post ? (
    <div className="py-8">
      <Container>
        <FormPost post={post}/>
      </Container>
    </div>
  ) : null;
}

export default EditPost;
