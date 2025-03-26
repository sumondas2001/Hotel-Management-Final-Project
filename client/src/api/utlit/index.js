import axios from "axios";
const imgBbApiKey = 'aad67bbcb2f3a91c4cfd7df8360805d8';


export const imageUpload = async (image) => {
     const fromData = new FormData();
     fromData.append('image', image)
     const { data } = await axios.post(`https://api.imgbb.com/1/upload?key=${imgBbApiKey}`, fromData)

     return data.data.display_url
}