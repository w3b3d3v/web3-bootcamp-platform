import '@testing-library/jest-dom'
import { course, sectionZero, submittedFirstLesson, user } from '../../tests/fixtures/tab_db_mock'

import { checkLessonsSubmitted, checkSections, colorTab } from './tabFunctions'
import { getLessonsByCourse } from '../../lib/Models/withoutDB/lessons'

describe('Tabs util functions', () => {
  const submittedZeroLessons = [{}]

  it('should getLesons', () => {
    const { list, lessonsBySection } = getLessonsByCourse(course)
    const testObj = {
      Section_0: 1,
      Section_1: 4,
      Section_2: 2,
    }
    expect(list).toHaveLength(7)
    expect(lessonsBySection).toStrictEqual(testObj)
  })

  it('should return green backgroundon section completed', () => {
    const { isSectionCompleted, currentSection } = checkSections(
      course,
      submittedFirstLesson,
      sectionZero,
      user.uid
    )
    expect(colorTab(isSectionCompleted, currentSection)).toBe('bg-green-500')
  })

  it('should return purple background on uncompleted all lessons of a section', () => {
    const sectionOne = 'Section_1'
    const completed = checkSections(course, submittedFirstLesson, sectionZero, user.uid)
    const notCompleted = checkSections(course, submittedFirstLesson, sectionOne, user.uid)
    expect(colorTab(completed.isSectionCompleted, completed.currentSection)).toBe('bg-green-500')
    expect(colorTab(notCompleted.isSectionCompleted, notCompleted.currentSection)).toBe(
      'bg-violet-600'
    )
    expect(checkSections(course, submittedFirstLesson, sectionZero, user.uid)).not.toBe(
      'bg-violet-600'
    )
  })

  it('should return purple background on uncompleted all lessons of a section', () => {
    const sectionTwo = 'Section_2'
    const { isSectionCompleted, currentSection } = checkSections(
      course,
      submittedFirstLesson,
      sectionTwo,
      user.uid
    )
    expect(colorTab(isSectionCompleted, currentSection)).toBe('')
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
    expect(checkLessonsSubmitted(course, submittedFirstLesson, user.uid)).toStrictEqual(
      lessonsSubmittedMock
    )
  })
})
