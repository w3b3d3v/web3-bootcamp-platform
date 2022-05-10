/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useRef, useState, useEffect, useCallback } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { auth, storage } from '../../firebase/initFirebase';
import { onAuthStateChanged } from 'firebase/auth';
import { getUserFromFirestore, submitLessonInFirestore } from '../../lib/user';
import { getLessonsSubmissions } from '../../lib/lessons';
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { getAllCohorts } from '../../lib/cohorts';
import { uuid } from 'uuidv4';
import Loading from '../Loading';
import { toast } from 'react-toastify';
export default function Modal({ openExternal, onClose, course, lesson, submissionType, submissionText, submissionTitle }) {
  const cancelButtonRef = useRef(null);
  const [lessonSubmission, setLessonSubmission] = useState();
  const [cohort, setCohort] = useState();
  const [user, setUser] = useState();
  const [file, setFile] = useState(null);
  const [cohorts, setCohorts] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, async user => {
      if(user) {
        const userSession = await getUserFromFirestore(user);
        setUser(userSession);
        const currentCohort = userSession.cohorts.find(c => c.course_id === course.id);
        setCohort(currentCohort);
      }
    }
    );
  }, []);

  useEffect(async () => {
    setCohorts(await getAllCohorts());
  }, []);

  /*  useEffect(async () => {
      if(cohorts) {
        const currentCohort = cohorts.find(c => c.courseId === course.id);
        setCohort(currentCohort);
      }
    }, [cohorts]);*/

  const getSection = () => {
    const section = Object.entries(course.sections)
      .map(section => section[1]
        .map(item => { if(item.file.includes(lesson)) return section[0]; }))
      .flat()
      .find(Boolean);
    return section;
  };
  const saveLessonSubmission = async (userSubmission, submissionId) => {
    if(!userSubmission) return toast.error('Você não pode enviar a lição sem resposta :)');
    if(!submissionId) submissionId = uuid();
    const section = getSection();
    const content = {
      type: submissionType,
      value: userSubmission,
    };
    await submitLessonInFirestore(cohort.cohort_id, user, lesson, section, content, submissionId);
    setLoading(false);
    onClose();
  };
  const saveUploadToStorage = async () => {
    if(!file) return toast.error('Você precisa selecionar um arquivo para enviar');
    setLoading(true);
    const submissionId = uuid();
    const storageRef = ref(storage, `lessons_submissions/${submissionId}`);
    await uploadBytes(storageRef, file);
    await getDownloadURL(storageRef).then((url) => {
      saveLessonSubmission(url);
    });
  };
  return (
    <Transition.Root show={openExternal} as={Fragment}>
      <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" initialFocus={cancelButtonRef} onClose={onClose}>
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            {submissionType == 'upload' ?
              <div className="relative inline-block align-bottom bg-white-100 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white-100 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                        {submissionTitle}
                        <br />

                      </Dialog.Title>
                      <div className="mt-2 text-gray-900">
                        <label htmlFor="lessonPrint">{submissionText}</label><br />
                        <input type="file" onChange={(event) => setFile(event.target.files[0])}
                          id="load-file" name="lessonPrint" />
                        <br />
                        <div className='flex'>
                          <button id='upload-file' className="cursor-pointer inline-flex rounded-md border border-transparent shadow-sm px-4 py-2 my-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:w-auto sm:text-sm"
                            onClick={() => saveUploadToStorage()}>Enviar</button>
                          {loading &&
                            <div className='mt-2.5 ml-2.5'><Loading /></div>
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              :
              <div className="relative inline-block align-bottom bg-white-100 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white-100 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                        {submissionTitle}
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          {submissionText}
                        </p>
                        <br />
                        <textarea name='lesson-submission' className='w-full h-20 p-1' onChange={(event) => setLessonSubmission(event.target.value)} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    id='modal-send-lesson'
                    className="w-full cursor-pointer inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => saveLessonSubmission(lessonSubmission)}
                  >
                    Enviar
                  </button>
                  <button
                    className="mt-3 cursor-pointer w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white-100 text-base font-medium text-gray-700 hover:bg-gray-50 hover:bg-red-300 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={onClose}
                    id='modal-cancel-button'
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            }
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
