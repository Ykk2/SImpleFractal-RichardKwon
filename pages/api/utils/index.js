import filteredResults from "./filtering.js";
import {calcZscore, calcCandidatePercentile } from "./statistics.js";


const extractScores = (data, property) => {
    let res = []
    data.forEach((item) => res.push(item[property]))
    return res
}

export default function calculatePercentiles(candidateId) {

    const [results, candidate] = filteredResults(candidateId)

    const codingScores = [...extractScores(results, 'coding_score')]
    const communicationScores = [...extractScores(results, 'communication_score')]

    const codingStats = calcZscore(codingScores, candidate['coding_score'])
    const communicationStats = calcZscore(communicationScores, candidate['communication_score'])

    const candidateCodingPercentile = calcCandidatePercentile(codingScores, candidate['coding_score'])
    const candidateCommunicationPercentile = calcCandidatePercentile(communicationScores, candidate['communication_score'])

    return {
        "coding" : {codingStats, candidateCodingPercentile},
        "communication" : {communicationStats, candidateCommunicationPercentile}
    }
}
