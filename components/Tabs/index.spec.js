import '@testing-library/jest-dom'
import { cohort, course, lessonsSubmitted, section } from './dbMock'
import { checkCurrentSection, getLessons } from './utilFunctions'

describe('Tabs util functions', () => {
  it('should getLesons', () => {
    expect(getLessons(course).list).toHaveLength(3)
    expect(getLessons(course).courseSectionsLength).toStrictEqual({ Section_0: 1, Section_1: 2 })
  })

  it('should getLesons', () => {
    console.log(checkCurrentSection(section, course, lessonsSubmitted, cohort))
  })
})
