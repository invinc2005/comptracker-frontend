import ParticipantForm from '../components/ParticipantForm';
import ParticipantList from '../components/ParticipantList';

const ParticipantPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-600 p-6 flex flex-col items-center justify-start space-y-6">
      <div className="w-full max-w-6xl bg-white/90 backdrop-blur-xl shadow-xl rounded-2xl p-6">
        <ParticipantForm />
      </div>
      <div className="w-full max-w-6xl bg-white/90 backdrop-blur-xl shadow-xl rounded-2xl p-6">
        <ParticipantList />
      </div>
    </div>
  );
};

export default ParticipantPage;
