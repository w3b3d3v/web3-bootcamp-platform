import { fetchDB } from '../tests/lib/fetchDB'
import { completedResult } from './lessons'

const db = {
  list: null,
  lessonsBySection: null,
  userLessonsCompletedBySection: null,
}

describe('Lessons model', () => {
  beforeEach(async () => {
    const { list, lessonsBySection, userLessonsCompletedBySection } = await fetchDB()
    db.list = list
    db.lessonsBySection = lessonsBySection
    db.userLessonsCompletedBySection = userLessonsCompletedBySection
  })

  it('should getLesons', async () => {
    const lessonsBySection = {
      Section_0: 1,
      Section_1: 5,
      Section_2: 4,
      Section_3: 2,
      Section_4: 2,
    }
    expect(db.list).toHaveLength(14)
    expect(db.lessonsBySection).toStrictEqual(lessonsBySection)
  })

  it('should return lessons completed by section', () => {
    const lessonsCompletedBySectionExpected = {
      Section_0: 1,
      Section_1: 5,
      Section_2: 5,
      Section_3: 2,
      Section_4: 2,
    }
    expect(db.userLessonsCompletedBySection).toStrictEqual(lessonsCompletedBySectionExpected)
  })

  it('should return total lessons and completed lessons by section', () => {
    const expectedResult = [
      {
        section: 'Section_0',
        total: 1,
        completed: 1,
      },
      {
        section: 'Section_1',
        total: 5,
        completed: 5,
      },
      {
        section: 'Section_2',
        total: 4,
        completed: 5,
      },
      {
        section: 'Section_3',
        total: 2,
        completed: 2,
      },
      {
        section: 'Section_4',
        total: 2,
        completed: 2,
      },
    ]
    const result = completedResult(db.lessonsBySection, db.userLessonsCompletedBySection)
    expect(result).toStrictEqual(expectedResult)
  })
})
