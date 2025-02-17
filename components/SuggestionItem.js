import Image from 'next/image'
import DisplayName from './common/DisplayName'

const style = {
    wrapper: `suggestion-item py-2 h-auto flex items-center`,
    imageContainer: `h-[2rem] w-[2rem] relative rounded-full overflow-hidden cursor-pointer border-white border-2`,
    image: `object-cover`,
    userInfoContainer: `suggestion-user-info ml-3 flex flex-col`,
    usernameContainer: `text-14-bold cursor-pointer`,
    followedByText: `text-12-light`,
    followButton: `follow-button text-12-bold flex items-center ml-auto text-blue cursor-pointer`,
}

const SuggestionItem = ({ data }) => {
    return (
        <div className={style.wrapper}>
            <div className={style.imageContainer}>
                <Image
                    src={data.image}
                    layout='fill'
                    alt={data.username}
                    className={style.image}
                />
            </div>
            <div className={style.userInfoContainer}>
                <DisplayName
                    username={data.username}
                    className={style.usernameContainer}
                />
                <span className={style.followedByText}>{data?.text}</span>
            </div>
            <div className={style.followButton}>Follow</div>
        </div>
    )
}

export default SuggestionItem
