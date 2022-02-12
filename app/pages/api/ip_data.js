// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
	if (req.method === "GET") {
		let response
		// if (req.query.ipAdd === "") {
		// 	response = await fetch("https://geolocation-db.com/json")
		// } else {
		// response = await fetch(`https://geolocation-db.com/json/${req.query.ipAdd}`)	// ISP vs. dönmüyor
		// response = await fetch(`http://ip-api.com/json/${req.query.ipAdd}`)	// Şehir bilgisini yanlış dönüyor
		response = await fetch(`http://ipwhois.app/json/${req.query.ipAdd}`)
		// }
		const data = await response.json()
		res.status(200).json(data)
	}
}
