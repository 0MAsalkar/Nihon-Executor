import Router from 'next/router'

const DisplayName = ({ username, user }) => {

    return (
        <p
            className='text-14-bold mr-1 cursor-pointer'
        >
            {username}
        </p>
    )
}

export default DisplayName
