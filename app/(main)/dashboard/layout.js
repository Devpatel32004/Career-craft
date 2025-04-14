import { Suspense } from "react";
import { BarLoader } from "react-spinners";

const dashBoardLayout = async ({ children }) => {
  return (
    <div className="px-3 md:px-8">
      <div className="flext items-center justify-between mb-5">
        <h1 className="text-3xl md:text-4xl lg:text-6xl gradient-title font-bold">
          Industry Insights
        </h1>
      </div>
      <Suspense
        fallback={<BarLoader className="mt-4" width={"100%"} color="gray" />}
      >
        {children}
      </Suspense>
    </div>
  );
};

export default dashBoardLayout;
