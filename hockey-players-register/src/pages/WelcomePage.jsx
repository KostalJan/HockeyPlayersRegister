import SearchField from "../components/SearchField";

const WelcomePage = () => {
  return (
    <div className="flex flex-col min-h-screen min-w-screen justify-center items-center bg-[#cdd9e5] ">
      <h1 className="mb-10 text-4xl font-extrabold ">
        Welcome to NHL Players Register
      </h1>
      <div className="mb-30">
        <SearchField className="w-full max-w-xl mx-auto" />
      </div>
    </div>
  );
};

export default WelcomePage;
