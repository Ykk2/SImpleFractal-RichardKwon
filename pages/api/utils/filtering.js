import fs from 'fs'
import path from 'path'
import Papa from 'papaparse'

const parseOptions = {
    dynamicTyping: true,
    header: true
}

//parse company data by reading local file and return array of objects
//each object is a company and contains k, v pair where k is column and v is the value

const parseCompanyData = () => {
    const csvPath = path.join(process.cwd(), 'pages', 'api', 'data', 'companies.csv');
    const file = fs.readFileSync(csvPath, { encoding: 'utf-8' })
    const data = Papa.parse(file, parseOptions).data;
    return data
}

//parse company data by reading local file and return array of objects
//each object is a candidate and contains contains k, v pair where k is column and v is the value

const parseScoreData = () => {
    const csvPath = path.join(process.cwd(), 'pages', 'api', 'data', 'scores.csv');
    const file = fs.readFileSync(csvPath, { encoding: 'utf-8' });
    const data = Papa.parse(file, parseOptions).data;
    return data
}

export const findCandidateInfo = (candidateId, candidates) => {
    const candidate = candidates.find(candidate => candidate['candidate_id'] == candidateId)
    return candidate ? candidate : 'Candidate not found'
}

export const filterCompanyByFractalIndex = (companyId, data) => {
    let targetFractalIdx = null
    const similarCompanies = {}

    //find fractal index of desired company
    for (let company of data) {
        if (company['company_id'] === companyId) {
            targetFractalIdx = company['fractal_index']
            break
        }
    }

    //filter data and populate similarCompanies object
    data.forEach(company => {
        if (Math.abs(company['fractal_index'] - targetFractalIdx) < 0.15) {
            similarCompanies[company['company_id']] = company['company_id']
        }
    })
    return similarCompanies
}

export const filterScoresByCompanyId = (companies, scores) => {
    const filteredScores = scores.filter((score) => companies[score['company_id']])
    return filteredScores
}

export const filterScoresByJobTitle = (candidates, title) =>  {
    const filteredScores = candidates.filter((candidate) => candidate['title'] == title)
    return filteredScores
}


//main function of this file that aggregates all functions and returns an array with two objects: filtered data, candidate
export const filteredResults = (candidateId) => {
    const companies = parseCompanyData()
    const scores = parseScoreData()
    const candidate = findCandidateInfo(candidateId, scores)
    const candidateCompanyId = candidate['company_id']
    const candidateJobTitle = candidate['title']
    const similarCompanies = filterCompanyByFractalIndex(candidateCompanyId, companies)
    const filteredScoresByCompany = filterScoresByCompanyId(similarCompanies, scores)
    const filteredScoresByJob = filterScoresByJobTitle(filteredScoresByCompany, candidateJobTitle)
    return [filteredScoresByJob, candidate]
}
