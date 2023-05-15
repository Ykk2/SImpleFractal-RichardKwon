import * as ss from 'simple-statistics'

export const calcZscore = (data, value) => {

    const mean = ss.mean(data)
    const standardDeviation = ss.standardDeviation(data)

    const zScore = (value - mean) / standardDeviation

    return {zScore}
}

export const calcCandidatePercentile = (data, candidateScore) => {
    const rank = ss.quantileRank(data, candidateScore)
    return rank
}
