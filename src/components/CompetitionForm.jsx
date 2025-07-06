import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import api from '../api/api';
import GradientText from '../GradientText/GradientText';


const CompetitionForm = () => {
  const initialValues = {
    title: '',
    description: '',
    startDate: '',
    endDate: '',
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    startDate: Yup.string().required('Start date is required'),
    endDate: Yup.string().required('End date is required'),
  });

  const onSubmit = async (values, { resetForm }) => {
    try {
      const formatDateTime = (dt) => {
        return dt.length === 16 ? dt + ':00' : dt;
      };

      const formattedValues = {
        ...values,
        startDate: formatDateTime(values.startDate),
        endDate: formatDateTime(values.endDate),
      };

      await api.post('/competitions', formattedValues);
      alert('Competition created!');
      resetForm();
    } catch (error) {
      alert('Error creating competition');
      console.error(error);
    }
  };

  return (
    <div className="w-full">  
      <GradientText className="text-3xl font-bold mb-6 text-start">Add Competition</GradientText>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        <Form className="space-y-4">
          <div className="flex items-center gap-4">
            <label className="w-32 font-medium">Title</label>
            <div className="flex flex-col w-full">
              <Field name="title" className="border px-3 py-2 rounded" />
              <ErrorMessage name="title" component="div" className="text-red-600 text-sm" />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <label className="w-32 font-medium">Description</label>
            <div className="flex flex-col w-full">
              <Field name="description" className="border px-3 py-2 rounded" />
              <ErrorMessage name="description" component="div" className="text-red-600 text-sm" />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <label className="w-32 font-medium">Start Date</label>
            <div className="flex flex-col w-full">
              <Field name="startDate" type="datetime-local" className="border px-3 py-2 rounded" />
              <ErrorMessage name="startDate" component="div" className="text-red-600 text-sm" />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <label className="w-32 font-medium">End Date</label>
            <div className="flex flex-col w-full">
              <Field name="endDate" type="datetime-local" className="border px-3 py-2 rounded" />
              <ErrorMessage name="endDate" component="div" className="text-red-600 text-sm" />
            </div>
          </div>

          <div className="flex justify-end">
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Submit
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default CompetitionForm;
