import { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import api from '../api/api';
import GradientText from '../GradientText/GradientText';


const ParticipantForm = () => {
  const [competitions, setCompetitions] = useState([]);

  useEffect(() => {
    const fetchCompetitions = async () => {
      try {
        const res = await api.get('/competitions');
        setCompetitions(res.data);
      } catch (err) {
        console.error('Error fetching competitions', err);
      }
    };
    fetchCompetitions();
  }, []);

  const initialValues = {
    name: '',
    email: '',
    score: '',
    competitionId: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    score: Yup.number().required('Score is required'),
    competitionId: Yup.string().required('Select a competition'),
  });

  const onSubmit = async (values, { resetForm }) => {
    try {
      await api.post('/participants', {
        name: values.name,
        email: values.email,
        score: values.score,
        competition: { id: values.competitionId },
      });
      alert('Participant added!');
      resetForm();
    } catch (error) {
      alert('Error adding participant');
      console.error(error);
    }
  };

  return (
    <div className="w-full">
    <GradientText className="text-3xl font-bold  mb-6 text-start">Add Participant</GradientText>

      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        <Form className="flex flex-wrap gap-4 items-end">
          <div className="flex-1 min-w-[200px]">
            <label className="block mb-1 font-medium">Name</label>
            <Field name="name" className="w-full border px-3 py-2 rounded" />
            <ErrorMessage name="name" component="div" className="text-red-600 text-sm" />
          </div>

          <div className="flex-1 min-w-[200px]">
            <label className="block mb-1 font-medium">Email</label>
            <Field name="email" className="w-full border px-3 py-2 rounded" />
            <ErrorMessage name="email" component="div" className="text-red-600 text-sm" />
          </div>

          <div className="flex-1 min-w-[120px]">
            <label className="block mb-1 font-medium">Score</label>
            <Field name="score" type="number" className="w-full border px-3 py-2 rounded" />
            <ErrorMessage name="score" component="div" className="text-red-600 text-sm" />
          </div>

          <div className="flex-1 min-w-[200px]">
            <label className="block mb-1 font-medium">Competition</label>
            <Field name="competitionId" as="select" className="w-full border px-3 py-2 rounded">
              <option value="">Select a competition</option>
              {competitions.map((comp) => (
                <option key={comp.id} value={comp.id}>
                  {comp.title}
                </option>
              ))}
            </Field>
            <ErrorMessage name="competitionId" component="div" className="text-red-600 text-sm" />
          </div>

          <div>
            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
              Add
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default ParticipantForm;
