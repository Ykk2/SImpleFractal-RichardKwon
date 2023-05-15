import * as ss from 'simple-statistics'


//calculates zScore to show strength of candidate
export const calcZscore = (data, value) => {
    const mean = ss.mean(data)
    const standardDeviation = ss.standardDeviation(data)
    const zScore = (value - mean) / standardDeviation
    return zScore.toFixed(2)
}

//calculates percentile rank of candidate
export const calcCandidatePercentile = (data, candidateScore) => {
    const rank = ss.quantileRank(data, candidateScore)
    return rank.toFixed(2)
}
