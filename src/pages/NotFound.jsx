import { Link } from "react-router-dom";
import { TriangleAlert } from "lucide-react";

function NotFound() {
  return (
    <div className="
      min-h-screen 
      flex 
      justify-center 
      items-center 
      bg-gray-100
      px-4
    ">

      <div className="text-center">


        <TriangleAlert
          size={70}
          className="
            mx-auto 
            text-blue-600 
            mb-5
            sm:w-[90px]
            sm:h-[90px]
          "
        />



        <h1 className="
          text-6xl
          sm:text-7xl
          lg:text-8xl
          font-bold
        ">
          404
        </h1>



        <p className="
          text-gray-600
          text-base
          sm:text-xl
          mt-4
        ">
          Oops! This page doesn't exist.
        </p>




        <Link
          to="/"
          className="
            inline-block
            mt-6
            sm:mt-8
            bg-blue-600
            text-white
            px-6
            sm:px-8
            py-3
            rounded-xl
            btn-hover
            transition
            "
        >
          Back Home
        </Link>



      </div>

    </div>
  );
}

export default NotFound;