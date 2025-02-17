import Border from '../common/Border'
import StoryItem from './StoryItem'

const style = {
    wrapper: `stories-container sm:full-width`,
    container: `stories-feed overflow-y-hidden py-4 px-2 items-center stories-feed-floating flex relative transition ease-linear duration-300`,
}

const Stories = ({ stories }) => {
    return (
        <Border className={style.wrapper} border>
            <div className={style.container}>
                {stories &&
                    stories.map(item => <StoryItem data={item} key={item.username} />)}
            </div>
        </Border>
    )
}

export default Stories
