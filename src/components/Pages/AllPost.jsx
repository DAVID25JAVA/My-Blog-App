import { useEffect, useState } from "react";
import databaseService from "../../appwrite/DatabaseService";
import Container from "../Container";
import PostCard from "../PostCard";

function AllPost() {
  const [posts, setPost] = useState([]);
  useEffect(() => {
    databaseService.getPost([]).then((post) => {
      if (post) {
        setPost(post.documents);
      }
    });
  }, []);

  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap -mx-2">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default AllPost;
