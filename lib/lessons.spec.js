import { getLessonsByCourse, completedResult } from './lessons'

describe('Lessons model', () => {
  let courseData, list, lessonsBySection, userLessonsCompletedBySection

  beforeEach(() => {
    // Use the data from seed-data.json
    courseData = {
      metadata: {
        en: {
          sections: {
            Section_0: [
              { title: 'Lesson 1: What are we building' },
              { title: 'Lesson 2: Requirements' },
            ],
            Section_1: [
              { title: 'Lesson 1: Balances Pallet' },
              { title: 'Lesson 2: Add State' },
              { title: 'Lesson 3: Store And Read' },
              { title: 'Lesson 4: Basic Tests' },
              { title: 'Lesson 5: Transfer Balance' },
            ],
            Section_2: [
              { title: 'Lesson 1: System Pallet' },
              { title: 'Lesson 2: Block Number and Nonce' },
              { title: 'Lesson 3: Runtime' },
              { title: 'Lesson 4: Executing Runtime' },
              { title: 'Lesson 5: Runtime Debug' },
            ],
            Section_3: [
              { title: 'Lesson 1: Generic Types' },
              { title: 'Lesson 2: Num Crate' },
              { title: 'Lesson 3: Make Balances Pallet Generic' },
              { title: 'Lesson 4: Make System Pallet Generic' },
              { title: 'Lesson 5: Make System Configurable' },
              { title: 'Lesson 6: Make Balances Configurable' },
              { title: 'Lesson 7: Tight Coupling' },
            ],
            Section_4: [
              { title: 'Lesson 1: Executing Blocks and Dispatching Calls' },
              { title: 'Lesson 2: Block Type' },
              { title: 'Lesson 3: Executing Blocks' },
              { title: 'Lesson 4: Dispatching Calls' },
              { title: 'Lesson 5: Execute Block With Extrinsics' },
              { title: 'Lesson 6: Pallet Level Dispatch' },
              { title: 'Lesson 7: Nested Dispatch' },
            ],
            Section_5: [
              { title: 'Lesson 1: The Proof of Existence Pallet' },
              { title: 'Lesson 2: Proof Of Existence Functions' },
              { title: 'Lesson 3: Proof of Existence Dispatch' },
              { title: 'Lesson 4: Integrate Into Runtime' },
              { title: 'Lesson 5: Add Extrinsic To Block' },
            ],
            Section_6: [
              { title: 'Lesson 1: Rust Macros' },
              { title: 'Lesson 2: Adding Call Macro to Balances' },
              { title: 'Lesson 3: Adding Call Macro to PoE' },
              { title: 'Lesson 4: Use the Runtime Macro' },
              { title: 'Lesson 5: Course Completed' },
            ],
          },
        },
      },
      analytics: [
        { section: 'Section_1', students: 20 },
        { section: 'Section_2', students: 10 },
        { section: 'Section_3', students: 5 },
      ],
    }

    // Use the getLessonsByCourse function
    const result = getLessonsByCourse(courseData.metadata.en)
    list = result.list
    lessonsBySection = result.lessonsBySection

    // Prepare userLessonsCompletedBySection
    userLessonsCompletedBySection = courseData.analytics.reduce((acc, item) => {
      acc[item.section] = item.students
      return acc
    }, {})
  })

  it('should getLessons', () => {
    const expectedLessonsBySection = {
      Section_0: 2,
      Section_1: 5,
      Section_2: 5,
      Section_3: 7,
      Section_4: 7,
      Section_5: 5,
      Section_6: 5,
    }
    expect(list).toHaveLength(36)
    expect(lessonsBySection).toStrictEqual(expectedLessonsBySection)
  })

  it('should return lessons completed by section', () => {
    const expectedLessonsCompletedBySection = {
      Section_1: 20,
      Section_2: 10,
      Section_3: 5,
    }
    expect(userLessonsCompletedBySection).toStrictEqual(expectedLessonsCompletedBySection)
  })

  it('should return total lessons and completed lessons by section', () => {
    const expectedResult = [
      { section: 'Section_0', total: 2, completed: 0 },
      { section: 'Section_1', total: 5, completed: 20 },
      { section: 'Section_2', total: 5, completed: 10 },
      { section: 'Section_3', total: 7, completed: 5 },
      { section: 'Section_4', total: 7, completed: 0 },
      { section: 'Section_5', total: 5, completed: 0 },
      { section: 'Section_6', total: 5, completed: 0 },
    ]
    const result = completedResult(lessonsBySection, userLessonsCompletedBySection)
    expect(result).toStrictEqual(expectedResult)
  })
})
