import { useEffect, useState } from "react";
import databaseService from "../../appwrite/DatabaseService";
import Container from '../Container'
import PostCard from '../PostCard'

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
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default AllPost;
