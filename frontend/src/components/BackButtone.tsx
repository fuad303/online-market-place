const BackButton = () => {
  return (
    <button
      className="bg-[#26394c] text-white w-36 h-10 rounded-md flex items-center justify-center text-sm font-medium relative overflow-hidden group transition duration-200 shadow-xl hover:shadow"
      type="button"
    >
      <div className="bg-[#324455] h-full w-0 group-hover:w-full absolute inset-0 transition-all duration-300"></div>
      <div className="absolute left-2 flex items-center z-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1024 1024"
          height="16px"
          width="16px"
          className="fill-white"
        >
          <path d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z" />
          <path d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z" />
        </svg>
      </div>
      <p className="relative z-10 text-center">عقب رفتن</p>
    </button>
  );
};

export default BackButton;
