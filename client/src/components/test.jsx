import React, { useState } from "react";
import Dialog from "./Msg";

function Home() {
  const [isShowDialog, setIsShowDialog] = useState(false);

  const handleSubmit = () => {
    // Handle submit....
  }

  const handleCloseDialog = () => {
    setIsShowDialog(!isShowDialog)
  }

  const DialogActions = (btnColor) => {
    return (
      <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
        <button
          type="button"
          className={`w-full inline-flex justify-center rounded-md border 
          border-transparent shadow-sm px-4 py-2 ${btnColor}-600 text-base
          font-medium text-white hover:${btnColor}-700 focus:outline-none
          focus:ring-2 focus:ring-offset-2 
          focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm`}
          onClick={handleSubmit}
        >
          Submit
        </button>
        <button
          type="button"
          className="mt-3 w-full inline-flex justify-center rounded-md
          border border-gray-300 shadow-sm px-4 py-2 bg-white text-base 
          font-medium text-gray-700 hover:bg-gray-50 focus:outline-none
          focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
          sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
          onClick={handleCloseDialog}
        >
          Cancel
        </button>
      </div>
    );
  };

  return (
    <div className="">
      <div className="container mx-auto flex justify-center m-10">
        <button
          type="button"
          className="py-2 px-4 bg-black text-white font-semibold rounded-lg
          shadow-md focus:outline-none"
          onClick={handleCloseDialog}
        >
          Save
        </button>
      </div>
      {isShowDialog && (
        <Dialog
          title={"Dialog Title"}
          handleCloseDialog={handleCloseDialog}
          actionsPannel={DialogActions('bg-blue')}
          size={'w-2/7'}
          color={'bg-green'}
        >
          Dialog Content goes here...
        </Dialog>
      )}
    </div>
  );
}