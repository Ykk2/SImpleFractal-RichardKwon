import * as ss from 'simple-statistics'

const calcStats = (data) => {

    const mean = ss.mean(data)
    const median = ss.median(data)
    const variance = ss.variance(data)
    const standardDeviation = ss.standardDeviation(data)

    return {mean, median, variance, standardDeviation}
}


export default calcStats
