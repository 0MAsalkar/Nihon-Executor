import Link from 'next/link'
import SuggestionItem from './SuggestionItem'

const style = {
    wrapper: `flex flex-col`,
    titleContainer: `suggestions-header flex mt-[.8rem]`,
    title: `text-14-bold mr-auto text-[#8e8e8e]`,
}

const RightBarSuggestions = ({ data }) => {
    return (
        <div className={style.wrapper}>
            <div className={style.titleContainer}>
                <span className={style.title}>Suggestions For You</span>
                <Link href='#' className='text-12-bold'>
                    See All
                </Link>
            </div>
            <div
                className='right-bar-suggestions'
                style={{ paddingBottom: 8, paddingTop: 8 }}
            >
                {data.map(item => {
                    return <SuggestionItem data={item} key={item.username} />
                })}
            </div>
        </div>
    )
}

export default RightBarSuggestions
