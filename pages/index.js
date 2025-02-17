import { data } from '../static/data'
import Layout from "../components/Layout";
import Stories from '../components/stories/Stories';
import HomeRightBar from '../components/HomeRightBar';
import FeedItem from '../components/feed/Item';
import { useGlobalState } from "../hooks";
import { useState } from 'react';
import { Toaster } from 'react-hot-toast';

import EditPostModal from '../components/modals/EditPostModal';
import CreatePostModal from '../components/modals/CreatePostModal';

export default function Home() {
  // States to grab the post and open modals
  const [editPostModalOpen, setEditPostModalOpen] = useState(false)
  const [createPostModalOpen, setCreatePostModalOpen] = useState(false)
  const [currentEditPostID, setCurrentEditPostID] = useState(null)

  // Function to target which post is being edited
  const toggleEditPostModal = (value, postId, owner) => {
    setCurrentEditPostID(postId)


    setEditPostModalOpen(value)
  }

  //Static Data
  // const staticPosts = [
  //   {
  //     owner: 11111111111,
  //     id: 0,
  //     likes: 0,
  //     title: "Merry Christmas 🎄",
  //     image: "https://images.unsplash.com/photo-1605744435343-bd38c8e97892?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
  //   },
  //   {
  //     owner: "Ac1nbnsdj1",
  //     id: 0,
  //     likes: 0,
  //     title: "Another day!",
  //     image: "https://images.unsplash.com/photo-1482575832494-771f74bf6857?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
  //   },
  //   {
  //     owner: "rafeh.qazi",
  //     id: 0,
  //     likes: 0,
  //     title: "Can't wait to show you the new videos I've been planning! 💡",
  //     image: "https://miro.medium.com/max/720/1*JpmEinPoAm4snR5fFa_dkQ.jpeg"
  //   },
  // ]

  const style = {
    container: `homepage-feed lg:mr-8 flex flex-col`,
  }

  //SOLANA STUFF
  const {
    wallet,
    posts,
    createPost,
    updatePost,
  } = useGlobalState();
  console.log(posts)

  return (
    <Layout
      setCreatePostModalOpen={setCreatePostModalOpen}
    >
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <div className={style.container}>
        <Stories stories={data.stories} />

        <>
          {/* Render posts */}
          {posts
            ? posts.map((post, i) => (
              <FeedItem
                data={post}
                key={i}
                walletKey={wallet?.publicKey}
                setEditPostModalOpen={setEditPostModalOpen}
                toggleEditPostModal={toggleEditPostModal}

              />
            ))
            : "Loading..."}
        </>
        <CreatePostModal createPost={createPost} createPostModalOpen={createPostModalOpen} setCreatePostModalOpen={setCreatePostModalOpen} />
        <EditPostModal updatePost={updatePost} editPostModalOpen={editPostModalOpen} setEditPostModalOpen={setEditPostModalOpen} currentEditPostID={currentEditPostID} />
      </div>
      <HomeRightBar data={data.suggestions} />
    </Layout>
  );
}
