import { mockScoreData } from "../data/mockscoredata.js";
import { mockCompanyData } from "../data/mockcompanydata.js";

import {
    findCandidateInfo,
    filterCompanyByFractalIndex,
    filterScoresByCompanyId,
    filterScoresByJobTitle,
} from "../../../../pages/api/utils/filtering.js";


describe('Testing utility functions in filtering.js', () => {
    it('finds a candidate by their id', () => {
        const candidateId = 1819
        const expectedCandidate = mockScoreData.find(candidate => candidate['candidate_id'] == candidateId)
        const result = findCandidateInfo(candidateId, mockScoreData)
        expect(result).toEqual(expectedCandidate)
    })

    it('filters companies by fractal index', () => {
        const companyId = 1
        const filteredCompanies = filterCompanyByFractalIndex(companyId, mockCompanyData)
        for (let key in filteredCompanies) {
            expect([1, 2]).toContain(filteredCompanies[key])
        }
    })

    it('filters scores by company id based on fractal index', () => {
        const companyIds = {"1": 1, "2": 2}
        const filteredScores = filterScoresByCompanyId(companyIds, mockScoreData)
        for (let candidate of filteredScores) {
            expect([1, 2]).toContain(candidate["company_id"])
            expect([1819, 229]).toContain(candidate['candidate_id'])
            expect(filteredScores.length).toEqual(2)
        }
    })

    it('filters scores by the candidate job title', () => {
        const title = 'Senior Engineer'
        const filteredScores = filterScoresByJobTitle(mockScoreData, title)
        for (let candidate of filteredScores) {
            expect([4, 5]).toContain(candidate["company_id"])
            expect([613, 274]).toContain(candidate["candidate_id"])
            expect(filteredScores.length).toEqual(2)
        }
    })
})
