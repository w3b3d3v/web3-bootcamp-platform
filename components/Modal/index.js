/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useRef, useState, useEffect, useCallback } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { auth, storage } from '../../firebase/initFirebase';
import { onAuthStateChanged } from 'firebase/auth';
import { getUserFromFirestore, submitLessonInFirestore } from '../../lib/user';
import { getLessonsSubmissions } from '../../lib/lessons';
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
export default function Modal({ openExternal, onClose, course, lesson }) {
  const cancelButtonRef = useRef(null);
  const [lessonSubmission, setLessonSubmission] = useState();
  const [cohort, setCohort] = useState();
  const [user, setUser] = useState();
  const [file, setFile] = useState();

  useEffect(() => {
    onAuthStateChanged(auth, async user => {
      if(user) {
        const userSession = await getUserFromFirestore(user);
        setUser(userSession);
        let currentCohort = userSession.cohorts.find(c => c.id === course.id);
        setCohort(currentCohort.cohort.id);
      }
    }
    );
  }, []);

  const getSection = () => {
    const section = Object.entries(course.sections)
      .map(section => section[1]
        .map(item => { if(item.file.includes(lesson)) return section[0]; }))
      .flat()
      .find(Boolean);
    return section;
  };
  const getSubmissionType = () => {
    return course.sections[getSection()].filter(item => item.file === lesson)[0].submission_type;
  };
  const saveLessonSubmission = async (userSubmission) => {
    const section = getSection();
    const content = {
      type: getSubmissionType(),
      value: userSubmission,
    };
    await submitLessonInFirestore(cohort, user, lesson, section, content);
    onClose();
  };
  const saveUploadToStorage = async () => {
    console.log(file);
    const storageRef = ref(storage, `${course.id}/`);
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
            {getSubmissionType() == 'text' || getSubmissionType() == 'url' ?
              <div className="relative inline-block align-bottom bg-white-100 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white-100 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                        Enviar Resposta
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Estamos muito felizes de você ter chegado até aqui. Nos conte o que te motiva, seus interesses e objetivos com web3.
                        </p>
                        <br />
                        <textarea name='lesson-submission' className='w-full h-20 p-1' onChange={(event) => setLessonSubmission(event.target.value)} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    className="w-full cursor-pointer inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => saveLessonSubmission(lessonSubmission)}
                  >
                    Enviar
                  </button>
                  <button
                    className="mt-3 cursor-pointer w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white-100 text-base font-medium text-gray-700 hover:bg-gray-50 hover:bg-red-300 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={onClose}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </div>
              :
              <div className="relative inline-block align-bottom bg-white-100 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white-100 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                        Enviar Resposta
                      </Dialog.Title>
                      <div className="mt-2 text-gray-900">
                        <label htmlFor="lessonPrint">Enviar Print: </label>
                        <input type="file" onChange={(event) => setFile(event.target.files[0])}
                          id="lessonPrint" name="lessonPrint" />
                        <br />
                        <button onClick={() => saveUploadToStorage()}>Enviar</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            }
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
