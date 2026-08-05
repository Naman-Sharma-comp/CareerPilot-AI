import { useState } from "react";
import { FileText, BookOpen } from "lucide-react";

function Learning() {

  const [selectedFile, setSelectedFile] = useState(null);


  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };


  const removeFile = () => {
    setSelectedFile(null);
  };


  return (

    <div className="p-4 sm:p-6 lg:p-8">


      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
        Learning Assistant
      </h1>


      <p className="text-gray-500 mt-2 text-sm sm:text-base">
        Upload your study materials and learn with AI.
      </p>





      {/* Upload Box */}

      <div className="mt-6 sm:mt-10 bg-white rounded-2xl sm:rounded-3xl shadow-lg p-5 sm:p-8 lg:p-10">


        <div className="
          border-2 
          border-dashed 
          border-blue-300 
          rounded-2xl 
          p-6 
          sm:p-10 
          lg:p-16 
          text-center 
          hover:border-blue-600 
          transition
        ">


          <BookOpen 
            className="
              mx-auto 
              w-12 
              h-12 
              sm:w-16 
              sm:h-16 
              lg:w-20 
              lg:h-20
              text-blue-600
            "
          />



          <h2 className="
            text-xl 
            sm:text-2xl 
            lg:text-3xl 
            font-bold 
            mt-5
          ">
            Upload Notes
          </h2>



          <p className="text-gray-500 mt-3 text-sm sm:text-base">
            PDF, PPT, DOCX or Images
          </p>





          <label
            htmlFor="notes"
            className="
              inline-block 
              mt-6 sm:mt-8
              bg-blue-600 
              text-white 
              px-6 sm:px-8 
              py-3 
              rounded-xl 
              cursor-pointer 
              hover:bg-blue-700 
              transition
            "
          >
            Choose File
          </label>



          <input
            id="notes"
            type="file"
            accept=".pdf,.ppt,.pptx,.doc,.docx,.jpg,.jpeg,.png"
            className="hidden"
            onChange={handleFileChange}
          />


        </div>


      </div>







      {/* Selected File */}

      {selectedFile && (

        <div className="
          mt-6 sm:mt-8 
          bg-white 
          rounded-2xl 
          shadow-lg 
          p-5 sm:p-6
        ">


          <h2 className="text-xl sm:text-2xl font-semibold mb-4">
            Uploaded File
          </h2>




          <div className="
            flex 
            flex-col 
            sm:flex-row 
            sm:justify-between 
            sm:items-center 
            gap-4
          ">


            <div className="min-w-0">

              <h3 className="
                font-semibold 
                truncate
              ">
                {selectedFile.name}
              </h3>


              <p className="text-gray-500 text-sm">
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>


            </div>



            <button
              onClick={removeFile}
              className="
                text-red-600 
                hover:text-red-700
                text-left
                sm:text-right
              "
            >
              Remove
            </button>


          </div>


        </div>

      )}








      {/* AI Actions */}

      <div className="
        grid 
        grid-cols-1 
        sm:grid-cols-2 
        gap-5 sm:gap-6 
        mt-8 sm:mt-10
      ">



        <button
          className="
          bg-purple-600 
          text-white 
          p-5 
          rounded-2xl 
          hover:bg-purple-700 
          transition
          flex
          justify-center
          items-center
          gap-2
          "
        >
          <FileText size={22}/>
          Generate Summary
        </button>





        <button
          className="
          bg-green-600 
          text-white 
          p-5 
          rounded-2xl 
          hover:bg-green-700 
          transition
          flex
          justify-center
          items-center
          gap-2
          "
        >
          <FileText size={22}/>
          Create Quiz
        </button>





        <button
          className="
          bg-orange-500 
          text-white 
          p-5 
          rounded-2xl 
          hover:bg-orange-600
          transition
          "
        >
          🎴 Flashcards
        </button>





        <button
          className="
          bg-blue-600 
          text-white 
          p-5 
          rounded-2xl 
          hover:bg-blue-700
          transition
          "
        >
          💬 Ask AI
        </button>



      </div>



    </div>

  );
}

export default Learning;