import trophy from '../assets/trophy.png'; 

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col-reverse md:flex-row items-center justify-between bg-gradient-to-br from-indigo-500 via-sky-400 to-blue-500 px-6 md:px-20 py-16 text-white">
      
      <div className="md:w-1/2 mb-10 md:mb-0">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
          Welcome to <span className="text-yellow-300">CompTracker</span> 
        </h1>
        <p className="text-lg mb-3">
          Track and manage competitions effortlessly.
        </p>
        <p className="text-lg">
          Add participants, monitor scores, and view beautiful leaderboards.
        </p>
      </div>

      <div className="md:w-1/2 flex justify-center">
        <img
          src={trophy}
          alt="Trophy"
          className="w-40 h-40 md:w-64 md:h-64 object-contain mx-auto"
        />
      </div>
    </div>
  );
};

export default HomePage;
