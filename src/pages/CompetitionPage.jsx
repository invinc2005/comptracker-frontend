import CompetitionForm from '../components/CompetitionForm';
import CompetitionList from '../components/CompetitionList';

const CompetitionPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-600 p-6 flex flex-col items-center justify-start space-y-6">
      <div className="w-full max-w-6xl bg-white/90 backdrop-blur-xl shadow-xl rounded-2xl p-6">
        <CompetitionForm />
      </div>
      <div className="w-full max-w-6xl bg-white/90 backdrop-blur-xl shadow-xl rounded-2xl p-6">
        <CompetitionList />
      </div>
    </div>
  );
};

export default CompetitionPage;
