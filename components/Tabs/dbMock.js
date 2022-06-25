export const course = {
  sections: {
    Section_0: [{ file: 'Lesson_1_Welcome.md' }],
    Section_1: [
      { file: 'Lesson_1_Get_Your_Local_Ethereum_Network_Running.md' },
      {
        file: 'Lesson_2_Write_Your_First_Smart_Contract.md',
      },
      {
        file: 'Lesson_3_Compile_Contract_Locally.md',
      },
      {
        file: 'Lesson_4_Store_Data_On_Smart_Contract.md',
      },
    ],
    Section_2: [
      { file: 'Lesson_1_Setup_React_App.md' },
      {
        file: 'Lesson_2_Deploy_To_Real_Testnet.md',
      },
    ],
  },
}

export const submittedFirstLesson = [
  {
    cohort: 'lloRUGwzJAG4Lj2B3bmJ',
    cohort_id: 'lloRUGwzJAG4Lj2B3bmJ',
    content: { type: 'text', value: 'um pequeno feedback' },
    lesson: 'Lesson_1_Welcome.md',
    section: 'Section_0',
    user: 'tFOYKWIm6OMlKHtmxarRfVY77W63',
    user_id: 'tFOYKWIm6OMlKHtmxarRfVY77W63',
  },
]

export const lessonsSubmitted = [
  {
    cohort: 'lloRUGwzJAG4Lj2B3bmJ',
    cohort_id: 'lloRUGwzJAG4Lj2B3bmJ',
    content: { type: 'text', value: 'um pequeno feedback' },
    lesson: 'Lesson_1_Welcome.md',
    section: 'Section_0',
    user: 'tFOYKWIm6OMlKHtmxarRfVY77W63',
    user_id: 'tFOYKWIm6OMlKHtmxarRfVY77W63',
  },
  {
    cohort: 'lloRUGwzJAG4Lj2B3bmJ',
    cohort_id: 'lloRUGwzJAG4Lj2B3bmJ',
    content: { type: 'text', value: 'teste' },
    lesson: 'Lesson_1_Get_Your_Local_Ethereum_Network_Running.md',
    section: 'Section_1',
    user: 'tFOYKWIm6OMlKHtmxarRfVY77W63',
    user_id: 'tFOYKWIm6OMlKHtmxarRfVY77W63',
  },
]

export const section = Object.keys(course.sections)
  .sort()
  .map((section) => section)

export const sectionZero = 'Section_0'

export const cohort = {
  courseId: 'Solidity_And_Smart_Contracts',
  endDate: new Date('2022, 06, 20'),
  id: 'lloRUGwzJAG4Lj2B3bmJ',
  kickoffEndTime: new Date('2022, 06, 19'),
  kickoffStartTime: new Date('2022, 06, 19'),
  startDate: new Date('2022, 06, 19'),
}
export const user = { uid: 'tFOYKWIm6OMlKHtmxarRfVY77W63' }
