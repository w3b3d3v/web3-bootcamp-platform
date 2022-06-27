import '@testing-library/jest-dom'
import {
  cohort,
  course,
  lessonsSubmitted,
  section,
  sectionZero,
  submittedFirstLesson,
  user,
} from './dbMock'
import { checkLessonsSubmitted, checkSections, getLessons } from './tabFunctions'

describe('Tabs util functions', () => {
  const submittedZeroLessons = [{}]

  it('should getLesons', () => {
    const { list, lessonsBySection } = getLessons(course)
    const testObj = {
      Section_0: 1,
      Section_1: 4,
      Section_2: 2,
    }
    expect(list).toHaveLength(7)
    expect(lessonsBySection).toStrictEqual(testObj)
  })

  it('should return green backgroundon section completed', () => {
    expect(checkSections(course, submittedFirstLesson, cohort, sectionZero, user.uid)).toBe(
      'bg-green-500'
    )
  })

  it('should return purple background on uncompleted all lessons of a section', () => {
    const sectionOne = 'Section_1'
    expect(checkSections(course, submittedZeroLessons, cohort, sectionZero, user.uid)).toBe(
      'bg-violet-600'
    )
    expect(checkSections(course, lessonsSubmitted, cohort, sectionOne, user.uid)).toBe(
      'bg-violet-600'
    )
    expect(checkSections(course, submittedFirstLesson, cohort, sectionZero, user.uid)).not.toBe(
      'bg-violet-600'
    )
  })

  it('should return purple background on uncompleted all lessons of a section', () => {
    const sectionTwo = 'Section_2'
    expect(checkSections(course, submittedZeroLessons, cohort, sectionTwo, user.uid)).toBe('')
  })

  it('should return sections', () => {
    expect(section).toStrictEqual(['Section_0', 'Section_1', 'Section_2'])
  })

  it('should return total lessons submitted', () => {
    const lessonsSubmittedMock = [
      {
        section: 'Section_0',
        completed: 1,
        total: 1,
      },
      {
        section: 'Section_1',
        completed: 0,
        total: 4,
      },
      {
        section: 'Section_2',
        completed: 0,
        total: 2,
      },
    ]
    expect(checkLessonsSubmitted(course, submittedFirstLesson, cohort, user.uid)).toStrictEqual(
      lessonsSubmittedMock
    )
  })
})
