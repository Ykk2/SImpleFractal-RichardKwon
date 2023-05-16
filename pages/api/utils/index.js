import { filteredResults }  from "./filtering.js";
import {calcZscore, calcCandidatePercentile } from "./statistics.js";


//extracts scores by property/column from data
const extractScores = (data, property) => {
    let res = []
    data.forEach((item) => res.push(item[property]))
    return res
}

//runs all statistical calculations and returns an array of stats, data, and candidate info
export default function calculatePercentiles(candidateId) {
    const [results, candidate] = filteredResults(candidateId)
    const codingScores = [...extractScores(results, 'coding_score')]
    const communicationScores = [...extractScores(results, 'communication_score')]
    const codingStats = calcZscore(codingScores, candidate['coding_score'])
    const communicationStats = calcZscore(communicationScores, candidate['communication_score'])
    const candidateCodingPercentile = calcCandidatePercentile(codingScores, candidate['coding_score'])
    const candidateCommunicationPercentile = calcCandidatePercentile(communicationScores, candidate['communication_score'])

    return [
        codingStats,
        candidateCodingPercentile,
        communicationStats,
        candidateCommunicationPercentile,
        candidate
    ]
}
