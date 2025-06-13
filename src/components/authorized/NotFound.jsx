import { useNavigate } from 'react-router-dom';
import notfoundImage from "../../../public/assets/img/not-found.png"

const NotFound = () => {
  const navigate = useNavigate()
  return (
    <div className=" container text-center py-5 d-flex align-items-center flex-column">
       <img className='w-75' src={notfoundImage}></img>
       <button className='btn btn-primary mt-2 ml-1 w-25 hvr-shutter-out-horizontal' onClick={()=> navigate("/")}>Back to home</button>
    </div>
  );
};


export default NotFound
