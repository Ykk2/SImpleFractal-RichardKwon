import calculatePercentiles from "./utils/index.js";


export default async function getPercentiles(req, res) {

    if (req.method === 'GET') {
        try {
            const {candidateId} = req.query
            const result = calculatePercentiles(candidateId)
            res.status(200).json({
                message:"Success",
                data: result
            })
        } catch (err) {
            console.log(err)
            res.status(500).json({message: "Internal Server Error"})
        }
    }
}
