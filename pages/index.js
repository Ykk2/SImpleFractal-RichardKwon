import React, { useState } from 'react'
import Table from './components/table'
import styles from './main.module.css'

export default function Home() {

    const [candidateId, setCandidateId] = useState("")
    const [candidate, setCandidate] = useState(null)
    const [codingStats, setCodingStats] = useState(null)
    const [commStats, setCommstats] = useState(null)

    const fetchData = async () => {
        try {
            const res = await fetch(`/api/percentiles?candidateId=${candidateId}`)
            const data = await res.json()
            const [codingZscore, codingPercentile, commZscore, commPercentile, candidateInfo] = data.data
            setCodingStats({ codingZscore, codingPercentile })
            setCommstats({ commZscore, commPercentile })
            setCandidate(candidateInfo)
        } catch (err) {
            alert("Please verify the candidate's id. Candidate was not found")
        }
    }

    const handleInputChange = (e) => {
        setCandidateId(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        fetchData()
    }

    return (
        <div className={styles.main}>
            <div>
                <h1>Reference Guide</h1>
                <p>Percentiles are presented in decimal percentages on a scale of 0 to 1.
                <br/>
                A score closer to 1 means the candidate is ranked higher than his/her peers.
                </p>
                <p>Zscores present the relative distance of a candidate's score vs the average.
                <br/>
                The values range from -3 to 3 with a value of 0 representing the average.
                </p>
                <p>The values below represent a candidate's coding and communication score compared to his/her peers.
                <br/>
                The candidate was scored against peers from similar companies and same job title.
                </p>
            </div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="candidateId">Candidate Id:</label>
                <input
                    type="number"
                    id="candidateId"
                    value={candidateId}
                    onChange={handleInputChange}
                />
                <button type="submit">Calculate</button>
            </form>
            <div className={styles.container}>
                <div>
                    <span>Candidate</span>
                    {candidate && <Table data={candidate} />}
                </div>
                <div>
                    <span>Coding</span>
                    {candidate && <Table data={codingStats} />}
                </div>
                <div>
                    <span>Communication</span>
                    {candidate && <Table data={commStats} />}
                </div>
            </div>
        </div>
    )
}
