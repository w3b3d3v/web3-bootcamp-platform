const { getQueryResults } = require('../lib/bigQuery');
const { usersBySection, storeUsersPerCohort } = require('../build_analytics');
const { collection } = require('firebase/firestore');

const dbMock = {
    collection: jest.fn().mockReturnThis(),
    doc: jest.fn().mockReturnThis(),
    update: jest.fn().mockReturnThis(),
}

jest.mock('../lib/bigQuery', () => ({
    getQueryResults: jest.fn().mockReturnValue({ rows: [] }),
}));

describe('Testing build_analytics.js', function () {
    describe('usersBySection function', function () {
        it('should return correct data and run correct query', async () => {
            let res = await usersBySection();
            expect(res).toEqual({rows: []});
            expect(getQueryResults).toHaveBeenCalledWith(expect.any(String));
        });
    });

    describe('storeUsersPerCohort function', function () {
        it('should update courses with analytics section', async() => {
            const rows = [{ course_id: 'course1', sections: ['section1', 'section2'] },
            { course_id: 'course2', sections: ['section3', 'section4'] }];

            await storeUsersPerCohort(dbMock, rows);

            expect(dbMock.collection).toHaveBeenCalledWith('courses');
            expect(dbMock.doc).toHaveBeenCalledTimes(2);
            expect(dbMock.doc).toHaveBeenNthCalledWith(1, 'course1');
            expect(dbMock.doc).toHaveBeenNthCalledWith(2, 'course2');
            expect(dbMock.update).toHaveBeenCalledTimes(2);
            expect(dbMock.update).toHaveBeenNthCalledWith(1, { analytics: ['section1', 'section2'] });
            expect(dbMock.update).toHaveBeenNthCalledWith(2, { analytics: ['section3', 'section4'] });
        })
    });
});
