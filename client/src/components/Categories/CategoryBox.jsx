import PropTypes from 'prop-types'
import queryString from 'query-string';
import { useNavigate } from "react-router";
import { useSearchParams } from 'react-router-dom';


const CategoryBox = ({ label, icon: Icon }) => {
  const [params, setParams] = useSearchParams();

  const category = params.get('category') === label
  const navigate = useNavigate()
  const handelClick = () => {
    let currentQuery = { category: label }

    const url = queryString.stringifyUrl({
      url: '/',
      query: currentQuery
    })
    navigate(url)
    // console.log(url);


  }
  return (
    <div
      onClick={handelClick}
      className={`flex 
  flex-col 
  items-center 
  justify-center 
  gap-2
  p-3
  border-b-2
  hover:text-neutral-800
  transition
  cursor-pointer ${category && 'border-b-neutral-800 text-neutral-800'}`}
    >
      <Icon size={26} />
      <div className='text-sm font-medium'>{label}</div>
    </div >
  )
}

CategoryBox.propTypes = {
  label: PropTypes.string,
  icon: PropTypes.elementType,
}

export default CategoryBox
