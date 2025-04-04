import { Helmet } from 'react-helmet-async'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import { useMutation, useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import RoomDataRow from '../../../components/Dashboard/TableRow/RoomDataRow';
import toast from 'react-hot-toast';

const MyListings = () => {
     const { user } = useAuth();
     const axiosSecure = useAxiosSecure();
     const { data: rooms = [], isLoading: loading, refetch } = useQuery({
          queryKey: ['my-listings', user?.email],
          queryFn: async () => {
               const { data } = await axiosSecure.get(`/my-listings/${user?.email}`)
               // console.log(data);
               return data
          }
     });
     // delete
     const { mutateAsync } = useMutation({
          mutationFn: async (id) => {
               const { data } = axiosSecure.delete(`/room-delete/${id}`)
               return data
          },
          onSuccess: () => {
               refetch()

               toast.success('Room is delete successfully')
          }
     })
     // room delete
     const handelDelete = async (id) => {
          console.log(id);
          try {
               await mutateAsync(id)

          }
          catch (error) {
               console.log(error);
          }
     }

     { if (loading) return < LoadingSpinner /> }
     console.log(rooms);
     return (
          <>
               <Helmet>
                    <title>My Listings</title>
               </Helmet>

               <div className='container mx-auto px-4 sm:px-8'>
                    <div className='py-8'>
                         <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
                              <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
                                   <table className='min-w-full leading-normal'>
                                        <thead>
                                             <tr>
                                                  <th
                                                       scope='col'
                                                       className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                                                  >
                                                       Title
                                                  </th>
                                                  <th
                                                       scope='col'
                                                       className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                                                  >
                                                       Location
                                                  </th>
                                                  <th
                                                       scope='col'
                                                       className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                                                  >
                                                       Price
                                                  </th>
                                                  <th
                                                       scope='col'
                                                       className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                                                  >
                                                       From
                                                  </th>
                                                  <th
                                                       scope='col'
                                                       className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                                                  >
                                                       To
                                                  </th>
                                                  <th
                                                       scope='col'
                                                       className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                                                  >
                                                       Delete
                                                  </th>
                                                  <th
                                                       scope='col'
                                                       className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                                                  >
                                                       Update
                                                  </th>
                                             </tr>
                                        </thead>
                                        <tbody>



                                             {rooms?.map((room) => {
                                                  return < RoomDataRow key={room._id} refetch={refetch} handelDelete={handelDelete} room={room} />
                                             })}
                                        </tbody>
                                   </table>
                              </div>
                         </div>
                    </div>
               </div>
          </>
     )
}

export default MyListings
