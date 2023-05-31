import InputSection from "./InputSection";

function MainSection() {
  return (
    <div className="flex justify-center w-full h-full px-8 py-5">
      <div className="flex flex-col h-full rounded-lg md:pt-10 ">
        <div>
          <h1 className="px-4 py-2 text-xl font-bold tracking-tight text-center text-slate-900 lg:text-4xl dark:text-white ">
            Welcome on FileMorph, the best file converter out there!
          </h1>
          <div className="pt-2 pb-12 text-center text-md sm:text-lg text-slate-600 dark:text-slate-400">
            The easiest way to convert your files
          </div>
        </div>
        <div className="pb-7 lg:pb-10 xl:h-5/6">
          <InputSection />
        </div>
      </div>
    </div>
  );
}

export default MainSection;
