export const course = {
  sections: {
    Section_0: [{ file: 'Lesson_1_Welcome.md' }],
    Section_1: [
      { file: 'Lesson_1_Get_Your_Local_Ethereum_Network_Running.md' },
      {
        file: 'Lesson_3_Connect_Wallet_To_Web_App.md',
      },
    ],
  },
}
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
  .map((section) => section)[0]

export const cohort = {
  courseId: 'Solidity_And_Smart_Contracts',
  endDate: new Date('2022, 06, 20'),
  id: 'lloRUGwzJAG4Lj2B3bmJ',
  kickoffEndTime: new Date('2022, 06, 19'),
  kickoffStartTime: new Date('2022, 06, 19'),
  startDate: new Date('2022, 06, 19'),
}
export const user = { uid: 'tFOYKWIm6OMlKHtmxarRfVY77W63' }
