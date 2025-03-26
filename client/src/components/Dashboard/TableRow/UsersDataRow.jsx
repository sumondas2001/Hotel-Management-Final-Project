import PropTypes from 'prop-types'
import UpdateUserModal from '../Modal/UpdateUserModal'
import { useState } from 'react'
import { useMutation } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import useAuth from '../../../hooks/useAuth';
const UserDataRow = ({ user, refetch }) => {
     const [isOpen, setIsOpen] = useState(false);
     const { user: loggedInUser } = useAuth();
     const axiosSecure = useAxiosSecure();

     const { mutateAsync } = useMutation({
          mutationFn: async (role) => {
               const { data } = await axiosSecure.patch(`/users/update/${user?.email}`, role)
               return data


          },
          onSuccess: (data) => {
               console.log(data);
               setIsOpen(false)
               refetch();
               toast.success('User Role Update Successfully!')
          }
     })

     const modalHandler = async (selected) => {
          if (loggedInUser?.email === user?.email) {
               toast.error('Action Not Allowed')

               return setIsOpen(false)
          }
          const role = {
               role: selected,
               status: 'Verified'
          }
          try {

               mutateAsync(role)
          }
          catch (error) {
               toast.error(error.massage)
          }
     }
     return (
          <tr>
               <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                    <p className='text-gray-900 whitespace-no-wrap'>{user?.email}</p>
               </td>
               <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                    <p className='text-gray-900 whitespace-no-wrap'>{user?.role}</p>
               </td>
               <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                    {user?.status ? (
                         <p
                              className={`${user.status === 'Verified' ? 'text-green-500' : 'text-yellow-500'
                                   } whitespace-no-wrap`}
                         >
                              {user.status}
                         </p>
                    ) : (
                         <p className='text-red-500 whitespace-no-wrap'>Unavailable</p>
                    )}
               </td>

               <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                    <button
                         // disabled={user?.role === 'admin'}
                         onClick={() => setIsOpen(true)}
                         className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight'>
                         <span
                              aria-hidden='true'
                              className='absolute inset-0 bg-green-200 opacity-50 rounded-full'
                         ></span>
                         <span className='relative'>Update Role</span>
                    </button>
                    {/* Update User Modal */}
                    <UpdateUserModal isOpen={isOpen} setIsOpen={setIsOpen} user={user} modalHandler={modalHandler} />
               </td>
          </tr>
     )
}

UserDataRow.propTypes = {
     user: PropTypes.object,
     refetch: PropTypes.func,
}

export default UserDataRow
