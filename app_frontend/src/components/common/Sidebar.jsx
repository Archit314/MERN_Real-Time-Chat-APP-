import React, { useEffect, useState } from 'react'
import { useChatStore } from '../../store/useChatStore'
import toast from 'react-hot-toast'

export default function Sidebar() {

    const {getUsers} = useChatStore()
    const [users, SetUser] = useState([])

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                
                const getUsersData = await getUsers()
                console.log(`getUsers: `, getUsersData.data);

                if(getUsersData.status == 200){
                    SetUser(getUsersData.data)
                    toast.success(getUsersData.message)
                    return
                }
                toast.error(getUsersData.message)
                return
            } catch (error) {
                console.log(`Error in Sidebar -> fetchUsers: `, error);
                toast.error("Something went wrong")
                return
            }
        }

        fetchUsers()
    }, [])

    return (
        <div className='bg-base-300 w-1/4 p-4 text-primary flex flex-col'>
            <h1 className='mb-4 font-bold text-2xl'>Friends</h1>
            <div className="space-y-6 space-x-2 overflow-y-auto flex-1">
                {users && users.map((user, key) => (
                    <div key={key} className="bg-base-100 flex items-center space-x-3 p-2 rounded-lg hover:bg-primary hover:text-base-100 cursor-pointer">
                    <div className="avatar avatar-online">
                    <div className="w-12 rounded-full">
                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                    </div>
                    </div>
                    <span className="text-lg">{user.fullName}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}
