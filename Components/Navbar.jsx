import React from 'react';

const NavBar = () => {
    return (
        <div className='flex py-3 flex-wrap justify-around items-center'>
            <h1 className='text-lg font-semibold'>Todo App</h1>
            <ul className='flex gap-[40px]'>
                <li>Home</li>
                <li>Products</li>
                <li>About</li>
                <li>Contact</li>
            </ul>
        </div>
    )
}

export default NavBar