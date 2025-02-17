const style = {
    wrapper: `feed-photo-container flex relative items-center`,
    imageContainer: `feed-photo-images-container w-full relative transition ease-linear duration-200 flex-1 flex h-[500px] w-[500px] m-auto overflow-hidden relative`,
    image: `object-contain`,
}

const PostImage = ({ imgUrl }) => {
    return (
        <div className={style.wrapper}>
            <div className={style.imageContainer}>
                <img
                    className={style.image}
                    src={imgUrl}
                    alt="Post Image"
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
            </div>
        </div>
    )
}

export default PostImage
