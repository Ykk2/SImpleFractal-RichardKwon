import calculatePercentiles from "./utils/index.js";


//returns computated results of an candidate. Requires candidateId in the search params
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
            res.status(404).json({message: "requested resource not found"})
        }
    }
}
