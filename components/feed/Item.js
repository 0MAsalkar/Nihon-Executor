import { useEffect, useState } from 'react'
import Border from '../common/Border'
import PostHeader from './PostHeader'
import ActionButtons from './ActionButtons'
import Caption from './Caption'
import PostImage from './PostImage'
import { truncate } from '../../utils/truncate'



const style = {
    wrapper: `feed-item-container flex flex-col`,
    buttonsContainer: `feed-item-buttons-container w-full h-10 pl-2 pr-2 mt-2 flex items-center`,
    likesContainer: `feed-item-text text-14-bold mr-1 ml-4`,
}

const FeedItem = ({ data, walletKey, setEditPostModalOpen, toggleEditPostModal, setCreatePostModalOpen }) => {
    const [randomLikeNumber, setRandomLikeNumber] = useState(0)

    //Get random number for static data
    useEffect(() => {
        setRandomLikeNumber(Math.floor(Math.random() * 100))
    }, [])

    return (
        <Border className={style.wrapper}>
            <PostHeader username={data.owner.toString()} owner={data.owner} postId={data.id} />
            <PostImage imgUrl={data.image} alt="post" />

            <ActionButtons
                id={data.id.toString()}
                className={style.buttonsContainer}
                owner={data.owner}
                postId={data.id}
                walletKey={walletKey}
                setEditPostModalOpen={setEditPostModalOpen}
                toggleEditPostModal={toggleEditPostModal}
                setCreatePostModalOpen={setCreatePostModalOpen}
            />

            <a className={style.likesContainer}>{data.likes.toString() != 0 ? data.likes.toString() : randomLikeNumber} likes</a>

            <Caption
                data={{
                    username: truncate(data.owner.toString()),
                    caption: data.title,
                }}
            />
        </Border>
    )
}

export default FeedItem
