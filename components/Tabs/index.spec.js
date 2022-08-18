//import '@testing-library/jest-dom'
import { checkLessonsSubmitted, checkSections, colorTab } from './tabFunctions'
import { fetchDB } from '../../tests/lib/fetchDB'

const db = {
  course: null,
  lessons: null,
  user_id: 'tFOYKWIm6OMlKHtmxarRfVY77W63',
  cohort: { id: 'lloRUGwzJAG4Lj2B3bmJ' },
}

describe('Tabs util functions', () => {
  beforeEach(async () => {
    const { course, lessons } = await fetchDB()
    db.course = course
    db.lessons = lessons
  })
  
  it('should return green backgroundon section completed', () => {
    const lesson = db.lessons.filter((lesson) => lesson.lesson === 'Lesson_1_Welcome.md')
    const { isSectionCompleted, currentSection } = checkSections(
      db.course,
      lesson,
      'Section_0',
      db.user_id,
      db.cohort
    )
    expect(colorTab(isSectionCompleted, currentSection)).toBe('bg-green-500')
  })

  it('should return purple background on uncompleted all lessons of a section', () => {
    const completed = checkSections(db.course, db.lessons, 'Section_0', db.user_id, db.cohort)
    const notCompleted = checkSections(db.course, db.lessons, 'Section_2', db.user_id, db.cohort)
    expect(colorTab(completed.isSectionCompleted, completed.currentSection)).toBe('bg-green-500')
    expect(colorTab(notCompleted.isSectionCompleted, notCompleted.currentSection)).toBe(
      'bg-violet-600'
    )
    expect(checkSections(db.course, db.lessons, 'Section_0', db.user_id, db.cohort)).not.toBe(
      'bg-violet-600'
    )
  })

  it('should return purple background on uncompleted all lessons of a section', () => {
    const { isSectionCompleted, currentSection } = checkSections(
      db.course,
      db.lessons,
      'Section_5',
      db.user_id,
      db.cohort
    )
    expect(colorTab(isSectionCompleted, currentSection)).toBe('')
  })

  it('should return total lessons submitted', () => {
    const expectedResult = [
      {
        section: 'Section_0',
        completed: 1,
        total: 1,
      },
      {
        section: 'Section_1',
        completed: 5,
        total: 5,
      },
      {
        section: 'Section_2',
        completed: 3,
        total: 4,
      },
      {
        section: 'Section_3',
        completed: 2,
        total: 2,
      },
      {
        section: 'Section_4',
        completed: 1,
        total: 2,
      },
    ]
    expect(checkLessonsSubmitted(db.course, db.lessons, db.user_id, db.cohort)).toStrictEqual(
      expectedResult
    )
  })
})
