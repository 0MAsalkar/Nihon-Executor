import Header from './Header'

const style = {
    wrapper: `container`,
    appContainer: `homepage-container flex justify-center`,
}

const Layout = ({ children, setCreatePostModalOpen }) => {
    return (
        <div className={style.wrapper}>
            <Header setCreatePostModalOpen={setCreatePostModalOpen} />
            <div className={style.appContainer}>{children}</div>
        </div>
    )
}

export default Layout