import Sidebar from "@/components/Sidebar";
import React from "react";

const page = () => {
  return (
    <div className="grid grid-cols-5 gap-3 h-full">
      <div className="col-span-1 ">
        <Sidebar />
      </div>
      <div className="col-span-3 bg-white rounded-lg">Middle</div>

      {/* RIGHT SIDE - 1fr */}
      <div className="col-span-1 bg-white rounded-lg">Right</div>
    </div>
  );
};

export default page;
