export const course = {
  sections: {
    Section_0: [{ file: 'Lesson_1_Welcome' }],
    Section_1: [
      { file: 'Lesson_1_What_are_we_building' },
      {
        file: 'Lesson_2_Creating_React_App',
      },
    ],
  },
}
export const lessonsSubmitted = [
  {
    cohort: 'lloRUGwzJAG4Lj2B3bmJ',
    cohort_id: 'lloRUGwzJAG4Lj2B3bmJ',
    content: { type: 'text', value: 'um pequeno feedback' },
    lesson: 'Lesson_4_Store_Data_On_Smart_Contract.md',
    section: 'Section_1',
    user: 'tFOYKWIm6OMlKHtmxarRfVY77W63',
    user_id: 'tFOYKWIm6OMlKHtmxarRfVY77W63',
  },
  {
    cohort: 'lloRUGwzJAG4Lj2B3bmJ',
    cohort_id: 'lloRUGwzJAG4Lj2B3bmJ',
    content: { type: 'text', value: 'teste' },
    lesson: 'Lesson_3_Connect_Wallet_To_Web_App.md',
    section: 'Section_2',
    user: 'tFOYKWIm6OMlKHtmxarRfVY77W63',
    user_id: 'tFOYKWIm6OMlKHtmxarRfVY77W63',
  },
]

export const section = Object.keys(course.sections)
  .sort()
  .map((section) => section)

export const cohort = {
  courseId: 'Solidity_And_Smart_Contracts',
  endDate: new Date('2022, 06, 20'),
  id: 'LNYQZCn5p9amT9VUJVhs',
  kickoffEndTime: new Date('2022, 06, 19'),
  kickoffStartTime: new Date('2022, 06, 19'),
  startDate: new Date('2022, 06, 19'),
}
