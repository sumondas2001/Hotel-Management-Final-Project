import { useState } from "react";
import AddRoomForm from "../../../components/Form/AddRoomForm";
import useAuth from "../../../hooks/useAuth";
import { imageUpload } from "../../../api/utlit";
import { Helmet } from 'react-helmet-async';
import { useMutation } from "@tanstack/react-query";
import { axiosSecure } from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


const AddRoom = () => {
     const [imagePreview, setImagePreview] = useState();
     const [imageText, setImageText] = useState(' Upload Image');
     const [loading, setLoading] = useState(false);
     const { user } = useAuth();
     const navigate = useNavigate();
     // console.log(user);
     const [dates, setDates] = useState(
          {
               startDate: new Date(),
               endDate: null,
               key: 'selection'
          }
     );
     const handelDates = range => {
          console.log(range);
          setDates(range.selection)
     };

     const { mutateAsync } = useMutation({
          mutationFn: async roomData => {
               const { data } = await axiosSecure.post(`/add-room`, roomData)
               return data
          },
          onSuccess: () => {
               console.log('room add successfully');
               toast.success('Room Added Successfully!')
               navigate('/dashboard/my-listings')
               setLoading(false);
          }
     });

     const handelSubmit = async e => {
          e.preventDefault()
          setLoading(true)
          const form = e.target
          const location = form.location.value
          const category = form.category.value
          const title = form.title.value
          const to = dates.endDate
          const from = dates.startDate
          const price = form.price.value
          const guests = form.total_guest.value
          const bathrooms = form.bathrooms.value
          const description = form.description.value
          const bedrooms = form.bedrooms.value
          const image = form.image.files[0]

          const host = {
               name: user?.displayName,
               image: user?.photoURL,
               email: user?.email,
          }

          try {
               const image_url = await imageUpload(image)
               const roomData = {
                    location,
                    category,
                    title,
                    to,
                    from,
                    price,
                    guests,
                    bathrooms,
                    bedrooms,
                    host,
                    description,
                    image: image_url,
               }
               console.table(roomData)

               //   Post request to server
               await mutateAsync(roomData)
          } catch (err) {
               console.log(err)
               toast.error(err.message)
               setLoading(false)
          }
     }


     const handelChanged = (image) => {
          setImagePreview(URL.createObjectURL(image))
          setImageText(image.name)
     }
     return (
          <div>
               <Helmet>
                    <title>Add Room | Dashboard</title>
               </Helmet>
               {/* from add */}
               <AddRoomForm handelChanged={handelChanged} imagePreview={imagePreview} imageText={imageText} dates={dates} handelDates={handelDates} handelSubmit={handelSubmit} loading={loading} />
          </div>
     );
};

export default AddRoom;