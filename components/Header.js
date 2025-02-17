import Image from 'next/image'
import { useRouter } from 'next/router'
import Modal from 'react-modal'



import { GrHomeRounded } from 'react-icons/gr'
import { AiOutlineCloudUpload } from 'react-icons/ai'
import { IoPaperPlaneOutline } from 'react-icons/io5'
import { HiPlus } from 'react-icons/hi'


// Solana Imports
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useGlobalState } from '../hooks'

Modal.setAppElement('#__next')

// const uploader = new Uploader({
//     apiKey: 'free',
// })

const style = {
    wrapper: `navigation fixed z-20 top-0`,
    headerContainer: `header-container `,
    logoContainer: `h-[1.8rem] w-[6.4rem] relative mt-[.6rem]`,
    image: `object-contain`,
    headerMain: `header-icons flex ml-auto items-center justify-around`,
    headerIcon: `mr-[.8rem] cursor-pointer`,
    button: `border rounded-lg p-4 text-xs font-medium`,
}

const Header = ({ setCreatePostModalOpen }) => {
    const router = useRouter()

    //SOLANA STUFF
    const {
        isConnected,
        wallet,
        hasUserAccount,
        posts,
        createUser,
        createPost,
        updatePost,
    } = useGlobalState();
    return (
        <nav className={style.wrapper}>
            <div className={style.headerContainer}>
                <div className={style.logoContainer}>
                    <Image src={"/logo.png"} className={style.image} layout='fill' />
                </div>

                <div className={style.headerMain}>
                    <GrHomeRounded className={style.headerIcon} size={20} />
                    <HiPlus className={style.headerIcon} size={22} onClick={() => setCreatePostModalOpen(true)} />

                    {!hasUserAccount && isConnected ? (
                        <button className={style.button} onClick={createUser}>Create user</button>
                    ) : (
                        <></>
                    )}
                    {/* Phantom Connect Button Goes Here */}
                    <WalletMultiButton />
                </div>
            </div>
        </nav>
    )
}

export default Header
