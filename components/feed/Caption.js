import DisplayName from '../common/DisplayName'

const style = {
    wrapper: `overflow-hidden mx-4 text-14-light inherit`,
    caption: `feed-item-text-description`,
}

const Caption = ({ data }) => {
    return (
        <div className={style.wrapper}>
            <DisplayName username={data.username} />
            <span className={style.caption}>{data.caption || ''}</span>
        </div>
    )
}

export default Caption
