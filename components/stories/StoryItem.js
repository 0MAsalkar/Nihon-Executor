import Image from 'next/image'
import DisplayName from '../common/DisplayName'
import { useGlobalState } from '../../hooks'


const style = {
    wrapper: `story-item w-20 flex-shrink-0 flex flex-col justify-center items-center cursor-pointer`,
    storyContainer: `story-photo-container `,
    imageContainer: `h-[3.6rem] w-[3.6rem] relative rounded-full overflow-hidden cursor-pointer border-white border-2`,
    image: `object-cover`,
    username: `story-username text-black text-12-light mt-1`,
}

const StoryItem = ({ data }) => {
    const {
        wallet,
    } = useGlobalState();
    return (
        <div className={style.wrapper}>
            <div className={style.storyContainer}>
                <div className={style.imageContainer}>
                    <Image
                        src={data?.image}
                        layout='fill'
                        className={style.image}
                        alt={data?.username}
                    />
                </div>
            </div>
            <DisplayName username={data?.username} className={style.username} user={wallet?.publicKey} />
        </div>
    )
}

export default StoryItem
