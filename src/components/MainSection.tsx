import InputSection from "./InputSection";

function MainSection() {
  return (
    <div className="flex justify-center w-full h-full px-8 bg-slate-50 dark:bg-slate-900">
      <div className="flex flex-col w-full h-full rounded-lg md:pt-10">
        <div>
          <h1 className="px-4 py-2 text-xl font-bold tracking-tight text-center select-none text-slate-900 lg:text-4xl dark:text-white ">
            Welcome on FileMorph, the best file converter out there!
          </h1>
          <div className="pt-2 pb-6 text-center lg:pb-12 text-md sm:text-lg text-slate-600 dark:text-slate-400 ">
            The easiest way to convert your files
          </div>
        </div>
        <div className="h-full pb-2 lg:pb-10">
          <InputSection />
        </div>
      </div>
    </div>
  );
}

export default MainSection;
